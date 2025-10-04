// Mock data for Utilities
const utilities = [
  {
    id: 1,
    name: "WiFi",
    description: "High-speed wireless internet",
    category: "Connectivity",
    icon: "wifi",
    isPremium: false,
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Swimming Pool",
    description: "Outdoor heated swimming pool",
    category: "Recreation",
    icon: "waves",
    isPremium: true,
    status: "Active",
    createdAt: "2024-01-11",
  },
  {
    id: 3,
    name: "Gym",
    description: "24/7 fitness center",
    category: "Recreation",
    icon: "dumbbell",
    isPremium: false,
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    name: "Parking",
    description: "Free parking for guests",
    category: "Transportation",
    icon: "car",
    isPremium: false,
    status: "Active",
    createdAt: "2024-01-13",
  },
  {
    id: 5,
    name: "Restaurant",
    description: "On-site dining restaurant",
    category: "Dining",
    icon: "utensils",
    isPremium: false,
    status: "Active",
    createdAt: "2024-01-14",
  },
  {
    id: 6,
    name: "Spa",
    description: "Full-service spa and wellness center",
    category: "Recreation",
    icon: "sparkles",
    isPremium: true,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 7,
    name: "Room Service",
    description: "24-hour room service",
    category: "Service",
    icon: "concierge-bell",
    isPremium: false,
    status: "Active",
    createdAt: "2024-01-16",
  },
]

let nextId = 8

export const getUtilities = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = utilities
      if (searchTerm) {
        filtered = utilities.filter(
          (utility) =>
            utility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            utility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            utility.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getUtilityById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const utility = utilities.find((u) => u.id === Number.parseInt(id))
      if (utility) {
        resolve(utility)
      } else {
        reject(new Error("Utility not found"))
      }
    }, 200)
  })
}

export const createUtility = async (utilityData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUtility = {
        id: nextId++,
        ...utilityData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      utilities.push(newUtility)
      resolve(newUtility)
    }, 300)
  })
}

export const updateUtility = async (id, utilityData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = utilities.findIndex((u) => u.id === Number.parseInt(id))
      if (index !== -1) {
        utilities[index] = { ...utilities[index], ...utilityData }
        resolve(utilities[index])
      } else {
        reject(new Error("Utility not found"))
      }
    }, 300)
  })
}

export const deleteUtility = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = utilities.findIndex((u) => u.id === Number.parseInt(id))
      if (index !== -1) {
        utilities.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Utility not found"))
      }
    }, 300)
  })
}
