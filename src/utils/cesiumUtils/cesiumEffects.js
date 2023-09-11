import Cesium from '@/utils/cesiumUtils/cesium'
import RainEffect from '@/utils/cesiumUtils/importRain'
import SnowEffect from '@/utils/cesiumUtils/importSnow'
import FogEffect from '@/utils/cesiumUtils/importFog'

export const setRain = (viewer) =>
  new RainEffect(viewer, {
    tiltAngle: 0.6, // tiltAngle
    rainSize: 0.6, // rainSize
    rainSpeed: 100.0 // speed of rain
  })

export const setSnow = (viewer) =>
  new SnowEffect(viewer, {
    snowSize: 0.02, // size of snow
    snowSpeed: 60.0 // speed of snow
  })

export const setFog = (viewer) =>
  new FogEffect(viewer, {
    visibility: 0.2,
    color: new Cesium.Color(0.8, 0.8, 0.8, 0.3)
  })
