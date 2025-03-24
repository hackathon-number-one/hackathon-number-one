export const getIncompletePostcode = async (input) => {
  const API_URL = `https://api.postcodes.io/postcodes/${input}/autocomplete`
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Incomplete postcode response status: ${response.status}`)
    }

    const allPostcodes = await response.json()
    const firstPostcode = allPostcodes.result[0]

    const trimmedPostcode = firstPostcode.replace(/\s+/g, "")
    const userLocation = getFullPostcode(trimmedPostcode)
    return userLocation
  } catch {
    console.log("Error getting incomplete postcode response from Postcodes API")
  }
}

export const getFullPostcode = async (input) => {
  let userLocation = {}
  const API_URL = `https://api.postcodes.io/postcodes/${input}`
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`Full postcode response status: ${response.status}`)
    }

    const json = await response.json()

    userLocation = {
      lng: json.result.longitude,
      lat: json.result.latitude,
    }
    return userLocation
  } catch {
    console.log("Error getting complete postcode response from Postcodes API")
  }
}

export const getUserLocationFromThePostcode = (input) => {
  const trimmedInput = input.replace(/\s+/g, "")
  if (input.length > 6) {
    return getIncompletePostcode(trimmedInput)
  } else {
    return getFullPostcode(trimmedInput)
  }
}

export const getPoliceAPI = async (latitude, longitude) => {
  const policeAPIRequestURL = `https://data.police.uk/api/crimes-at-location?date=2025-01&lat=${latitude}&lng=${longitude}`

  //   fetch(policeAPIRequestURL)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const crimeData = json.map((crime) => ({
  //         category: crime.category,
  //         location: {
  //           latitude: crime.location.latitude,
  //           longitude: crime.location.longitude,
  //         },
  //         month: crime.month,
  //       }))
  //       return crimeData
  //     })

  try {
    const response = await fetch(policeAPIRequestURL)
    if (!response.ok) {
      throw new Error(`Police API response status: ${response.status}`)
    }

    const json = await response.json()

    const crimeData = json.map((crime) => ({
      category: crime.category,
      location: {
        latitude: crime.location.latitude,
        longitude: crime.location.longitude,
      },
      month: crime.month,
    }))

    return crimeData
  } catch {
    console.log("Error getting response from Police API")
  }
}
