// PointLayer.tsx
'use client'
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import { FeatureCollection } from 'geojson'

type Props = {
  data: FeatureCollection
}

export default function PointLayer({ data }: Props) {
  return (
    <GeoJSON
      data={data as any}
      pointToLayer={(feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          weight: 2,
          color: '#047857', // emerald-700
          fillColor: '#34d399', // emerald-400
          fillOpacity: 0.85,
        })
      }
      onEachFeature={(feature, layer) => {
        const p = feature.properties || {}
        const title = p.popupTitle || p.nome || p.tipologia || 'Punto'
        const sub = p.popupSubtitle || [p.regione, p.comune].filter(Boolean).join(' • ')
        layer.bindPopup(`<strong>${title}</strong><br/>${sub}`)
      }}
    />
  )
}
