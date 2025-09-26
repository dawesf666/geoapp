// // PolygonLayer.tsx
// 'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import { FeatureCollection } from 'geojson'

// type Props = {
//   data: FeatureCollection
//   onFeatureClick?: (feature: any) => void
// }

// export default function PolygonLayer({ data, onFeatureClick }: Props) {
//   return (
//     <GeoJSON
//       data={data as any}
//       style={() => ({
//         weight: 1.5,
//         color: '#1e3a8a', // blue-900
//         fillColor: '#60a5fa', // blue-400
//         fillOpacity: 0.25,
//       })}
//       onEachFeature={(feature, layer) => {
//         if (onFeatureClick) {
//           layer.on('click', () => onFeatureClick(feature))
//         }
//         layer.on('mouseover', () => {
//           ;(layer as any).setStyle?.({ weight: 2, color: '#111827', fillOpacity: 0.4 })
//           try {
//             layer.bringToFront?.()
//           } catch {}
//         })
//         layer.on('mouseout', () => {
//           ;(layer as any).setStyle?.({
//             weight: 1.5,
//             color: '#1e3a8a',
//             fillColor: '#60a5fa',
//             fillOpacity: 0.25,
//           })
//         })
//       }}
//     />
//   )
// }

//SECOND VERSION
//'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import { FeatureCollection } from 'geojson'

// type Props = {
//   data: FeatureCollection
//   onFeatureClick?: (feature: any) => void
//   pane?: string
// }

// export default function PolygonLayer({ data, onFeatureClick, pane }: Props) {
//   return (
//     <GeoJSON
//       pane={pane}
//       data={data as any}
//       style={() => ({
//         weight: 1.5,
//         color: '#1e3a8a',
//         fillColor: '#60a5fa',
//         fillOpacity: 0.25,
//       })}
//       onEachFeature={(feature, layer) => {
//         if (onFeatureClick) {
//           layer.on('click', () => onFeatureClick(feature))
//         }
//         layer.on('mouseover', () => {
//           ;(layer as any).setStyle?.({ weight: 2, color: '#111827', fillOpacity: 0.35 })
//           // DO NOT bringToFront here; it would cover points
//         })
//         layer.on('mouseout', () => {
//           ;(layer as any).setStyle?.({
//             weight: 1.5,
//             color: '#1e3a8a',
//             fillColor: '#60a5fa',
//             fillOpacity: 0.25,
//           })
//         })
//       }}
//     />
//   )
// }

//THIRD VERSION

// ./markers/PolygonLayer.tsx
// ./markers/PolygonLayer.tsx
'use client'
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import type { FeatureCollection } from 'geojson'

type Props = {
  data: FeatureCollection
  onFeatureClick?: (feature: any) => void
  pane?: string
}

export default function PolygonLayer({ data, onFeatureClick, pane }: Props) {
  return (
    <GeoJSON
      pane={pane}
      data={data as any}
      interactive={true} // <- make sure clicks are enabled
      style={() => ({
        weight: 2.5,
        color: '#104C82', // stroke
        fillColor: '#60a5fa', // fill
        fillOpacity: 0.35, // more visible
      })}
      onEachFeature={(feature, layer) => {
        if (onFeatureClick) layer.on('click', () => onFeatureClick(feature))
        layer.on('mouseover', () => {
          ;(layer as any).setStyle?.({ weight: 3, color: '#0f172a', fillOpacity: 0.5 })
        })
        layer.on('mouseout', () => {
          ;(layer as any).setStyle?.({
            weight: 2.5,
            color: '#104C82',
            fillColor: '#60a5fa',
            fillOpacity: 0.35,
          })
        })
      }}
    />
  )
}
