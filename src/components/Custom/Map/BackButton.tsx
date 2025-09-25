import { useEffect, useRef, FC } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'

interface BackButtonProps {
  title: string
  markerPosition: LatLngExpression
  description: string
  onClick: () => void
}

const BackButton: FC<BackButtonProps> = ({ title, markerPosition, description, onClick }) => {
  const map = useMap()
  const helpDivRef = useRef<HTMLButtonElement | null>(null)

  const createButtonControl = () => {
    const MapHelp = L.Control.extend({
      onAdd: () => {
        const helpDiv = L.DomUtil.create(
          'button',
          'px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700',
        )
        helpDivRef.current = helpDiv
        helpDiv.innerHTML = title

        helpDiv.addEventListener('click', () => {
          onClick()
        })

        return helpDiv
      },
    })
    return new MapHelp({ position: 'topright' })
  }

  useEffect(() => {
    const control = createButtonControl()
    control.addTo(map)

    return () => {
      if (helpDivRef.current) {
        helpDivRef.current.remove()
      }
    }
  }, [map, title, markerPosition, description])

  return null
}

export default BackButton
