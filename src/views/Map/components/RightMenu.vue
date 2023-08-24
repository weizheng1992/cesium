<template>
  <div>
    <vc-entity :position="point" :show="isRight">
      <vc-graphics-point color="red" :pixel-size="8" />
    </vc-entity>
    <vc-overlay-html ref="html" :position="point" :show="isRight">
      <div class="vc-box">新建</div>
    </vc-overlay-html>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVueCesium } from 'vue-cesium'
defineOptions({
  name: 'RightMenu'
})

import type { VcViewerProvider, VcReadyObject, VcPosition } from 'vue-cesium/es/utils/types'

const isRight = ref(false)
const point = ref<VcPosition>([])
const $vc: VcViewerProvider = useVueCesium()
onMounted(() => {
  $vc.creatingPromise.then((readyObj: VcReadyObject) => {
    const { ScreenSpaceEventHandler, ScreenSpaceEventType, Math } = readyObj.Cesium
    const pickScreenSpaceEventHandler = new ScreenSpaceEventHandler(readyObj.viewer.canvas)
    pickScreenSpaceEventHandler.setInputAction((movement) => {
      const pickRay: any = readyObj.viewer.scene.camera.getPickRay(movement.position)
      let pickPosition = readyObj.viewer.scene.globe.pick(pickRay, readyObj.viewer.scene)

      const pickPositionCartographic =
        readyObj.viewer.scene.globe.ellipsoid.cartesianToCartographic(
          pickPosition || new Cesium.Cartesian3()
        )

      const lat = Math.toDegrees(pickPositionCartographic.latitude)
      const lng = Math.toDegrees(pickPositionCartographic.longitude)
      point.value = [lng, lat]
      isRight.value = true
    }, ScreenSpaceEventType.RIGHT_CLICK)
    pickScreenSpaceEventHandler.setInputAction(() => {
      isRight.value = false
      point.value = []
    }, ScreenSpaceEventType.LEFT_CLICK)
  })
})
</script>
<style lang="less" scoped>
.vc-box {
  width: 200px;
  line-height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 16px;
  position: absolute;
  left: 20px;
  top: 20px;
}
</style>
