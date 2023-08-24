<template>
  <vc-config-provider cesium-path="/Cesium/Cesium.js">
    <vc-viewer
      v-if="show"
      ref="viewerRef"
      @ready="onViewerReady"
      :removeCesiumScript="false"
      :sceneMode="2"
    >
      <vc-layer-imagery :sort-order="20">
        <vc-imagery-provider-tianditu
          map-style="cia_c"
          :minimum-level="0"
          :maximum-level="17"
          token="436ce7e50d27eede2f2929307e6b33c0"
        />
      </vc-layer-imagery>
      <!-- <vc-layer-imagery :sort-order="10">
        <vc-imagery-provider-tianditu
          map-style="img_c"
          token="436ce7e50d27eede2f2929307e6b33c0"
          ref="provider"
        />
      </vc-layer-imagery> -->
      <!-- 修改定位 和 位置偏移 -->
      <vc-measurements
        @draw-evt="drawEvt"
        @active-evt="activeEvt"
        @editor-evt="editorEvt"
        @mouse-evt="mouseEvt"
        ref="measurementsRef"
        position="top-right"
        :clamp-to-ground="clampToGround"
        :mainFabOpts="measurementFabOptions1"
        :offset="[10, 65]"
        :editable="editable"
      />
      <vc-collection-primitive :show="flyLoading">
        <vc-collection-billboard @click="onClicked" :billboards="billboards1" />
      </vc-collection-primitive>
      <vc-collection-polyline @click="onClicked" :polylines="polylines" />
      <!-- <vc-datasource-geojson
        ref="datasourceRef"
        data="https://zouyaoji.top/vue-cesium/SampleData/geojson/china.json"
        :show="show"
        stroke="red"
        @click="onClicked"
      /> -->
      <div class="tree">
        <el-tree
          ref="treeRef"
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check="handleCheckChange"
        />
      </div>
      <RightMenu />
    </vc-viewer>
  </vc-config-provider>
</template>

<script lang="ts" setup>
// import { store } from '@src/store'
import { ref, toRaw } from 'vue'
import { VcFabProps } from 'vue-cesium'
import FLY from './recursive-list/fly'
import { data } from './recursive-list/list'
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import RightMenu from './components/RightMenu.vue'

const loading = ref(false)
const show = ref(true)
const viewerRef = ref()

const restoreCursorMove = ref('')

const editable = ref(false)
const clampToGround = ref(false)
const drawing = ref(false)

const measurementFabOptions1 = ref<VcFabProps>({
  direction: 'left'
})

const onViewerReady = ({ vm }: any) => {
  console.log('viewer is loaded.', vm)
  vm.vcMitt.on('destroyed', (e) => {
    console.log('viewer is destroyed', e)
  })
  console.log(vm)
  loading.value = false

  // 视图位置

  const camera = vm.viewer.scene.camera
  // const destinationCartesian = camera.getRectangleCameraCoordinates(rectangle)
  // const destination = vm.viewer.scene.globe.ellipsoid.cartesianToCartographic(destinationCartesian)
  // // Work out the destination that the camera would naturally fly to
  // const finalDestinationCartographic: any = {
  //   longitude: destination.longitude,
  //   latitude: destination.latitude,
  //   height: destination.height
  // }
  // const finalDestination = vm.viewer.scene.globe.ellipsoid.cartographicToCartesian(
  //   finalDestinationCartographic
  // )

  camera.flyTo({
    duration: 3,
    destination: Cesium.Cartesian3.fromDegrees(106.26667, 30.46667, 10000000.0),
    orientation: {
      heading: 6.283185307179586,
      pitch: -1.5686521559334161,
      roll: 0
    }
  })

  // 线
  for (var i = 0; i < 10; i++) {
    let polyline: any = {}
    let positions: any = []
    positions.push({ lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 })
    positions.push({ lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 22 })
    positions.push({ lng: Math.random() * 40 + 95, lat: Math.random() * 30 + 26 })
    polyline.positions = positions
    // polyline.material = '#' + Math.random().toString(16).substr(2, 6).toUpperCase()
    polylines.value.push(polyline)
  }
}

const drawEvt = (e, viewer) => {
  // const restoreCursor = getComputedStyle(viewer.canvas).cursor
  if (e.finished) {
    drawing.value = false
    if (e.type === 'move') {
      viewer.canvas.setAttribute('style', `cursor: ${restoreCursorMove.value}`)
    }
  } else {
    drawing.value = true
    if (e.type === 'move') {
      viewer.canvas.setAttribute('style', 'cursor: move')
    }
    if (e.type === 'new') {
      viewer.canvas.setAttribute('style', 'cursor: crosshair')
    }
  }
}
const activeEvt = (e, viewer) => {
  console.log(e)
  viewer.canvas.setAttribute('style', `cursor: ${e.isActive ? 'crosshair' : 'auto'}`)
  if (!e.isActive) {
    drawing.value = false
    restoreCursorMove.value = 'auto'
  }
}
const editorEvt = (e, viewer) => {
  console.log(e)
  if (e.type === 'move') {
    // const restoreCursor = getComputedStyle(viewer.canvas).cursor
    viewer.canvas.setAttribute('style', 'cursor: move')
    drawing.value = true
  }
}
const mouseEvt = (e, viewer) => {
  console.log(e)
  const restoreCursor = getComputedStyle(viewer.canvas).cursor
  if (!drawing.value) {
    if (e.type === 'onmouseover') {
      restoreCursorMove.value = restoreCursor
      viewer.canvas.setAttribute('style', 'cursor: pointer')
    } else {
      viewer.canvas.setAttribute('style', `cursor: ${restoreCursorMove.value || 'auto'}`)
    }
  }
}

//图标集合
const billboards1 = ref<any>([])
const onClicked = (e) => {
  console.log('onClicked', e)
}

// 线
const polylines = ref<any>([])

// 数选择

const props = {
  label: 'name',
  children: 'children',
  isLeaf: 'leaf'
}

const loadNode = (node: Node, resolve: (data: any[]) => void) => {
  if (node.level === 0) {
    return resolve(FLY)
  }
  if (node.level > 1) return resolve([])

  if (node.data.name === '一区') {
    resolve(data['01'])
  } else {
    resolve(data['02'])
  }
}
const flyLoading = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
const handleCheckChange = () => {
  const list = treeRef.value!.getCheckedNodes(true, false)
  console.log(list)
  for (let i = 0; i < list.length; i++) {
    const item = toRaw(list[i])
    let billboard1: any = {}
    billboard1.position = { lng: item.point[0], lat: item.point[1] }
    billboard1.image = 'https://zouyaoji.top/vue-cesium-demo/images/%E9%A3%9E%E6%9C%BA%E5%9C%BA.svg'
    billboard1.scale = 0.1
    billboards1.value.push(billboard1)
  }
  flyLoading.value = true
}

// 右键点击

// const isRight = ref(false)
</script>

<style lang="less" scoped>
.tree {
  position: absolute;
  top: 60px;
  left: 50px;
  z-index: 9999;
  width: 200px;
  padding: 20px;
  background-color: rgba(0, 68, 82, 0.6);
}

::v-deep .el-tree {
  background-color: initial;
  color: #fff;
}
</style>
