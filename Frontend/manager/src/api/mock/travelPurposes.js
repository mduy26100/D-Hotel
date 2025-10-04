// Mock data for Travel Purposes
const travelPurposes = [
  {
    id: 1,
    name: "Business",
    description: "Corporate travel and business meetings",
    icon: "briefcase",
    hotelCount: 45,
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Leisure",
    description: "Vacation and recreational travel",
    icon: "sun",
    hotelCount: 78,
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Family",
    description: "Family trips and gatherings",
    icon: "users",
    hotelCount: 52,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Romantic",
    description: "Couples and honeymoon travel",
    icon: "heart",
    hotelCount: 34,
    status: "Active",
    createdAt: "2024-01-18",
  },
  {
    id: 5,
    name: "Adventure",
    description: "Outdoor and adventure activities",
    icon: "mountain",
    hotelCount: 28,
    status: "Active",
    createdAt: "2024-01-20",
  },
]

let nextId = 6

export const getTravelPurposes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = travelPurposes
      if (searchTerm) {
        filtered = travelPurposes.filter(
          (purpose) =>
            purpose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purpose.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getTravelPurposeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const purpose = travelPurposes.find((p) => p.id === Number.parseInt(id))
      if (purpose) {
        resolve(purpose)
      } else {
        reject(new Error("Travel purpose not found"))
      }
    }, 200)
  })
}

export const createTravelPurpose = async (purposeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPurpose = {
        id: nextId++,
        ...purposeData,
        hotelCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      travelPurposes.push(newPurpose)
      resolve(newPurpose)
    }, 300)
  })
}

export const updateTravelPurpose = async (id, purposeData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = travelPurposes.findIndex((p) => p.id === Number.parseInt(id))
      if (index !== -1) {
        travelPurposes[index] = { ...travelPurposes[index], ...purposeData }
        resolve(travelPurposes[index])
      } else {
        reject(new Error("Travel purpose not found"))
      }
    }, 300)
  })
}

export const deleteTravelPurpose = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = travelPurposes.findIndex((p) => p.id === Number.parseInt(id))
      if (index !== -1) {
        travelPurposes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Travel purpose not found"))
      }
    }, 300)
  })
}
