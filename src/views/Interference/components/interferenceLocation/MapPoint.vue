<template>
  <Dialog v-model="dialogVisible" :title="t('interferenceLocation.mapPointing')">
    <div id="cesiumContainer3"></div>
  </Dialog>
</template>
<script setup lang="ts">
import { Dialog } from '@/components/Dialog'
import { ref, watch } from 'vue'
import { initCesium } from '@/utils/cesiumUtils/initCesium'
import { useI18n } from '@/hooks/web/useI18n'
import Cesium from '@/utils/cesiumUtils/cesium'
import { Entity } from 'cesium'

const viewer3D = ref<any>(null)
const dialogVisible = ref(false)
const { t } = useI18n()

const cartesian2Point = ref<number[]>([])
const cartesian3Point = ref<number[]>([])
const pointHtml = ref<Entity>()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onLocation'])

watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible
    if (visible && !viewer3D.value) {
      setTimeout(() => {
        viewer3D.value = initCesium('cesiumContainer3')

        const { ScreenSpaceEventHandler, Math, ScreenSpaceEventType } = Cesium
        const pickScreenSpaceEventHandler = new ScreenSpaceEventHandler(viewer3D.value?.canvas)

        pickScreenSpaceEventHandler.setInputAction((movement) => {
          pointHtml.value && viewer3D.value?.entities.remove(pointHtml.value)

          const pickRay: any = viewer3D.value?.scene.camera.getPickRay(movement.position)
          let pickPosition = viewer3D.value?.scene.globe.pick(pickRay, viewer3D.value.scene)

          const pickPositionCartographic =
            viewer3D.value?.scene.globe.ellipsoid.cartesianToCartographic(
              pickPosition || new Cesium.Cartesian3()
            )

          const lat = Math.toDegrees(pickPositionCartographic?.latitude || 0)
          const lng = Math.toDegrees(pickPositionCartographic?.longitude || 0)
          pointHtml.value = viewer3D.value?.entities.add({
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
          emit('onLocation', { lng, lat })
        }, ScreenSpaceEventType.RIGHT_CLICK)
        pickScreenSpaceEventHandler.setInputAction(() => {
          initMenu()
        }, ScreenSpaceEventType.LEFT_CLICK)
      })
    }
  }
)

const initMenu = () => {
  cartesian2Point.value = []
  cartesian3Point.value = []
  pointHtml.value && viewer3D.value?.entities.remove(pointHtml.value)
}
</script>
