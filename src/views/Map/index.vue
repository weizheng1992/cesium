<template>
  <vc-viewer v-if="show" ref="vcViewer" @ready="onViewerReady">
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
  </vc-viewer>
</template>

<script lang="ts" setup>
// import { store } from '@src/store'
import { ref } from 'vue'
import { VcFabProps } from 'vue-cesium'
const loading = ref(false)
const show = ref(true)

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
  loading.value = false
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
</script>
