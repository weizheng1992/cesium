<template>
  <div class="relative">
    <div id="cesiumContainer"></div>
    <div class="measure-div">
      <div id="measure"></div>
    </div>
    <Panel />
    <RightMenu v-if="viewer3D" :viewer="viewer3D" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Cesium from '@/utils/cesiumUtils/cesium'
import { initCesium } from '@/utils/cesiumUtils/initCesium'

import Measure from '@/utils/cesiumUtils/cesiumMeasure'

import { CircleWaveMaterialProperty } from '@/utils/cesiumUtils/circleWave'

import Panel from './components/Panel.vue'
import RightMenu from './components/RightMenu.vue'

const viewer3D = ref(null)
const measureTool = ref(null)

const showMeasure = () => {
  measureTool.value?.destroy()
  measureTool.value = new Measure({
    viewer: viewer3D.value,
    target: 'measure'
  })
}

onMounted(() => {
  setTimeout(() => {
    viewer3D.value = initCesium('cesiumContainer')
    // viewer3D.entities.add({
    //   id: 'CircleWave',
    //   position: Cesium.Cartesian3.fromDegrees(104, 30, 10),
    //   ellipse: {
    //     // height: position[2],
    //     semiMinorAxis: new Cesium.CallbackProperty(function (n) {
    //       return 1000
    //     }, false),
    //     semiMajorAxis: new Cesium.CallbackProperty(function (n) {
    //       return 1000
    //     }, false),
    //     material: new CircleWaveMaterialProperty({
    //       duration: 3000,
    //       gradient: 0.5,
    //       color: new Cesium.Color.fromCssColorString('red'),
    //       count: 3
    //     })
    //   }
    // })

    showMeasure()
  }, 1000)
})
</script>
<style scoped lang="less">
#cesiumContainer {
  width: 100%;
  height: 100%;
}

#baseLayerPickerContainer {
  position: fixed;
  right: 80px;
  top: 5px;
}

.h5videodiv {
  position: fixed;
  left: 10px;
  top: 10px;
  width: 200px;
  background-color: #000000;
  transform: translateX(-300px);
  transition: all 0.3s ease-in-out;

  &.show {
    transform: translateX(0);
  }

  video {
    width: 100%;
    height: 100%;
  }

  .playpause {
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);

    img {
      cursor: pointer;
      width: 20px;
    }
  }
}
</style>
<style lang="less">
.measure-div {
  position: absolute;
  right: 181px;
  top: 7px;
  z-index: 1;

  .op-btn {
    line-height: 32px;
    outline: none;
    border: 1px solid #303336;
    background-color: #303336;
    padding: 0 5px;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    margin-right: 5px;
    cursor: pointer;

    &:hover {
      background: #48b;
      border-color: #aef;
    }
  }
}

select {
  position: fixed;
  right: 120px;
  top: 7px;
  z-index: 1;
  width: 60px;
  height: 32px;
  border-radius: 4px;
  background: #303336;
  border: 1px solid #444;
  color: #edffff;
  cursor: pointer;

  &:hover {
    background: #48b;
    border-color: #aef;
    box-shadow: 0 0 8px #fff;
  }

  &:focus-visible {
    outline: 0;
  }
}
</style>
./circleWave
