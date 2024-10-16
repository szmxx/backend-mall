<template>
  <div class="relative w-full h-full">
    <div id="map" class="w-full h-full"></div>
    <div
      class="p-1.8 bg-white text-black z-99 shadow-lg relative rounded operate float-right cursor-pointer right-0 mr-8px bottom-30"
      @click="onHome"
    >
      <div class="i-ion-md-home"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chinaLabel from './data/chinalabel.json'
import worldLabel from './data/worldlabel.json'
import china from './data/china.json'
import world from './data/world.json'
import worldOther from './data/worldother.json'
import {
  Scene,
  PolygonLayer,
  LineLayer,
  PointLayer,
  Zoom,
  Popup,
  ILayer,
} from '@antv/l7'
import { Map } from '@antv/l7-maps'
import useAppStore from '@/store/app'
const { setting } = storeToRefs(useAppStore())
console.log(setting.value.theme)
const strokeStyle = 'rgba(0 , 0, 0, 0.03)'
const fillStyle = '#eeeeee50'
const textStyle = `rgba(${setting.value.theme}, 0.8)`
const hoverStyle = `rgba(${setting.value.theme}, 0.1)`
onMounted(() => {
  initMap()
})
let scene: Scene
const popup = new Popup({
  offsets: [0, 0],
  closeButton: false,
})
function initMap() {
  scene = new Scene({
    id: 'map',
    map: new Map({
      pitch: 0,
      style: 'blank',
      center: [116.368652, 39.93866],
      zoom: 10,
      rotateEnable: false,
      dragRotate: false,
      maxZoom: 8,
      minZoom: 0.4,
    }),
    logoVisible: false,
  })
  scene.on('loaded', () => {
    const zoom = new Zoom()
    scene?.addControl?.(zoom)
    scene?.addPopup?.(popup)
    addHightLayer(scene)
    const worldLayer = addWorldLayer(scene)
    const worldOtherLayer = scene.getLayerByName('world_other_layer')
    worldLayer?.on?.('mousemove', (evt) => {
      locateByCode('world', evt.feature.properties.code)
    })
    worldOtherLayer?.on?.('mousemove', (evt) => {
      locateByCode('world', evt.feature.properties.code)
    })
    const chinaLayer = addChinaLayer(scene)
    chinaLayer?.on?.('mousemove', (evt) => {
      locateByCode('china', evt.feature.properties.adcode)
    })
    toggleLayer('world')
  })
}
function addHightLayer(scene: Scene) {
  const labelLayer = new PointLayer({
    name: 'hightlight_point',
    zIndex: 5,
  })
    .source(
      {
        type: 'FeatureCollection',
        features: [],
      },
      {
        parser: {
          type: 'json',
          coordinates: 'center',
        },
      },
    )
    .color(textStyle)
    .shape('NAME_CHN', 'text')
    .size(10)
    .style({
      textAllowOverlap: false,
    })
  scene.addLayer(labelLayer)
}

function hightlight(scene: Scene, feature: Record<string, unknown>) {
  const labelLayer = scene.getLayerByName('hightlight_point')
  const res = worldLabel?.find((i) => i.code === feature?.properties?.code)
  labelLayer?.setData?.([res || {}])
}
function addWorldLayer(scene: Scene) {
  const worldLayer = new PolygonLayer({
    name: 'world_layer',
    autoFit: true,
    blend: 'normal',
  }).source(world)

  worldLayer
    .shape('fill')
    .style({
      opacity: 1,
    })
    .color('code', () => {
      return fillStyle
    })
    .active({
      color: hoverStyle,
    })
    .select(false)

  const worldOtherLayer = new PolygonLayer({
    name: 'world_other_layer',
    autoFit: true,
    blend: 'normal',
  }).source(worldOther)

  worldOtherLayer
    .shape('fill')
    .style({
      opacity: 1,
    })
    .color('code', () => {
      return fillStyle
    })
    .active({
      color: hoverStyle,
    })
    .select(false)
  //  图层边界
  const borderLayer = new LineLayer({
    name: 'world_border_layer',
    zIndex: 2,
  })
    .source(world)
    .color(strokeStyle)
    .size(0.6)
    .style({
      opacity: 1,
    })
  scene.addLayer(worldLayer)
  scene.addLayer(worldOtherLayer)
  scene.addLayer(borderLayer)
  return worldLayer
}
function addChinaLayer(scene: Scene) {
  const chinaLayer = new PolygonLayer({
    name: 'china_layer',
    autoFit: true,
  }).source(china)

  chinaLayer
    .shape('fill')
    .style({
      opacity: 1,
    })
    .color('code', () => {
      return fillStyle
    })
    .active({
      color: hoverStyle,
    })
    .select(false)
  //  图层边界
  const borderLayer = new LineLayer({
    name: 'china_border_layer',
    zIndex: 2,
  })
    .source(china)
    .color(strokeStyle)
    .size(0.6)
    .style({
      opacity: 1,
    })

  scene.addLayer(chinaLayer)
  scene.addLayer(borderLayer)
  return chinaLayer
}
function showLayers(layers: ILayer[]) {
  layers?.map((layer) => {
    layer?.show?.()
  })
}
function hideLayers(layers: ILayer[]) {
  layers?.map((layer) => {
    layer?.hide?.()
  })
}
function toggleLayer(type: string) {
  const layers = scene.getLayers()
  hightlight(scene, {})
  popup.setLnglat([0, 0])
  switch (type) {
    case 'world':
      hideLayers(
        layers?.filter?.((layer) => {
          return layer.name.startsWith('china')
        }),
      )
      showLayers(
        layers.filter((layer) => {
          return layer.name.startsWith('world')
        }),
      )
      break
    case 'china':
      hideLayers(
        layers.filter((layer) => {
          return layer.name.startsWith('world')
        }),
      )
      showLayers(
        layers.filter((layer) => {
          return layer.name.startsWith('china')
        }),
      )
      break
  }
}

function locateByCode(type: string, code: string) {
  let feature = null
  switch (type) {
    case 'world':
      // eslint-disable-next-line no-case-declarations
      const worldLayer = scene.getLayerByName('world_layer')
      feature = worldLayer?.layerSource?.originData?.features?.find(
        (feature: Record<string, unknown>) => {
          return feature?.properties?.code === code
        },
      )
      if (!feature) {
        const worldOtherLayer = scene.getLayerByName('world_other_layer')
        feature = worldOtherLayer?.layerSource?.originData?.features?.find(
          (feature: Record<string, unknown>) => {
            return feature?.properties?.code === code
          },
        )
      }
      break
    case 'china':
      // eslint-disable-next-line no-case-declarations
      const chinaLayer = scene.getLayerByName('china_layer')
      feature = chinaLayer?.layerSource?.originData?.features?.find(
        (feature: Record<string, unknown>) => {
          return feature?.properties?.code === code
        },
      )
      break
  }
  if (feature) {
    hightlight(scene, feature)
  }
}

function onHome() {
  const layer = scene?.getLayerByName?.('world_layer')
  if (layer) {
    layer.fitBounds()
  }
}
</script>

<style lang="scss" scoped>
.operate {
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 15%);
}
</style>
