import { useEffect, useRef } from "react"

// Initialize and add the map
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
        // Import the required libraries
        const { Map } = await google.maps.importLibrary("maps")
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker")

        const map = new Map(mapRef.current, {
          center: { lat: 51.5495, lng: 0.0597 },
          zoom: 12,
          mapId: "HACKNEY_MAP",
        })

        // Now you can use PinElement
        const pin = new PinElement({
          scale: 1.2,
        })

        // Create the marker with the pin
        new AdvancedMarkerElement({
          map,
          position: { lat: 51.5495, lng: 0.0597 },
          content: pin.element,
        })
      }
    }

    return () => {
      window.initMap = null
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
      if (script) {
        script.remove()
      }
    }
  }, [])

  return <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
}

export { initMap }
