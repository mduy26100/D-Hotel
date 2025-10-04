// Mock data for Quantity Guests
const quantityGuests = [
  {
    id: 1,
    roomTypeName: "Deluxe Suite",
    minGuests: 1,
    maxGuests: 4,
    standardGuests: 2,
    extraGuestCharge: 25,
    childrenAllowed: true,
    maxChildren: 2,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    roomTypeName: "Standard Room",
    minGuests: 1,
    maxGuests: 2,
    standardGuests: 2,
    extraGuestCharge: 15,
    childrenAllowed: true,
    maxChildren: 1,
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    roomTypeName: "Family Room",
    minGuests: 2,
    maxGuests: 6,
    standardGuests: 4,
    extraGuestCharge: 20,
    childrenAllowed: true,
    maxChildren: 4,
    status: "Active",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    roomTypeName: "Presidential Suite",
    minGuests: 1,
    maxGuests: 8,
    standardGuests: 4,
    extraGuestCharge: 50,
    childrenAllowed: true,
    maxChildren: 3,
    status: "Active",
    createdAt: "2024-01-18",
  },
]

let nextId = 5

export const getQuantityGuests = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = quantityGuests
      if (searchTerm) {
        filtered = quantityGuests.filter((qg) => qg.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      resolve(filtered)
    }, 300)
  })
}

export const getQuantityGuestById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const qg = quantityGuests.find((q) => q.id === Number.parseInt(id))
      if (qg) {
        resolve(qg)
      } else {
        reject(new Error("Quantity guest not found"))
      }
    }, 200)
  })
}

export const createQuantityGuest = async (qgData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newQG = {
        id: nextId++,
        ...qgData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      quantityGuests.push(newQG)
      resolve(newQG)
    }, 300)
  })
}

export const updateQuantityGuest = async (id, qgData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = quantityGuests.findIndex((q) => q.id === Number.parseInt(id))
      if (index !== -1) {
        quantityGuests[index] = { ...quantityGuests[index], ...qgData }
        resolve(quantityGuests[index])
      } else {
        reject(new Error("Quantity guest not found"))
      }
    }, 300)
  })
}

export const deleteQuantityGuest = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = quantityGuests.findIndex((q) => q.id === Number.parseInt(id))
      if (index !== -1) {
        quantityGuests.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Quantity guest not found"))
      }
    }, 300)
  })
}
