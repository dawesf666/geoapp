import type { FeatureCollection, Geometry, GeoJsonProperties, BBox } from 'geojson'

export function toFeatureCollection<
  G extends Geometry = Geometry,
  P = GeoJsonProperties
>(fcLike: any): FeatureCollection<G, P> {
  // Valida bbox: se non è una tuple [4] o [6], rimuovila
  let bbox: BBox | undefined
  if (Array.isArray(fcLike?.bbox) && (fcLike.bbox.length === 4 || fcLike.bbox.length === 6)) {
    // TypeScript accetta solo tuple; forziamo con as const dove possibile
    bbox = fcLike.bbox as BBox
  }

  return {
    type: 'FeatureCollection',
    // mantieni le feature così come sono
    features: (fcLike?.features ?? []) as FeatureCollection<G, P>['features'],
    // includi bbox solo se valida
    ...(bbox ? { bbox } : {}),
  }
}