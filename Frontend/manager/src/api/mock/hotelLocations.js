// Mock data for Hotel Locations
const hotelLocations = [
  {
    id: 1,
    hotelId: 1,
    hotelName: "Grand Plaza Hotel",
    locationId: 1,
    locationName: "New York City",
    address: "123 Main Street",
    latitude: 40.7128,
    longitude: -74.006,
    distanceFromCenter: "2.5 km",
    nearbyAttractions: "Times Square, Central Park",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    hotelId: 2,
    hotelName: "Seaside Resort",
    locationId: 2,
    locationName: "Miami",
    address: "456 Beach Road",
    latitude: 25.7617,
    longitude: -80.1918,
    distanceFromCenter: "5.0 km",
    nearbyAttractions: "South Beach, Ocean Drive",
    status: "Active",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    hotelId: 3,
    hotelName: "City Center Inn",
    locationId: 1,
    locationName: "New York City",
    address: "789 Downtown Ave",
    latitude: 40.7589,
    longitude: -73.9851,
    distanceFromCenter: "1.2 km",
    nearbyAttractions: "Broadway, Empire State Building",
    status: "Active",
    createdAt: "2024-03-10",
  },
]

let nextId = 4

export const getHotelLocations = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotelLocations
      if (searchTerm) {
        filtered = hotelLocations.filter(
          (hl) =>
            hl.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hl.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hl.address.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelLocationById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hotelLocation = hotelLocations.find((hl) => hl.id === Number.parseInt(id))
      if (hotelLocation) {
        resolve(hotelLocation)
      } else {
        reject(new Error("Hotel location not found"))
      }
    }, 200)
  })
}

export const createHotelLocation = async (hotelLocationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newHotelLocation = {
        id: nextId++,
        ...hotelLocationData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      hotelLocations.push(newHotelLocation)
      resolve(newHotelLocation)
    }, 300)
  })
}

export const updateHotelLocation = async (id, hotelLocationData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelLocations.findIndex((hl) => hl.id === Number.parseInt(id))
      if (index !== -1) {
        hotelLocations[index] = { ...hotelLocations[index], ...hotelLocationData }
        resolve(hotelLocations[index])
      } else {
        reject(new Error("Hotel location not found"))
      }
    }, 300)
  })
}

export const deleteHotelLocation = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelLocations.findIndex((hl) => hl.id === Number.parseInt(id))
      if (index !== -1) {
        hotelLocations.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Hotel location not found"))
      }
    }, 300)
  })
}
