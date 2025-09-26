// 'use client'
// import React, { useState, useEffect, FC } from 'react'
// import { MapContainer, TileLayer, GeoJSON, GeoJSONProps } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { LeafletMouseEventHandlerFn, LatLngExpression } from 'leaflet'
// //import CustomMarker from './Marker'
// import BackButton from './BackButton'

// interface MapProps {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   geoData: GeoJSONProps['data']
//   onBack: () => void
//   onRegionClick: LeafletMouseEventHandlerFn
// }

// const Map: FC<MapProps> = (props) => {
//   const [mapKey, setMapKey] = useState(0)

//   useEffect(() => {
//     // Forza il re-render della mappa quando storeData cambia
//     setMapKey((prevKey) => prevKey + 1)
//   }, [props])

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={props.mapCenter}
//         zoom={props.zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />
//         <BackButton
//           title={'Indietro'}
//           markerPosition={[20.27, -157]}
//           description="This is a custom description!"
//           onClick={props.onBack}
//         />

//         <GeoJSON
//           data={props.geoData}
//           onEachFeature={(feature, layer) => {
//             layer.on({
//               click: props.onRegionClick,
//               //change:console.log("DONE")
//             })
//           }}
//         />
//       </MapContainer>
//     </div>
//   )
// }

// export default Map

// //2ND VERSION
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { MapContainer, TileLayer, GeoJSON, GeoJSONProps } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { LatLngExpression } from 'leaflet'
// import BackButton from './BackButton'

// type CompareMapProps = {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   geoData: GeoJSONProps['data'] // FeatureCollection
//   onBack: () => void
//   onRegionClick: (feature: any) => void
// }

// export default function CompareMap({
//   mapCenter,
//   zoomLevel,
//   geoData,
//   onBack,
//   onRegionClick,
// }: CompareMapProps) {
//   const [mapKey, setMapKey] = useState(0)

//   // Remount the whole map only when center/zoom change a lot
//   useEffect(() => {
//     setMapKey((k) => k + 1)
//   }, [mapCenter, zoomLevel])

//   // Force a *fresh* GeoJSON layer whenever its content changes
//   const geoKey = useMemo(() => {
//     const fc = geoData as any
//     const len = fc?.features?.length ?? 0
//     // include a tiny checksum so key changes when geometries change
//     const sig =
//       len > 0
//         ? (fc.features[0].properties?.reg_name ??
//           fc.features[0].properties?.prov_name ??
//           fc.features[0].properties?.name ??
//           'x')
//         : 'empty'
//     return `geo-${len}-${sig}`
//   }, [geoData])

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={mapCenter}
//         zoom={zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <BackButton
//           title="Indietro"
//           markerPosition={[20.27, -157]}
//           description="Back one level"
//           onClick={onBack}
//         />

//         <GeoJSON
//           key={geoKey}
//           data={geoData}
//           style={() => ({
//             weight: 1,
//             color: '#4b6c3f',
//             fillOpacity: 0.25,
//           })}
//           onEachFeature={(feature, layer) => {
//             layer.on('click', () => {
//               console.log(feature)
//               onRegionClick(feature)
//             }) // <- pass feature directly
//             layer.on('mouseover', () => {
//               ;(layer as any).setStyle?.({ weight: 2, color: '#000', fillOpacity: 0.35 })
//               try {
//                 layer.bringToFront?.()
//               } catch {}
//             })
//             layer.on('mouseout', () => {
//               ;(layer as any).setStyle?.({ weight: 1, color: '#333', fillOpacity: 0.25 })
//             })
//           }}
//         />
//       </MapContainer>
//     </div>
//   )
// }

// //THIRD VERSION
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { MapContainer, TileLayer, GeoJSON, GeoJSONProps, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { LatLngExpression, LatLngBoundsExpression } from 'leaflet'
// import BackButton from './BackButton'

// type CompareMapProps = {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   geoData: GeoJSONProps['data'] // FeatureCollection
//   onBack: () => void
//   onRegionClick: (feature: any) => void
// }

// function FitBoundsOnData({ data }: { data: any }) {
//   const map = useMap()

//   useEffect(() => {
//     const fc = data as any
//     const feats = fc?.features || []
//     if (!feats.length) return
//     // Build bounds from all polygon coordinates
//     const bounds: [number, number][] = []

//     feats.forEach((f: any) => {
//       const geom = f.geometry
//       if (!geom) return
//       const addCoord = (coord: any) => {
//         // GeoJSON is [lng, lat]
//         const [lng, lat] = coord
//         bounds.push([lat, lng])
//       }
//       if (geom.type === 'Polygon') {
//         geom.coordinates.forEach((ring: any[]) => ring.forEach(addCoord))
//       } else if (geom.type === 'MultiPolygon') {
//         geom.coordinates.forEach((poly: any[]) =>
//           poly.forEach((ring: any[]) => ring.forEach(addCoord)),
//         )
//       }
//     })

//     if (bounds.length) {
//       map.fitBounds(bounds as unknown as LatLngBoundsExpression, { padding: [30, 30] })
//     }
//   }, [data, map])

//   return null
// }

// export default function CompareMap({
//   mapCenter,
//   zoomLevel,
//   geoData,
//   onBack,
//   onRegionClick,
// }: CompareMapProps) {
//   const [mapKey, setMapKey] = useState(0)

//   // Remount the map only when center/zoom truly change
//   useEffect(() => {
//     setMapKey((k) => k + 1)
//   }, [mapCenter, zoomLevel])

//   const { hasFeatures, geoKey } = useMemo(() => {
//     const fc = geoData as any
//     const len = fc?.features?.length ?? 0
//     const first = len > 0 ? fc.features[0] : undefined
//     const sig =
//       first?.properties?.reg_name ??
//       first?.properties?.prov_name ??
//       first?.properties?.name ??
//       'empty'
//     return { hasFeatures: len > 0, geoKey: `geo-${len}-${sig}` }
//   }, [geoData])

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={mapCenter}
//         zoom={zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <BackButton
//           title="Indietro"
//           markerPosition={[20.27, -157]}
//           description="Back one level"
//           onClick={onBack}
//         />

//         {/* Auto-fit to GeoJSON when it changes */}
//         {hasFeatures && <FitBoundsOnData data={geoData} />}

//         {hasFeatures ? (
//           <GeoJSON
//             key={geoKey}
//             data={geoData}
//             style={() => ({
//               weight: 1.5,
//               color: '#1e3a8a', // visible stroke (blue-900)
//               fillColor: '#60a5fa', // visible fill (blue-400)
//               fillOpacity: 0.25,
//             })}
//             onEachFeature={(feature, layer) => {
//               layer.on('click', () => onRegionClick(feature)) // pass feature directly
//               layer.on('mouseover', () => {
//                 ;(layer as any).setStyle?.({
//                   weight: 2,
//                   color: '#111827', // gray-900
//                   fillOpacity: 0.4,
//                 })
//                 try {
//                   layer.bringToFront?.()
//                 } catch {}
//               })
//               layer.on('mouseout', () => {
//                 ;(layer as any).setStyle?.({
//                   weight: 1.5,
//                   color: '#1e3a8a',
//                   fillColor: '#60a5fa',
//                   fillOpacity: 0.25,
//                 })
//               })
//             }}
//           />
//         ) : (
//           // Helpful placeholder if your filter produced zero features
//           <div
//             className="absolute z-[999] top-2 left-2 bg-white/90 rounded-md px-3 py-1 text-sm shadow"
//             style={{ pointerEvents: 'none' }}
//           >
//             Nessuna geometria da mostrare per il filtro/area corrente
//           </div>
//         )}
//       </MapContainer>
//     </div>
//   )
// }

//FOURTH VERSION
// CompareMap.tsx
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { MapContainer, TileLayer, GeoJSON, GeoJSONProps, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L, { LatLngExpression, LatLngBoundsExpression } from 'leaflet'
// import BackButton from './BackButton'

// type CompareMapProps = {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   geoData: GeoJSONProps['data'] // polygons FeatureCollection
//   pointData?: GeoJSONProps['data'] // points FeatureCollection (optional)
//   onBack: () => void
//   onRegionClick: (feature: any) => void
// }

// function FitBoundsOnData({ polys, points }: { polys: any; points?: any }) {
//   const map = useMap()

//   useEffect(() => {
//     const bounds: [number, number][] = []

//     const addPoly = (f: any) => {
//       const g = f.geometry
//       if (!g) return
//       const add = (c: any) => bounds.push([c[1], c[0]]) // [lat, lon]
//       if (g.type === 'Polygon') g.coordinates.forEach((ring: any[]) => ring.forEach(add))
//       if (g.type === 'MultiPolygon')
//         g.coordinates.forEach((poly: any[]) => poly.forEach((ring: any[]) => ring.forEach(add)))
//     }

//     const addPoint = (f: any) => {
//       const g = f.geometry
//       if (!g || g.type !== 'Point') return
//       const [lon, lat] = g.coordinates
//       bounds.push([lat, lon])
//     }

//     const pf = polys?.features || []
//     pf.forEach(addPoly)

//     const qf = points?.features || []
//     qf.forEach(addPoint)

//     if (bounds.length) {
//       map.fitBounds(bounds as unknown as LatLngBoundsExpression, { padding: [30, 30] })
//     }
//   }, [polys, points, map])

//   return null
// }

// export default function CompareMap({
//   mapCenter,
//   zoomLevel,
//   geoData,
//   pointData,
//   onBack,
//   onRegionClick,
// }: CompareMapProps) {
//   const [mapKey, setMapKey] = useState(0)

//   useEffect(() => {
//     setMapKey((k) => k + 1)
//   }, [mapCenter, zoomLevel])

//   const { polyHasFeatures, pointHasFeatures, polyKey, pointKey } = useMemo(() => {
//     const fc = geoData as any
//     const len = fc?.features?.length ?? 0
//     const first = len > 0 ? fc.features[0] : undefined
//     const sig =
//       first?.properties?.reg_name ??
//       first?.properties?.prov_name ??
//       first?.properties?.name ??
//       'empty'

//     const pfc = pointData as any
//     const plen = pfc?.features?.length ?? 0
//     const pfirst = plen > 0 ? pfc.features[0] : undefined
//     const psig = pfirst?.properties?.popupTitle ?? 'p-empty'

//     return {
//       polyHasFeatures: len > 0,
//       pointHasFeatures: plen > 0,
//       polyKey: `geo-${len}-${sig}`,
//       pointKey: `pts-${plen}-${psig}`,
//     }
//   }, [geoData, pointData])

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={mapCenter}
//         zoom={zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <BackButton
//           title="Indietro"
//           markerPosition={[20.27, -157]}
//           description="Back one level"
//           onClick={onBack}
//         />

//         {(polyHasFeatures || pointHasFeatures) && (
//           <FitBoundsOnData polys={geoData} points={pointData} />
//         )}

//         {/* Polygons */}
//         {polyHasFeatures ? (
//           <GeoJSON
//             key={polyKey}
//             data={geoData}
//             style={() => ({
//               weight: 1.5,
//               color: '#1e3a8a',
//               fillColor: '#60a5fa',
//               fillOpacity: 0.25,
//             })}
//             onEachFeature={(feature, layer) => {
//               layer.on('click', () => onRegionClick(feature))
//               layer.on('mouseover', () => {
//                 ;(layer as any).setStyle?.({ weight: 2, color: '#111827', fillOpacity: 0.4 })
//                 try {
//                   layer.bringToFront?.()
//                 } catch {}
//               })
//               layer.on('mouseout', () => {
//                 ;(layer as any).setStyle?.({
//                   weight: 1.5,
//                   color: '#1e3a8a',
//                   fillColor: '#60a5fa',
//                   fillOpacity: 0.25,
//                 })
//               })
//             }}
//           />
//         ) : (
//           <div
//             className="absolute z-[999] top-2 left-2 bg-white/90 rounded-md px-3 py-1 text-sm shadow"
//             style={{ pointerEvents: 'none' }}
//           >
//             Nessuna geometria da mostrare per l’area corrente
//           </div>
//         )}

//         {/* Points as circle markers (no icon issues) */}
//         {pointHasFeatures && (
//           <GeoJSON
//             key={pointKey}
//             data={pointData as any}
//             pointToLayer={(feature, latlng) =>
//               L.circleMarker(latlng, {
//                 radius: 6,
//                 weight: 2,
//                 color: '#047857', // emerald-700
//                 fillColor: '#34d399', // emerald-400
//                 fillOpacity: 0.8,
//               })
//             }
//             onEachFeature={(feature, layer) => {
//               const p = feature.properties || {}
//               const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
//               const sub = p.popupSubtitle || `${p.regione ?? ''} ${p.comune ?? ''}`.trim()
//               layer.bindPopup(`<strong>${title}</strong><br/>${sub}`)
//             }}
//           />
//         )}
//       </MapContainer>
//     </div>
//   )
// }

//FIFTH VERSION
// Map.tsx (CompareMap)
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
// import { FeatureCollection } from 'geojson'
// import BackButton from './BackButton'
// import PolygonLayer from './markers/PolygonLayer'
// import PointLayer from './markers/PointLayer'

// type Props = {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   polygons: FeatureCollection
//   points?: FeatureCollection
//   onBack: () => void
//   onRegionClick: (feature: any) => void
// }

// function FitBoundsOnData({
//   polygons,
//   points,
// }: {
//   polygons: FeatureCollection
//   points?: FeatureCollection
// }) {
//   const map = useMap()
//   useEffect(() => {
//     const bounds: [number, number][] = []

//     const addPoly = (f: any) => {
//       const g = f.geometry
//       if (!g) return
//       const add = (c: any) => bounds.push([c[1], c[0]])
//       if (g.type === 'Polygon') g.coordinates.forEach((ring: any[]) => ring.forEach(add))
//       if (g.type === 'MultiPolygon')
//         g.coordinates.forEach((poly: any[]) => poly.forEach((ring: any[]) => ring.forEach(add)))
//     }
//     const addPoint = (f: any) => {
//       const g = f.geometry
//       if (g?.type === 'Point') {
//         const [lon, lat] = g.coordinates
//         bounds.push([lat, lon])
//       }
//     }

//     ;(polygons?.features || []).forEach(addPoly)
//     ;(points?.features || []).forEach(addPoint)

//     if (bounds.length) {
//       map.fitBounds(bounds as unknown as LatLngBoundsExpression, { padding: [30, 30] })
//     }
//   }, [polygons, points, map])

//   return null
// }

// export default function Map({
//   mapCenter,
//   zoomLevel,
//   polygons,
//   points,
//   onBack,
//   onRegionClick,
// }: Props) {
//   const [mapKey, setMapKey] = useState(0)
//   useEffect(() => {
//     setMapKey((k) => k + 1)
//   }, [mapCenter, zoomLevel])

//   const { polyKey, pointKey, hasPolys, hasPoints } = useMemo(() => {
//     const len = polygons?.features?.length ?? 0
//     const first = len > 0 ? polygons.features[0] : undefined
//     const sig =
//       first?.properties?.reg_name ??
//       first?.properties?.prov_name ??
//       first?.properties?.name ??
//       'empty'

//     const plen = points?.features?.length ?? 0
//     const pfirst = plen > 0 ? points.features[0] : undefined
//     const psig = pfirst?.properties?.popupTitle ?? 'p-empty'

//     return {
//       polyKey: `poly-${len}-${sig}`,
//       pointKey: `pts-${plen}-${psig}`,
//       hasPolys: len > 0,
//       hasPoints: plen > 0,
//     }
//   }, [polygons, points])

//   // console.log(
//   //   'poly features:',
//   //   (polygons as any)?.features?.length,
//   //   'types:',
//   //   (polygons as any)?.features?.map((f: any) => f.geometry?.type).slice(0, 5),
//   // )

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={mapCenter}
//         zoom={zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <BackButton
//           title="Indietro"
//           markerPosition={[20.27, -157]}
//           description="Back one level"
//           onClick={onBack}
//         />

//         {(hasPolys || hasPoints) && <FitBoundsOnData polygons={polygons} points={points} />}

//         {hasPolys ? (
//           <PolygonLayer key={polyKey} data={polygons} onFeatureClick={onRegionClick} />
//         ) : (
//           <div className="absolute z-[999] top-2 left-2 bg-white/90 rounded-md px-3 py-1 text-sm shadow">
//             Nessuna geometria da mostrare
//           </div>
//         )}

//         {hasPoints && (
//           // <PointLayer key={pointKey} data={points!} />
//           <PointLayer
//             key={pointKey}
//             data={points!}
//             renderTooltipHTML={(f) => {
//               const p = f.properties || {}
//               return `<div><strong>${p.nome || 'Impianto'}</strong><br/>${[p.comune, p.regione].filter(Boolean).join(' • ')}</div>`
//             }}
//             renderPopupHTML={(f) => {
//               const p = f.properties || {}
//               return `
//       <div style="min-width:220px;max-width:300px">
//         <div class="mb-1"><strong>${p.nome || 'Dettaglio punto'}</strong></div>
//         <div class="text-xs opacity-80 mb-2">${[p.regione, p.provincia, p.comune].filter(Boolean).join(' • ')}</div>
//         <div>Tipologia: ${p.tipologia || '-'}</div>
//         <div>Proprietario: ${p.proprietario || '-'}</div>
//         <div>Costruttore: ${p.costruttore || '-'}</div>
//         <div>Stato: ${p.stato || '-'}</div>
//       </div>
//     `
//             }}
//           />
//         )}
//       </MapContainer>
//     </div>
//   )
// }

// Map.tsx
// Map.tsx
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { MapContainer, TileLayer, useMap, Pane } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
// import { FeatureCollection,Point } from 'geojson'
// import BackButton from './BackButton'
// import PolygonLayer from './markers/PolygonLayer'
// import PointLayer from './markers/PointLayer'

// type Props = {
//   mapCenter: LatLngExpression
//   zoomLevel: number
//   polygons: FeatureCollection
//   points?: FeatureCollection
//   onBack: () => void
//   onRegionClick: (feature: any) => void
// }

// function FitBoundsOnData({
//   polygons,
//   points,
// }: {
//   polygons: FeatureCollection
//   points?: FeatureCollection
// }) {
//   const map = useMap()
//   useEffect(() => {
//     const bounds: [number, number][] = []
//     const addPoly = (f: any) => {
//       const g = f.geometry
//       if (!g) return
//       const add = (c: any) => bounds.push([c[1], c[0]])
//       if (g.type === 'Polygon') g.coordinates.forEach((ring: any[]) => ring.forEach(add))
//       if (g.type === 'MultiPolygon')
//         g.coordinates.forEach((poly: any[]) => poly.forEach((ring: any[]) => ring.forEach(add)))
//     }
//     const addPoint = (f: any) => {
//       const g = f.geometry
//       if (g?.type === 'Point') {
//         const [lon, lat] = g.coordinates
//         bounds.push([lat, lon])
//       }
//     }
//     ;(polygons?.features || []).forEach(addPoly)
//     ;(points?.features || []).forEach(addPoint)
//     if (bounds.length)
//       map.fitBounds(bounds as unknown as LatLngBoundsExpression, { padding: [30, 30] })
//   }, [polygons, points, map])
//   return null
// }

// export default function Map({
//   mapCenter,
//   zoomLevel,
//   polygons,
//   points,
//   onBack,
//   onRegionClick,
// }: Props) {
//   const [mapKey, setMapKey] = useState(0)
//   useEffect(() => {
//     setMapKey((k) => k + 1)
//   }, [mapCenter, zoomLevel])

//   const { polyKey, pointKey, hasPolys, hasPoints } = useMemo(() => {
//     const len = polygons?.features?.length ?? 0
//     const first = len > 0 ? polygons.features[0] : undefined
//     const sig =
//       first?.properties?.reg_name ??
//       first?.properties?.prov_name ??
//       first?.properties?.name ??
//       'empty'

//     const plen = points?.features?.length ?? 0
//     const pfirst = plen > 0 ? points!.features[0] : undefined
//     const psig = pfirst?.properties?.popupTitle ?? 'p-empty'

//     return {
//       polyKey: `poly-${len}-${sig}`,
//       pointKey: `pts-${plen}-${psig}`,
//       hasPolys: len > 0,
//       hasPoints: plen > 0,
//     }
//   }, [polygons, points])

//   // TEMP sanity log (remove once you see polygons)
//   // console.log(
//   //   'polygons count:',
//   //   polygons?.features?.length,
//   //   'first geom:',
//   //   polygons?.features?.[0]?.geometry?.type,
//   // )

//   return (
//     <div className="flex max-h-screen mt-6 rounded-md">
//       <MapContainer
//         key={mapKey}
//         center={mapCenter}
//         zoom={zoomLevel}
//         className="rounded-xl w-full h-[1000px]"
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <BackButton
//           title="Indietro"
//           markerPosition={[20.27, -157]}
//           description="Back one level"
//           onClick={onBack}
//         />

//         {(hasPolys || hasPoints) && <FitBoundsOnData polygons={polygons} points={points} />}

//         {/* Create panes with explicit z-index (points above) */}
//         <Pane name="polys" style={{ zIndex: 300, pointerEvents: 'auto' }} />
//         <Pane name="points" style={{ zIndex: 750, pointerEvents: 'auto' }} />

//         {hasPolys ? (
//           <PolygonLayer key={polyKey} data={polygons} onFeatureClick={onRegionClick} pane="polys" />
//         ) : (
//           <div className="absolute z-[999] top-2 left-2 bg-white/90 rounded-md px-3 py-1 text-sm shadow">
//             Nessuna geometria da mostrare
//           </div>
//         )}

//         {hasPoints && <PointLayer key={pointKey} data={points!} pane="points" />}
//       </MapContainer>
//     </div>
//   )
// }

'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Pane, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import type { Feature, FeatureCollection, Geometry, Point } from 'geojson'
import BackButton from './BackButton'
import PolygonLayer from './markers/PolygonLayer'
import PointLayer from './markers/PointLayer'

type Props = {
  mapCenter: LatLngExpression
  zoomLevel: number
  /** Polygons FeatureCollection (regions/provinces/municipalities/macro) */
  polygons: FeatureCollection<Geometry, any>
  /** Mixed features allowed; we'll filter to Points below */
  points?: FeatureCollection<Geometry, any>
  onBack: () => void
  onRegionClick: (feature: any) => void
}

function FitBoundsOnData({
  polygons,
  points,
}: {
  polygons: FeatureCollection<Geometry, any>
  points?: FeatureCollection<Point, any>
}) {
  const map = useMap()

  useEffect(() => {
    const bounds: [number, number][] = []

    const addPoly = (f: Feature<Geometry, any>) => {
      const g = f.geometry
      if (!g) return
      const add = (c: number[]) => bounds.push([c[1], c[0]]) // [lat, lon]
      if (g.type === 'Polygon') g.coordinates.forEach((ring: any[]) => ring.forEach(add))
      if (g.type === 'MultiPolygon')
        g.coordinates.forEach((poly: any[]) => poly.forEach((ring: any[]) => ring.forEach(add)))
    }

    const addPoint = (f: Feature<Point, any>) => {
      const [lon, lat] = f.geometry.coordinates
      bounds.push([lat, lon])
    }

    ;(polygons?.features || []).forEach(addPoly)
    ;(points?.features || []).forEach(addPoint)

    if (bounds.length) {
      map.fitBounds(bounds as unknown as LatLngBoundsExpression, { padding: [30, 30] })
    }
  }, [polygons, points, map])

  return null
}

export default function Map({
  mapCenter,
  zoomLevel,
  polygons,
  points,
  onBack,
  onRegionClick,
}: Props) {
  const [mapKey, setMapKey] = useState(0)
  useEffect(() => {
    setMapKey((k) => k + 1)
  }, [mapCenter, zoomLevel])

  // ✅ Create a points-only FeatureCollection (strictly Point geometry)
  const pointsOnly = useMemo<FeatureCollection<Point, any>>(() => {
    const feats =
      points?.features?.filter((f): f is Feature<Point, any> => f?.geometry?.type === 'Point') ?? []
    return { type: 'FeatureCollection', features: feats }
  }, [points])

  const { polyKey, pointKey, hasPolys, hasPoints } = useMemo(() => {
    const len = polygons?.features?.length ?? 0
    const first = len > 0 ? polygons.features[0] : undefined
    const sig =
      (first?.properties as any)?.reg_name ??
      (first?.properties as any)?.prov_name ??
      (first?.properties as any)?.name ??
      'empty'

    const plen = pointsOnly?.features?.length ?? 0
    const pfirst = plen > 0 ? pointsOnly.features[0] : undefined
    const psig =
      (pfirst?.properties as any)?.popupTitle ?? (pfirst?.properties as any)?.nome ?? 'p-empty'

    return {
      polyKey: `poly-${len}-${sig}`,
      pointKey: `pts-${plen}-${psig}`,
      hasPolys: len > 0,
      hasPoints: plen > 0,
    }
  }, [polygons, pointsOnly])

  return (
    <div className="flex max-h-screen mt-6 rounded-md">
      <MapContainer
        key={mapKey}
        center={mapCenter}
        zoom={zoomLevel}
        className="rounded-xl w-full h-[1000px]"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <BackButton
          title="Indietro"
          markerPosition={[20.27, -157]}
          description="Back one level"
          onClick={onBack}
        />

        {(hasPolys || hasPoints) && <FitBoundsOnData polygons={polygons} points={pointsOnly} />}

        {/* Keep polygons interactive but visually below points */}
        <Pane name="polys" style={{ zIndex: 300, pointerEvents: 'auto' }} />
        <Pane name="points" style={{ zIndex: 700, pointerEvents: 'auto' }} />

        {hasPolys ? (
          <PolygonLayer key={polyKey} data={polygons} onFeatureClick={onRegionClick} pane="polys" />
        ) : (
          <div className="absolute z-[999] top-2 left-2 bg-white/90 rounded-md px-3 py-1 text-sm shadow">
            Nessuna geometria da mostrare
          </div>
        )}

        {hasPoints && <PointLayer key={pointKey} data={pointsOnly} pane="points" />}
      </MapContainer>
    </div>
  )
}
