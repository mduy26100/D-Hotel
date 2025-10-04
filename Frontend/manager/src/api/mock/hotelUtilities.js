// Mock data for Hotel Utilities
const hotelUtilities = [
  {
    id: 1,
    hotelName: "Grand Plaza Hotel",
    utilityName: "WiFi",
    isAvailable: true,
    location: "All Areas",
    operatingHours: "24/7",
    additionalCost: 0,
    notes: "Free high-speed WiFi throughout the property",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    hotelName: "Grand Plaza Hotel",
    utilityName: "Swimming Pool",
    isAvailable: true,
    location: "Rooftop",
    operatingHours: "6:00 AM - 10:00 PM",
    additionalCost: 0,
    notes: "Heated pool with city views",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    hotelName: "Grand Plaza Hotel",
    utilityName: "Gym",
    isAvailable: true,
    location: "2nd Floor",
    operatingHours: "24/7",
    additionalCost: 0,
    notes: "Fully equipped fitness center",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    hotelName: "Grand Plaza Hotel",
    utilityName: "Parking",
    isAvailable: true,
    location: "Underground",
    operatingHours: "24/7",
    additionalCost: 15,
    notes: "Valet parking available for $15/day",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    hotelName: "Seaside Resort",
    utilityName: "Restaurant",
    isAvailable: true,
    location: "Ground Floor",
    operatingHours: "7:00 AM - 11:00 PM",
    additionalCost: 0,
    notes: "International cuisine restaurant",
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 6,
    hotelName: "Seaside Resort",
    utilityName: "Spa",
    isAvailable: true,
    location: "3rd Floor",
    operatingHours: "9:00 AM - 9:00 PM",
    additionalCost: 50,
    notes: "Full spa services, booking required",
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 7,
    hotelName: "Mountain View Lodge",
    utilityName: "Room Service",
    isAvailable: true,
    location: "All Rooms",
    operatingHours: "24/7",
    additionalCost: 5,
    notes: "$5 delivery fee per order",
    status: "Active",
    createdAt: "2024-01-17",
  },
]

let nextId = 8

export const getHotelUtilities = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotelUtilities
      if (searchTerm) {
        filtered = hotelUtilities.filter(
          (hu) =>
            hu.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hu.utilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hu.location.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelUtilityById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hu = hotelUtilities.find((h) => h.id === Number.parseInt(id))
      if (hu) {
        resolve(hu)
      } else {
        reject(new Error("Hotel utility not found"))
      }
    }, 200)
  })
}

export const createHotelUtility = async (huData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newHU = {
        id: nextId++,
        ...huData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      hotelUtilities.push(newHU)
      resolve(newHU)
    }, 300)
  })
}

export const updateHotelUtility = async (id, huData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelUtilities.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotelUtilities[index] = { ...hotelUtilities[index], ...huData }
        resolve(hotelUtilities[index])
      } else {
        reject(new Error("Hotel utility not found"))
      }
    }, 300)
  })
}

export const deleteHotelUtility = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelUtilities.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotelUtilities.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Hotel utility not found"))
      }
    }, 300)
  })
}
