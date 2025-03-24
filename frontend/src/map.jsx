import { useEffect, useRef, useState } from "react"
import { getRandomCrimes } from "./communityCrimes"
import { markers } from "./markers"

const initialCentreLatitude = 51.5072
const initialCentreLongitude = -0.1276
const initialZoom = 15

export function Map() {
  const mapRef = useRef(null)

  const [map, setMap] = useState(null)
  const [communityReportedCrimes, setCommunityReportedCrimes] = useState([])

  useEffect(() => {
    setCommunityReportedCrimes(
      getRandomCrimes(initialCentreLatitude, initialCentreLongitude, initialZoom),
    )

    const googleMapsScript = document.createElement("script")
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&v=weekly`
    googleMapsScript.async = true
    googleMapsScript.defer = true
    window.document.body.appendChild(googleMapsScript)

    googleMapsScript.onload = async function () {
      if (mapRef.current) {
        /*global google*/
        const { Map } = await google.maps.importLibrary("maps")
        const map = new Map(mapRef.current, {
          center: { lat: initialCentreLatitude, lng: initialCentreLongitude },
          zoom: initialZoom,
          minZoom: 11,
          maxZoom: 17,
          mapId: "OUR_FUN_MAP",
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
        setMap(map)
      }
    }

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
      if (script) {
        script.remove()
      }
    }
  }, [])

  useEffect(() => {
    ;(async function () {
      if (mapRef.current && map) {
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker")
        communityReportedCrimes.map(
          (crime) =>
            new AdvancedMarkerElement({
              map,
              position: { lat: crime.latitude, lng: crime.longitude },
              content: new PinElement({
                scale: 0.875,
                background: "#ff8000",
              }).element,
            }),
        )
      }
    })()
  }, [map, communityReportedCrimes])

  return <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
}
