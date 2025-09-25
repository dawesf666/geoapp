// PolygonLayer.tsx
'use client'
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import { FeatureCollection } from 'geojson'

type Props = {
  data: FeatureCollection
  onFeatureClick?: (feature: any) => void
}

export default function PolygonLayer({ data, onFeatureClick }: Props) {
  return (
    <GeoJSON
      data={data as any}
      style={() => ({
        weight: 1.5,
        color: '#1e3a8a', // blue-900
        fillColor: '#60a5fa', // blue-400
        fillOpacity: 0.25,
      })}
      onEachFeature={(feature, layer) => {
        if (onFeatureClick) {
          layer.on('click', () => onFeatureClick(feature))
        }
        layer.on('mouseover', () => {
          ;(layer as any).setStyle?.({ weight: 2, color: '#111827', fillOpacity: 0.4 })
          try {
            layer.bringToFront?.()
          } catch {}
        })
        layer.on('mouseout', () => {
          ;(layer as any).setStyle?.({
            weight: 1.5,
            color: '#1e3a8a',
            fillColor: '#60a5fa',
            fillOpacity: 0.25,
          })
        })
      }}
    />
  )
}
