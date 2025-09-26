// MapBody.tsx
'use client'

import React, { useCallback, useMemo, useState } from 'react'
import * as turf from '@turf/turf'
import { LatLngExpression } from 'leaflet'
import { FeatureCollection, Feature, Geometry } from 'geojson'

import Map from './Map'
import FilterMap from './FilterMap'
import Sumburst from './charts/Sumburst'

import italyMacro from './statics/map_macro.json'
import italyRegions from './statics/map_regions.json'
import italyProvinces from './statics/map_provinces.json'
import italyMunicipalities from './statics/map_municipalities.json'
import mockData from './mockData.json'

type Filters = {
  tipologia?: string
  regione?: string
  comune?: string
  nome?: string
  proprietario?: string
  costruttore?: string
  stato?: string
  potenza?: string
  estensione?: string
}

const ITALY_CENTER: LatLngExpression = [42.0, 12.0]
const ZOOM_LEVELS = { country: 6, macro: 6, region: 8, province: 9, municipality: 11 } as const

type AreaType = 'macro' | 'region' | 'province' | 'municipality'
type SelectedArea = {
  type: AreaType
  name: string
  feature: Feature
  acceptedRegions?: string[]
} | null

// ---- helpers
function toPointFC(rows: any[]): FeatureCollection {
  const features: Feature[] = rows
    .filter((r) => Array.isArray(r.coordinates) && r.coordinates.length === 2)
    .map((r) => {
      const [lat, lon] = r.coordinates // your mock is [lat, lon]
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lon, lat] }, // GeoJSON is [lon, lat]
        properties: {
          ...r,
          popupTitle: r.nome ?? r.tipologia ?? 'Punto',
          popupSubtitle: [r.regione, r.comune].filter(Boolean).join(' • '),
        },
      } as Feature
    })
  return { type: 'FeatureCollection', features }
}

function buildSunburst(rows: any[]) {
  const tree: Record<string, Record<string, Record<string, number>>> = {}
  for (const d of rows) {
    const tip = d.tipologia ?? 'N/D'
    const reg = d.regione ?? 'N/D'
    const com = d.comune ?? 'N/D'
    tree[tip] ??= {}
    tree[tip][reg] ??= {}
    tree[tip][reg][com] = (tree[tip][reg][com] ?? 0) + 1
  }
  const out: any[] = []
  for (const [tip, regMap] of Object.entries(tree)) {
    const tipNode: any = { name: tip, children: [] as any[] }
    for (const [reg, comMap] of Object.entries(regMap)) {
      const comuni = Object.entries(comMap).map(([name, value]) => ({ name, value }))
      const value = comuni.reduce((s, c: any) => s + (c.value || 0), 0)
      tipNode.children.push({ name: reg, value, children: comuni })
    }
    out.push(tipNode)
  }
  return out
}

export default function MapBody({ data = (mockData as any).features }: { data?: any[] }) {
  const [selectedArea, setSelectedArea] = useState<SelectedArea>(null)
  const [filters, setFilters] = useState<Filters>({})

  // ---- polygons shown (drill-down only by selectedArea)
  const geoData = useMemo<FeatureCollection>(() => {
    if (!selectedArea) return italyMacro as FeatureCollection

    const REG = italyRegions as FeatureCollection
    const PROV = italyProvinces as FeatureCollection
    const MUNI = italyMunicipalities as FeatureCollection

    switch (selectedArea.type) {
      case 'macro':
        return {
          type: 'FeatureCollection',
          features: REG.features.filter((f: any) =>
            selectedArea.acceptedRegions?.includes(f.properties.reg_name),
          ),
        }
      case 'region':
        return {
          type: 'FeatureCollection',
          features: PROV.features.filter((f: any) => f.properties.reg_name === selectedArea.name),
        }
      case 'province':
        return {
          type: 'FeatureCollection',
          features: MUNI.features.filter((f: any) => f.properties.prov_name === selectedArea.name),
        }
      case 'municipality':
        return {
          type: 'FeatureCollection',
          features: MUNI.features.filter((f: any) => f.properties.name === selectedArea.name),
        }
      default:
        return italyMacro as FeatureCollection
    }
  }, [selectedArea])

  // ---- rows filtered by filters (NOT by area; area is applied spatially below)
  const filteredRows = useMemo(() => {
    return (data || []).filter((d: any) => {
      return (
        (!filters.tipologia || d.tipologia === filters.tipologia) &&
        (!filters.regione || d.regione === filters.regione) &&
        (!filters.comune || d.comune === filters.comune) &&
        (!filters.nome || d.nome === filters.nome) &&
        (!filters.proprietario || d.proprietario === filters.proprietario) &&
        (!filters.costruttore || d.costruttore === filters.costruttore) &&
        (!filters.stato || d.stato === filters.stato) &&
        (!filters.potenza || d.potenza === filters.potenza) &&
        (!filters.estensione || d.estensione === filters.estensione)
      )
    })
  }, [data, filters])

  // ---- points FC from filtered rows
  const pointDataAll = useMemo(() => toPointFC(filteredRows), [filteredRows])

  // ---- spatially limit points to the current area (requirement #1)
  const pointDataWithinArea = useMemo<FeatureCollection>(() => {
    if (!selectedArea) {
      // Top level: show all points across Italy
      return pointDataAll
    }
    const polys = geoData as FeatureCollection<Geometry>
    if (!polys.features?.length) return { type: 'FeatureCollection', features: [] }

    // turf.pointsWithinPolygon handles Polygon & MultiPolygon
    try {
      const within = turf.pointsWithinPolygon(pointDataAll as any, polys as any)
      return within as unknown as FeatureCollection
    } catch {
      // Fallback: manual filter with booleanPointInPolygon
      const feats = (pointDataAll.features || []).filter((pt: any) =>
        polys.features.some((poly: any) => turf.booleanPointInPolygon(pt, poly)),
      )
      return { type: 'FeatureCollection', features: feats }
    }
  }, [pointDataAll, geoData, selectedArea])

  // ---- Sunburst data from filtered rows (already restricted by filters)
  const sunburstData = useMemo(() => buildSunburst(filteredRows), [filteredRows])

  // ---- Center & zoom from selected feature
  const currentView = useMemo(() => {
    if (!selectedArea) return { mapCenter: ITALY_CENTER, zoomLevel: ZOOM_LEVELS.country }
    const coords = turf.centerOfMass(selectedArea.feature.geometry).geometry.coordinates
    return {
      mapCenter: [coords[1], coords[0]] as LatLngExpression,
      zoomLevel: ZOOM_LEVELS[selectedArea.type],
    }
  }, [selectedArea])

  // ---- Click handler (specificity: municipality -> province -> region -> macro)
  const handleRegionClick = useCallback((feature: any) => {
    const p = feature?.properties || {}

    if (p.name) {
      const munName = p.name as string
      setSelectedArea({ type: 'municipality', name: munName, feature })
      setFilters((prev) => ({ ...prev, comune: munName }))
      return
    }
    if (p.prov_name) {
      const provinceName = p.prov_name as string
      setSelectedArea({ type: 'province', name: provinceName, feature })
      setFilters((prev) => ({ ...prev, regione: p.reg_name, comune: undefined }))
      return
    }
    if (p.reg_name) {
      const regionName = p.reg_name as string
      setSelectedArea({ type: 'region', name: regionName, feature })
      setFilters((prev) => ({ ...prev, regione: regionName, comune: undefined }))
      return
    }
    if (p.Macroregione) {
      const macro = p.Macroregione as string
      const acceptedRegions =
        macro === 'Nord Italia'
          ? [
              `Valle d'Aosta/Vallée d'Aoste`,
              'Piemonte',
              'Liguria',
              'Lombardia',
              'Veneto',
              'Trentino-Alto Adige/Südtirol',
              'Friuli-Venezia Giulia',
              'Emilia-Romagna',
            ]
          : macro === 'Centro Italia'
            ? ['Toscana', 'Umbria', 'Marche', 'Lazio']
            : [
                'Abruzzo',
                'Molise',
                'Campania',
                'Puglia',
                'Basilicata',
                'Calabria',
                'Sicilia',
                'Sardegna',
              ]
      setSelectedArea({ type: 'macro', name: macro, feature, acceptedRegions })
      setFilters({})
      return
    }
  }, [])

  // ---- Back one level
  const handleBackClick = useCallback(() => {
    if (!selectedArea) return
    if (selectedArea.type === 'municipality') {
      const provName = (selectedArea.feature.properties || {}).prov_name
      const prov = (italyProvinces as FeatureCollection).features.find(
        (p: any) => p.properties.prov_name === provName,
      )
      if (prov) setSelectedArea({ type: 'province', name: provName, feature: prov })
      setFilters((prev) => ({ ...prev, comune: undefined }))
      return
    }
    if (selectedArea.type === 'province') {
      const regName = (selectedArea.feature.properties || {}).reg_name
      const reg = (italyRegions as FeatureCollection).features.find(
        (r: any) => r.properties.reg_name === regName,
      )
      if (reg) setSelectedArea({ type: 'region', name: regName, feature: reg })
      return
    }
    setSelectedArea(null)
    setFilters({})
  }, [selectedArea])

  // ---- Filter changes keep map in sync (no effect)
  const handleFilterChange = (key: keyof Filters, value?: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))

    if (key === 'regione') {
      if (!value) {
        setSelectedArea(null)
      } else {
        const r = (italyRegions as FeatureCollection).features.find(
          (f: any) => f.properties.reg_name === value,
        )
        if (r) setSelectedArea({ type: 'region', name: value, feature: r })
      }
    }

    if (key === 'comune') {
      if (!value) {
        if (filters.regione) {
          const r = (italyRegions as FeatureCollection).features.find(
            (f: any) => f.properties.reg_name === filters.regione,
          )
          if (r) setSelectedArea({ type: 'region', name: filters.regione, feature: r })
        } else {
          setSelectedArea(null)
        }
      } else {
        const m = (italyMunicipalities as FeatureCollection).features.find(
          (f: any) => f.properties.name === value,
        )
        if (m) setSelectedArea({ type: 'municipality', name: value, feature: m })
      }
    }
  }

  return (
    <div className="block lg:flex w-full mx-auto">
      {/* MAP */}
      <div className="block w-full lg:w-2/3 mt-10">
        <div className="p-2 shadow-2xl rounded-xl">
          <Map
            mapCenter={currentView.mapCenter}
            zoomLevel={currentView.zoomLevel}
            polygons={geoData} // ✅ new prop name
            points={pointDataWithinArea} // ✅ matches Map.tsx
            onBack={handleBackClick}
            onRegionClick={handleRegionClick}
          />
        </div>
      </div>

      {/* FILTERS + CHART */}
      <div className="p-2 shadow-2xl rounded-xl mt-10 w-full lg:w-1/3">
        <FilterMap
          filters={filters}
          onFilterChange={handleFilterChange}
          data={filteredRows}
          selectedArea={selectedArea}
        />
        <div className="flex justify-center align-center mt-4">
          <Sumburst data={sunburstData} height={600} width="100%" />
        </div>
      </div>
    </div>
  )
}
