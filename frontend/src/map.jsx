import { useEffect, useRef, useState } from "react"
import { getRandomCrimes } from "./communityCrimes"
import { markers } from "./markers"

const initialCentreLatitude = 51.5072
const initialCentreLongitude = -0.1276
const initialZoom = 15

export function Map() {
  const mapRef = useRef(null)
  const currentInfoWindow = useRef(null) // Add this to track the open InfoWindow

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
        communityReportedCrimes.map((crime) => {
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: crime.latitude, lng: crime.longitude },
            content: new PinElement({
              scale: 0.875,
              background: "#ff8000",
            }).element,
          })

          const contentString = `
          <div style="display: flex; align-items: center; justify-content: space-between; min-width: 150px; padding-right: 8px;">
            <span style="font-family: Arial, sans-serif; font-size: 14px;">${crime.category.name}</span>
          </div>
        `

          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            pixelOffset: new google.maps.Size(0, -5),
            disableAutoPan: false,
          })

          marker.addListener("click", () => {
            if (currentInfoWindow.current) {
              currentInfoWindow.current.close()
            }

            infowindow.open({
              anchor: marker,
              map,
            })

            currentInfoWindow.current = infowindow
          })

          return marker
        })

        map.addListener("click", () => {
          if (currentInfoWindow.current) {
            currentInfoWindow.current.close()
            currentInfoWindow.current = null
          }
        })
      }
    })()
  }, [map, communityReportedCrimes])

  return <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
}
