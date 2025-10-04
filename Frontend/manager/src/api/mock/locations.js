// Mock data for Locations
const locations = [
  {
    id: 1,
    name: "New York City",
    country: "United States",
    region: "North America",
    code: "NYC",
    description: "The city that never sleeps",
    hotelCount: 45,
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Miami",
    country: "United States",
    region: "North America",
    code: "MIA",
    description: "Beautiful beaches and vibrant culture",
    hotelCount: 32,
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Paris",
    country: "France",
    region: "Europe",
    code: "PAR",
    description: "The city of lights",
    hotelCount: 58,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    code: "TYO",
    description: "Modern metropolis with traditional charm",
    hotelCount: 67,
    status: "Active",
    createdAt: "2024-01-20",
  },
]

let nextId = 5

export const getLocations = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = locations
      if (searchTerm) {
        filtered = locations.filter(
          (location) =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.code.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getLocationById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const location = locations.find((l) => l.id === Number.parseInt(id))
      if (location) {
        resolve(location)
      } else {
        reject(new Error("Location not found"))
      }
    }, 200)
  })
}

export const createLocation = async (locationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLocation = {
        id: nextId++,
        ...locationData,
        hotelCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      locations.push(newLocation)
      resolve(newLocation)
    }, 300)
  })
}

export const updateLocation = async (id, locationData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = locations.findIndex((l) => l.id === Number.parseInt(id))
      if (index !== -1) {
        locations[index] = { ...locations[index], ...locationData }
        resolve(locations[index])
      } else {
        reject(new Error("Location not found"))
      }
    }, 300)
  })
}

export const deleteLocation = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = locations.findIndex((l) => l.id === Number.parseInt(id))
      if (index !== -1) {
        locations.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Location not found"))
      }
    }, 300)
  })
}
