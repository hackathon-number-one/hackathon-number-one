import { useEffect, useRef } from "react"
import { markers } from "./markers"

let map

async function initMap(mapElement) {
  if (!mapElement) return

  const position = { lat: 51.5495, lng: 0.0597 }
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps")

  map = new Map(mapElement, {
    zoom: 12,
    center: position,
    mapId: "HACKNEY_MAP",
  })

  return map
}

export function getMap() {
  const mapRef = useRef(null)

  useEffect(() => {
    const googleMapsScript = document.createElement("script")
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&v=weekly&callback=initMap`
    googleMapsScript.async = true
    googleMapsScript.defer = true
    window.document.body.appendChild(googleMapsScript)

    googleMapsScript.onload = async function () {
      if (mapRef.current) {
        const { Map } = await google.maps.importLibrary("maps")
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker")

        const map = new Map(mapRef.current, {
          center: { lat: 51.5495, lng: 0.0597 },
          zoom: 12,
          mapId: "HACKNEY_MAP",
        })

        markers.forEach((markerData) => {
          const pin = new PinElement({
            background: markerData.pinColor || "#4285F4",
            scale: markerData.scale || 1.2,
            borderColor: "#FFFFFF",
            glyphColor: "#FFFFFF",
          })

          const marker = new AdvancedMarkerElement({
            map,
            position: markerData.position,
            title: markerData.title,
            content: pin.element,
          })

          var infoWindow = new google.maps.InfoWindow({
            content: markerData.content,
          })

          marker.addListener("click", () => {
            if (infoWindow) {
              infoWindow.close()
            }
            infoWindow.open(map, marker)
          })
        })
      }
    }

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
      if (script) {
        script.remove()
      }
    }
  }, [])

  return <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
}

export { initMap }
