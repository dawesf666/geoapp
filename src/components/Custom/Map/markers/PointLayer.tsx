// // PointLayer.tsx
// 'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import L from 'leaflet'
// import { FeatureCollection } from 'geojson'

// type Props = {
//   data: FeatureCollection
// }

// export default function PointLayer({ data }: Props) {
//   return (
//     <GeoJSON
//       data={data as any}
//       pointToLayer={(feature, latlng) =>
//         L.circleMarker(latlng, {
//           radius: 6,
//           weight: 2,
//           color: '#047857', // emerald-700
//           fillColor: '#34d399', // emerald-400
//           fillOpacity: 0.85,
//         })
//       }
//       onEachFeature={(feature, layer) => {
//         const p = feature.properties || {}
//         const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
//         const sub = p.popupSubtitle || [p.regione, p.comune].filter(Boolean).join(' • ')
//         layer.bindPopup(`<strong>${title}</strong><br/>${sub}`)
//       }}
//     />
//   )
// }

// ./markers/PointLayer.tsx

// 'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import L from 'leaflet'
// import type { Feature, FeatureCollection, Point } from 'geojson'

// type Props = {
//   data: FeatureCollection<Point, any>
//   /** Optional: customize the popup HTML for a feature */
//   renderPopupHTML?: (f: Feature<Point, any>) => string
//   /** Optional: customize the tooltip HTML for a feature */
//   renderTooltipHTML?: (f: Feature<Point, any>) => string
// }

// function defaultTooltipHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `
//     <div class="text-xs leading-4">
//       <div class="font-medium">${title}</div>
//       <div class="opacity-80">${sub || ''}</div>
//     </div>
//   `
// }

// function defaultPopupHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const kv = (label: string, value?: any) =>
//     value ? `<div><span class="font-medium">${label}:</span> ${value}</div>` : ''
//   const title = p.popupTitle || p.nome || p.tipologia || 'Dettagli'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `
//     <div style="min-width:220px;max-width:280px">
//       <div class="mb-1"><strong>${title}</strong></div>
//       ${sub ? `<div class="text-xs opacity-80 mb-2">${sub}</div>` : ''}

//       ${kv('Tipologia', p.tipologia)}
//       ${kv('Proprietario', p.proprietario)}
//       ${kv('Costruttore', p.costruttore)}
//       ${kv('Stato', p.stato)}
//       ${kv('Potenza', p.potenza ? p.potenza + ' MW' : undefined)}
//       ${kv('Estensione', p.estensione ? p.estensione + ' ha' : undefined)}
//     </div>
//   `
// }

//SECOND VERSION
// export default function PointLayer({
//   data,
//   renderPopupHTML = defaultPopupHTML,
//   renderTooltipHTML = defaultTooltipHTML,
// }: Props) {
//   return (
//     <GeoJSON
//       data={data as any}
//       pointToLayer={(feature, latlng) =>
//         L.circleMarker(latlng, {
//           radius: 6,
//           weight: 2,
//           color: '#047857',
//           fillColor: '#34d399',
//           fillOpacity: 0.85,
//         })
//       }
//       onEachFeature={(feature: any, layer) => {
//         // Tooltip on hover
//         layer.bindTooltip(renderTooltipHTML(feature), {
//           sticky: true,
//           direction: 'top',
//           opacity: 0.9,
//           className: 'leaflet-tooltip-own',
//         })

//         // Popup on click
//         layer.bindPopup(renderPopupHTML(feature), {
//           closeButton: true,
//           autoPan: true,
//           maxWidth: 320,
//           closeOnClick: true,
//         })

//         // Hover effects
//         layer.on('mouseover', () => {
//           ;(layer as any).openTooltip()
//           ;(layer as any).setStyle?.({
//             weight: 3,
//             color: '#065f46',
//             fillOpacity: 1,
//           })
//           layer.bringToFront?.()
//         })
//         layer.on('mouseout', () => {
//           ;(layer as any).closeTooltip()
//           ;(layer as any).setStyle?.({
//             weight: 2,
//             color: '#047857',
//             fillColor: '#34d399',
//             fillOpacity: 0.85,
//           })
//         })
//       }}
//     />
//   )
// }

// //THIRD VERSION
// 'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import L from 'leaflet'
// import type { Feature, FeatureCollection, Point } from 'geojson'

// type Props = {
//   data: FeatureCollection<Point, any>
//   pane?: string
//   renderPopupHTML?: (f: Feature<Point, any>) => string
//   renderTooltipHTML?: (f: Feature<Point, any>) => string
// }

// function defaultTooltipHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `
//     <div class="text-xs leading-4">
//       <div class="font-medium">${title}</div>
//       <div class="opacity-80">${sub || ''}</div>
//     </div>
//   `
// }

// function defaultPopupHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const kv = (label: string, value?: any) =>
//     value ? `<div><span class="font-medium">${label}:</span> ${value}</div>` : ''
//   const title = p.popupTitle || p.nome || p.tipologia || 'Dettagli'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `
//     <div style="min-width:220px;max-width:280px">
//       <div class="mb-1"><strong>${title}</strong></div>
//       ${sub ? `<div class="text-xs opacity-80 mb-2">${sub}</div>` : ''}

//       ${kv('Tipologia', p.tipologia)}
//       ${kv('Proprietario', p.proprietario)}
//       ${kv('Costruttore', p.costruttore)}
//       ${kv('Stato', p.stato)}
//       ${kv('Potenza', p.potenza ? p.potenza + ' MW' : undefined)}
//       ${kv('Estensione', p.estensione ? p.estensione + ' ha' : undefined)}
//     </div>
//   `
// }

// export default function PointLayer({
//   data,
//   pane,
//   renderPopupHTML = defaultPopupHTML,
//   renderTooltipHTML = defaultTooltipHTML,
// }: Props) {
//   return (
//     <GeoJSON
//       pane={pane}
//       data={data as any}
//       pointToLayer={(feature, latlng) =>
//         L.circleMarker(latlng, {
//           radius: 6,
//           weight: 2,
//           color: '#047857',
//           fillColor: '#34d399',
//           fillOpacity: 0.9,
//         })
//       }
//       onEachFeature={(feature: any, layer) => {
//         // Keep points visually on top within their pane
//         try {
//           layer.bringToFront?.()
//         } catch {}

//         // Tooltip (hover)
//         layer.bindTooltip(renderTooltipHTML(feature), {
//           sticky: true,
//           direction: 'top',
//           opacity: 0.95,
//           className: 'leaflet-tooltip-own',
//         })

//         // Popup (click)
//         layer.bindPopup(renderPopupHTML(feature), {
//           closeButton: true,
//           autoPan: true,
//           maxWidth: 320,
//           closeOnClick: true,
//         })

//         // Hover effects
//         layer.on('mouseover', () => {
//           ;(layer as any).openTooltip()
//           ;(layer as any).setStyle?.({ weight: 3, color: '#065f46', fillOpacity: 1 })
//         })
//         layer.on('mouseout', () => {
//           ;(layer as any).closeTooltip()
//           ;(layer as any).setStyle?.({
//             weight: 2,
//             color: '#047857',
//             fillColor: '#34d399',
//             fillOpacity: 0.9,
//           })
//         })
//       }}
//     />
//   )
// }

//FOURTH VERSION
// ./markers/PointLayer.tsx
// 'use client'
// import React from 'react'
// import { GeoJSON } from 'react-leaflet'
// import L from 'leaflet'
// import type { Feature, FeatureCollection, Point } from 'geojson'
// import type { Renderer } from 'leaflet'

// type Props = {
//   data: FeatureCollection<Point, any>
//   pane?: string
//   renderer?: Renderer
//   renderPopupHTML?: (f: Feature<Point, any>) => string
//   renderTooltipHTML?: (f: Feature<Point, any>) => string
// }

// function defaultTooltipHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `<div class="text-xs leading-4"><div class="font-medium">${title}</div><div class="opacity-80">${sub || ''}</div></div>`
// }
// function defaultPopupHTML(f: Feature<Point, any>) {
//   const p = f.properties || {}
//   const kv = (label: string, value?: any) =>
//     value ? `<div><span class="font-medium">${label}:</span> ${value}</div>` : ''
//   const title = p.popupTitle || p.nome || p.tipologia || 'Dettagli'
//   const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
//   return `
//     <div style="min-width:220px;max-width:280px">
//       <div class="mb-1"><strong>${title}</strong></div>
//       ${sub ? `<div class="text-xs opacity-80 mb-2">${sub}</div>` : ''}
//       ${kv('Tipologia', p.tipologia)}
//       ${kv('Proprietario', p.proprietario)}
//       ${kv('Costruttore', p.costruttore)}
//       ${kv('Stato', p.stato)}
//       ${kv('Potenza', p.potenza ? p.potenza + ' MW' : undefined)}
//       ${kv('Estensione', p.estensione ? p.estensione + ' ha' : undefined)}
//     </div>`
// }

// export default function PointLayer({
//   data,
//   pane,
//   renderer,
//   renderPopupHTML = defaultPopupHTML,
//   renderTooltipHTML = defaultTooltipHTML,
// }: Props) {
//   return (
//     <GeoJSON
//       pane={pane}
//       renderer={renderer}
//       data={data as any}
//       pointToLayer={(feature, latlng) =>
//         L.circleMarker(latlng, {
//           radius: 6,
//           weight: 2,
//           color: '#047857',
//           fillColor: '#34d399',
//           fillOpacity: 0.95,
//         })
//       }
//       onEachFeature={(feature: any, layer) => {
//         // keep points on top within their pane
//         try {
//           layer.bringToFront?.()
//         } catch {}

//         layer.bindTooltip(renderTooltipHTML(feature), {
//           sticky: true,
//           direction: 'top',
//           opacity: 0.95,
//           className: 'leaflet-tooltip-own',
//         })
//         layer.bindPopup(renderPopupHTML(feature), {
//           closeButton: true,
//           autoPan: true,
//           maxWidth: 320,
//           closeOnClick: true,
//         })

//         layer.on('mouseover', () => {
//           ;(layer as any).openTooltip()
//           ;(layer as any).setStyle?.({ weight: 3, color: '#065f46', fillOpacity: 1 })
//         })
//         layer.on('mouseout', () => {
//           ;(layer as any).closeTooltip()
//           ;(layer as any).setStyle?.({
//             weight: 2,
//             color: '#047857',
//             fillColor: '#34d399',
//             fillOpacity: 0.95,
//           })
//         })
//       }}
//     />
//   )
// }

'use client'
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection, Point } from 'geojson'

type Props = {
  data: FeatureCollection<Point, any> // <- strictly Points
  pane?: string
  /** Optional: customize markup */
  renderPopupHTML?: (f: Feature<Point, any>) => string
  renderTooltipHTML?: (f: Feature<Point, any>) => string
}

function defaultTooltipHTML(f: Feature<Point, any>) {
  const p = f.properties || {}
  const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
  const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
  return `
    <div class="text-xs leading-4">
      <div class="font-medium">${title}</div>
      <div class="opacity-80">${sub || ''}</div>
    </div>
  `
}

function defaultPopupHTML(f: Feature<Point, any>) {
  const p = f.properties || {}
  const kv = (label: string, value?: any) =>
    value ? `<div><span class="font-medium">${label}:</span> ${value}</div>` : ''
  const title = p.popupTitle || p.nome || p.tipologia || 'Dettagli'
  const sub = p.popupSubtitle || [p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')
  return `
    <div style="min-width:220px;max-width:280px">
      <div class="mb-1"><strong>${title}</strong></div>
      ${sub ? `<div class="text-xs opacity-80 mb-2">${sub}</div>` : ''}
      ${kv('Tipologia', p.tipologia)}
      ${kv('Proprietario', p.proprietario)}
      ${kv('Costruttore', p.costruttore)}
      ${kv('Stato', p.stato)}
      ${kv('Potenza', p.potenza ? p.potenza + ' MW' : undefined)}
      ${kv('Estensione', p.estensione ? p.estensione + ' ha' : undefined)}
    </div>
  `
}

export default function PointLayer({
  data,
  pane,
  renderPopupHTML = defaultPopupHTML,
  renderTooltipHTML = defaultTooltipHTML,
}: Props) {
  return (
    <GeoJSON
      pane={pane}
      data={data as any}
      pointToLayer={(feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          weight: 2,
          color: '#047857', // emerald-700
          fillColor: '#34d399', // emerald-400
          fillOpacity: 0.95,
        })
      }
      onEachFeature={(feature: any, layer) => {
        // tooltip on hover
        layer.bindTooltip(renderTooltipHTML(feature), {
          sticky: true,
          direction: 'top',
          opacity: 0.95,
          className: 'leaflet-tooltip-own',
        })
        // popup on click
        layer.bindPopup(renderPopupHTML(feature), {
          closeButton: true,
          autoPan: true,
          maxWidth: 320,
          closeOnClick: true,
        })
        // hover effect
        layer.on('mouseover', () => {
          ;(layer as any).openTooltip()
          ;(layer as any).setStyle?.({ weight: 3, color: '#065f46', fillOpacity: 1 })
          try {
            layer.bringToFront?.()
          } catch {}
        })
        layer.on('mouseout', () => {
          ;(layer as any).closeTooltip()
          ;(layer as any).setStyle?.({
            weight: 2,
            color: '#047857',
            fillColor: '#34d399',
            fillOpacity: 0.95,
          })
        })
      }}
    />
  )
}
