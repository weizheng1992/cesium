<template>
  <ElMenu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    v-show="visible"
    class="absolute!"
    :style="{
      left: cartesian2Point[0] + 'px',
      top: cartesian2Point[1] + 'px',
      '--el-menu-border-color': 'none'
    }"
  >
    <el-menu-item index="1" @click="handleCreate">
      <span>新建</span>
    </el-menu-item>
    <el-menu-item index="2" @click="handleCircle">
      <span>距离环</span>
    </el-menu-item>
  </ElMenu>
  <AddDialog :visible="createVisible" />
</template>
<script setup lang="ts">
import Cesium from '@/utils/cesiumUtils/cesium'
import { Viewer, Entity } from 'cesium'
import { PropType, onMounted, ref } from 'vue'
import { ElMenu, ElMenuItem } from 'element-plus'
import CircleRipple from '@/utils/cesiumUtils/CircleRippleMaterial/common/CircleRipple'
import AddDialog from '@/views/Interference/components/AddDialog.vue'

defineOptions({
  name: 'RightMenu'
})
const props = defineProps({
  viewer: { type: Object as PropType<Viewer | null>, default: null }
})

const visible = ref(false)
const createVisible = ref(false)
const cartesian2Point = ref<number[]>([])
const cartesian3Point = ref<number[]>([])
const pointHtml = ref<Entity>()

onMounted(() => {
  const { ScreenSpaceEventHandler, Math, ScreenSpaceEventType } = Cesium
  const pickScreenSpaceEventHandler = new ScreenSpaceEventHandler(props.viewer?.canvas)

  pickScreenSpaceEventHandler.setInputAction((movement) => {
    console.log(pointHtml.value)
    pointHtml.value && props.viewer?.entities.remove(pointHtml.value)
    console.log(movement.position)
    const pickRay: any = props.viewer?.scene.camera.getPickRay(movement.position)
    let pickPosition = props.viewer?.scene.globe.pick(pickRay, props.viewer.scene)

    const pickPositionCartographic = props.viewer?.scene.globe.ellipsoid.cartesianToCartographic(
      pickPosition || new Cesium.Cartesian3()
    )

    const lat = Math.toDegrees(pickPositionCartographic?.latitude || 0)
    const lng = Math.toDegrees(pickPositionCartographic?.longitude || 0)
    pointHtml.value = props.viewer?.entities.add({
      // fromDegrees（经度，纬度，高度，椭球，结果）从以度为单位的经度和纬度值返回Cartesian3位置
      position: Cesium.Cartesian3.fromDegrees(lng, lat, 10),
      point: {
        // 点的大小（像素）
        pixelSize: 5, // 点位颜色，fromCssColorString 可以直接使用CSS颜色
        color: Cesium.Color.fromCssColorString('#409eff'), // 边框颜色
        outlineColor: Cesium.Color.fromCssColorString('#fff'), // 边框宽度(像素)
        outlineWidth: 2, // 是否显示
        show: true
      }
    })

    cartesian2Point.value = [movement.position.x, movement.position.y]
    cartesian3Point.value = [lng, lat]
    visible.value = true
  }, ScreenSpaceEventType.RIGHT_CLICK)
  pickScreenSpaceEventHandler.setInputAction(() => {
    initMenu()
  }, ScreenSpaceEventType.LEFT_CLICK)
})
const initMenu = () => {
  visible.value = false
  cartesian2Point.value = []
  cartesian3Point.value = []
  pointHtml.value && props.viewer?.entities.remove(pointHtml.value)
}

const handleCircle = () => {
  if (props.viewer) {
    const circleRippleId = props.viewer?.entities.getById('circleRipple')
    circleRippleId && props.viewer?.entities.remove(circleRippleId)
    let circleWave = new CircleRipple(props.viewer, 'circleRipple')
    circleWave.add([cartesian3Point.value[0], cartesian3Point.value[1], 10], 'green', 1000, 3000)
    props.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        ...[cartesian3Point.value[0], cartesian3Point.value[1], 100000]
      ),
      orientation: {
        // heading
        heading: Cesium.Math.toRadians(0, 0),
        // pitch
        pitch: Cesium.Math.toRadians(-90),
        roll: 0.0
      }
    })
    initMenu()
  }
}

const handleCreate = () => {
  createVisible.value = true
}
</script>
<style lang=""></style>
