// Mock data for Hotel Travel Purposes
const hotelTravelPurposes = [
  {
    id: 1,
    hotelName: "Grand Plaza Hotel",
    purposeName: "Business",
    priority: 1,
    amenities: "Conference rooms, Business center, High-speed WiFi",
    targetAudience: "Corporate travelers and executives",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    hotelName: "Seaside Resort",
    purposeName: "Leisure",
    priority: 1,
    amenities: "Beach access, Pool, Spa, Water sports",
    targetAudience: "Vacationers and tourists",
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    hotelName: "City Center Inn",
    purposeName: "Family",
    priority: 2,
    amenities: "Kids club, Family rooms, Playground",
    targetAudience: "Families with children",
    status: "Active",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    hotelName: "Grand Plaza Hotel",
    purposeName: "Leisure",
    priority: 2,
    amenities: "Rooftop bar, City tours, Shopping nearby",
    targetAudience: "Leisure travelers",
    status: "Active",
    createdAt: "2024-01-18",
  },
]

let nextId = 5

export const getHotelTravelPurposes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotelTravelPurposes
      if (searchTerm) {
        filtered = hotelTravelPurposes.filter(
          (htp) =>
            htp.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            htp.purposeName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelTravelPurposeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const htp = hotelTravelPurposes.find((h) => h.id === Number.parseInt(id))
      if (htp) {
        resolve(htp)
      } else {
        reject(new Error("Hotel travel purpose not found"))
      }
    }, 200)
  })
}

export const createHotelTravelPurpose = async (htpData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newHTP = {
        id: nextId++,
        ...htpData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      hotelTravelPurposes.push(newHTP)
      resolve(newHTP)
    }, 300)
  })
}

export const updateHotelTravelPurpose = async (id, htpData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelTravelPurposes.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotelTravelPurposes[index] = { ...hotelTravelPurposes[index], ...htpData }
        resolve(hotelTravelPurposes[index])
      } else {
        reject(new Error("Hotel travel purpose not found"))
      }
    }, 300)
  })
}

export const deleteHotelTravelPurpose = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelTravelPurposes.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotelTravelPurposes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Hotel travel purpose not found"))
      }
    }, 300)
  })
}
