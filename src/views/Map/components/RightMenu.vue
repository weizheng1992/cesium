<template>
  <vc-entity :position="point" :show="isRight">
    <vc-graphics-point color="red" :pixel-size="8" />
  </vc-entity>
  <vc-overlay-html ref="html" :position="point" v-if="isRight" :show="isRight">
    <div class="vc-box">新建</div>
  </vc-overlay-html>
  <!-- <vc-entity ref="entity1" :position="point" v-if="isRight" description="Hello VueCesium">
    <vc-graphics-ellipse
      :semiMinorAxis="300000.0"
      :semiMajorAxis="300000.0"
      material="green"
      :outline="true"
    />
  </vc-entity> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVueCesium } from 'vue-cesium'
defineOptions({
  name: 'RightMenu'
})

import type { VcViewerProvider, VcReadyObject } from 'vue-cesium/es/utils/types'

const isRight = ref(false)
const point = ref<number[]>([])
const $vc: VcViewerProvider = useVueCesium()
onMounted(() => {
  $vc.creatingPromise.then((readyObj: VcReadyObject) => {
    isRight.value = false
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
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  padding: 8px 16px;
  line-height: 30px;
  color: #fff;
  background-color: rgb(0 0 0 / 60%);
}
</style>
