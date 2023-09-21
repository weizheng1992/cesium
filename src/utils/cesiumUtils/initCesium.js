import Cesium from '@/utils/cesiumUtils/cesium'
import chengdu from '@/assets/geojson/beijing.json'
import { img_tdt_dx, img_tdt_sl, img_tdt_yx } from '@/utils/cesiumUtils/map'

// eslint-disable-next-line no-unused-vars
const addTileMapProvider = (viewer) => {
  const imageryViewModels = []
  imageryViewModels.push(
    new Cesium.ProviderViewModel({
      name: 'Google_COBALT',
      iconUrl: Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/blueMarble.png'),
      tooltip: 'Google_COBALT',
      creationFunction() {
        return new Cesium.TileMapServiceImageryProvider({
          url: window.setting.geoServerBaseUrl,
          fileExtension: 'png'
        })
      }
    })
  )
  new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
    globe: viewer.scene.globe,
    imageryProviderViewModels: imageryViewModels
  })
}

export const initCesium = (viewerName = 'cesiumContainer', option) => {
  // DEFAULT_VIEW in China
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80, 22, 130, 50)
  Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN

  // const url = '/geoserver' // Geoserver URL
  // const terrainUrl = '/terrain' // Terrain URL
  const baseConf = {
    // imageryProvider: false,
    geocoder: false,
    navigationHelpButton: false,
    selectionIndicator: false,
    baseLayerPicker: true,
    showRenderLoopErrors: false,
    animation: false,
    timeline: false,
    sceneMode: Cesium.SceneMode.SCENE2D,
    imageryProviderViewModels: [img_tdt_yx, img_tdt_dx, img_tdt_sl], //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    selectedImageryProviderViewModel: img_tdt_yx //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
  }
  const viewer = new Cesium.Viewer(viewerName, { ...baseConf, ...option })
  viewer.baseLayerPicker.viewModel.terrainProviderViewModels.pop()
  viewer.baseLayerPicker.viewModel.terrainProviderViewModels.pop()
  // load terrain from Cesium IonResource site, also load your own terrain optionally
  // const terrainLayer = new Cesium.CesiumTerrainProvider({
  //   // url: terrainUrl,
  //   url: Cesium.IonResource.fromAssetId(1),
  //   requestWaterMask: true,
  //   requestVertexNormals: true
  // })
  // viewer.scene.terrainProvider = terrainLayer
  // viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3 }))
  // load your own tile optionally
  // addTileMapProvider(viewer)
  //去除版权信息
  viewer.cesiumWidget.creditContainer.style.display = 'none'

  // 加载影像注记
  var layer1 = new Cesium.WebMapTileServiceImageryProvider({
    url: `http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${
      import.meta.env.VITE_TIAN_TOKEN
    }`,
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    layer: 'cia_w',
    style: 'default',
    tileMatrixSetID: 'GoogleMapsCompatible',
    format: 'tiles',
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(layer1)
  console.log(viewer.imageryLayers)
  // viewer.imageryLayers.get(0).show = true
  // viewer.imageryLayers.get(1).show = true
  viewer.scene.globe.enableLighting = false
  viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0) //设置背景地球颜
  // viewer.scene.globe.baseColor = new Cesium.Color.fromCssColorString('#172146')
  const fn = () => {
    // 3. 注记标签
    Cesium.GeoJsonDataSource.load(chengdu).then(function (dataSource) {
      viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        // 得到每块多边形的坐标集合
        const polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions
        // 根据坐标集合构造BoundingSphere获取中心点坐标
        let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center
        // 将中心点拉回到地球表面
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter)
        var color = Cesium.Color.fromRandom({ alpha: 0.6 }) //随机生成一个颜色且透明度为0.6
        entity.polygon.material = color //将随机产生的颜色赋予多边形
        viewer.entities.add({
          position: polyCenter,
          label: {
            text: entity.properties.name,
            // showBackground: true, //背景颜色
            // scale: 0.6,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, // 垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平位置
            font: '24pt Source Han Sans CN', // 字体样式
            fillColor: Cesium.Color.BLACK, // 字体颜色
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 5,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            eyeOffset: new Cesium.Cartesian3(0, 0, -80000) // 这里设置了就不会被遮盖了，设为负值则在更上层
          }
        })
      }
    })
  }

  // 控制地图内容的显示不同
  viewer.scene.camera.moveEnd.addEventListener(() => {
    const currentMagnitude = viewer.camera.getMagnitude()
    console.log('currentMagnitude - ' + currentMagnitude)
    if (currentMagnitude < 8000000) {
      fn()
    }
  })

  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(...[104, 30, 10000000]),
    orientation: {
      // heading
      heading: Cesium.Math.toRadians(0, 0),
      // pitch
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0
    }
  })
  viewer.clock.shouldAnimate = true
  return viewer
}
