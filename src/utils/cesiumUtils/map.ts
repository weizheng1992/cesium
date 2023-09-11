import Cesium from '@/utils/cesiumUtils/cesium'
import img_tdt_dx_img from '@/assets/imgs/img_tdt_dx.png'
import img_tdt_sl_img from '@/assets/imgs/img_tdt_sl.png'
import img_tdt_yx_img from '@/assets/imgs/img_tdt_yx.png'
//底图切换
// vec(矢量)、img(影像)、cia(影像中文注记)、cva(矢量中文注记)

const imageryProvider = new Cesium.WebMapTileServiceImageryProvider({
  url: `http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${
    import.meta.env.VITE_TIAN_TOKEN
  }`,
  subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
  layer: 'img_w',
  style: 'default',
  tileMatrixSetID: 'GoogleMapsCompatible',
  format: 'tiles',
  maximumLevel: 18 // 必须加上最大级数
})
const img_tdt_yx = new Cesium.ProviderViewModel({
  name: '影像底图',
  tooltip: '影像底图',
  //显示切换的图标
  iconUrl: img_tdt_yx_img,
  creationFunction: function () {
    return imageryProvider
  }
})
const img_tdt_sl = new Cesium.ProviderViewModel({
  name: '矢量底图',
  tooltip: '矢量底图',
  iconUrl: img_tdt_sl_img,
  creationFunction: function () {
    const esri = new Cesium.WebMapTileServiceImageryProvider({
      url: `http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${
        import.meta.env.VITE_TIAN_TOKEN
      }`,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      layer: 'vec_w',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18 // 必须加上最大级数
    })
    return esri
  }
})

const img_tdt_dx = new Cesium.ProviderViewModel({
  name: '地形底图',
  tooltip: '地形底图',
  iconUrl: img_tdt_dx_img,
  creationFunction: function () {
    const esri = new Cesium.WebMapTileServiceImageryProvider({
      url: `http://t0.tianditu.com/ter_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ter&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${
        import.meta.env.VITE_TIAN_TOKEN
      }`,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      layer: 'ter_w',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18 // 必须加上最大级数
    })
    return esri
  }
})

export { img_tdt_dx, img_tdt_sl, img_tdt_yx }
