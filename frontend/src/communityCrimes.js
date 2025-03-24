const categories = [
  {
    url: "anti-social-behaviour",
    name: "Anti-social behaviour",
  },
  {
    url: "bicycle-theft",
    name: "Bicycle theft",
  },
  {
    url: "burglary",
    name: "Burglary",
  },
  {
    url: "criminal-damage-arson",
    name: "Criminal damage and arson",
  },
  {
    url: "drugs",
    name: "Drugs",
  },
  {
    url: "other-theft",
    name: "Other theft",
  },
  {
    url: "possession-of-weapons",
    name: "Possession of weapons",
  },
  {
    url: "public-order",
    name: "Public order",
  },
  {
    url: "robbery",
    name: "Robbery",
  },
  {
    url: "shoplifting",
    name: "Shoplifting",
  },
  {
    url: "theft-from-the-person",
    name: "Theft from the person",
  },
  {
    url: "vehicle-crime",
    name: "Vehicle crime",
  },
  {
    url: "violent-crime",
    name: "Violence and sexual offences",
  },
  {
    url: "other-crime",
    name: "Other crime",
  },
]

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomOffset() {
  return 0.2 * (Math.random() * 2 - 1)
}

export function getRandomCrimes(latitude, longitude, zoom) {
  const crimeCount = Math.floor(100 * (Math.random() + 2) * zoom)

  const crimes = Array.from(new Array(crimeCount)).map(() => ({
    category: getRandomElement(categories),
    latitude: latitude + getRandomOffset(),
    longitude: longitude + getRandomOffset(),
  }))

  return crimes
}
