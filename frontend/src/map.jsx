import { useCallback, useEffect, useRef, useState } from "react"
import { getRandomCrimes } from "./communityCrimes"
import { getPoliceAPI, getUserLocationFromThePostcode } from "./lib/fetcher"

const initialCentreLatitude = 51.5072
const initialCentreLongitude = -0.1276
const initialZoom = 15

function formatCategory(category) {
  if (!category) return ""

  // Split by hyphens, capitalize first letter of each word, then join with spaces
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function Map() {
  const mapRef = useRef(null)
  const currentInfoWindow = useRef(null) // Add this to track the open InfoWindow

  const [map, setMap] = useState(null)
  const [communityReportedCrimes, setCommunityReportedCrimes] = useState([])
  const [policeData, setPoliceData] = useState([])

  const getPoliceCrimeData = useCallback(async () => {
    const { lng, lat } = await getUserLocationFromThePostcode("SW1A 1AA") //change to dynamically get user postcode
    const policeData = await getPoliceAPI(lat, lng)
    setPoliceData(policeData)
  }, [])

  useEffect(() => {
    getPoliceCrimeData()
  })

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

        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker")

        //////

        // const map = new Map(mapRef.current, {
        //   center: { lat: lat, lng: lng },
        //   zoom: 12,
        //   mapId: "HACKNEY_MAP",
        // })

        // Now you can use PinElement
        // const pin = new PinElement({
        //   scale: 1.2,
        // })

        // Create the marker with the pin
        // new AdvancedMarkerElement({
        //   map,
        //   position: { lat: lat, lng: lng },
        //   content: pin.element,
        // })

        // for (let i = 0; i < policeData.length; i++) {
        //   console.log(policeData[i])
        //   const policeLatitude = policeData[i].location.latitude
        //   const policeLongitude = policeData[i].location.longitude

        //   console.log("longit", policeLongitude)
        //   console.log("latitude", policeLatitude)

        //   const pin = new PinElement({
        //     scale: 1.2,
        //   })

        //   // Create the marker with the pin
        //   new AdvancedMarkerElement({
        //     map,
        //     position: { lat: latitude, lng: longitude },
        //     content: pin.element,
        //   })
        //   ///
        // }
      }
    }

    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)
      if (script) {
        script.remove()
      }
    }
  }, [])
  // police api pins
  useEffect(() => {
    ;(async function () {
      if (mapRef.current && map) {
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker")
        policeData.map((police) => {
          const marker = new AdvancedMarkerElement({
            map,
            position: {
              lat: Number(police.location.latitude),
              lng: Number(police.location.longitude),
            },
            content: new PinElement({
              scale: 0.875,
              background: "#0000FF",
            }).element,
          })

          const contentString = `
          <div style="display: flex; align-items: center; justify-content: space-between; min-width: 150px; padding-right: 8px;">
            <span style="font-family: Arial, sans-serif; font-size: 14px;">${formatCategory(police.category)}</span>
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
      }
    })()
  }, [map, policeData])

  // community pins
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
