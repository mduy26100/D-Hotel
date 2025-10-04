// Mock data for Room Types
const roomTypes = [
  {
    id: 1,
    name: "Deluxe Suite",
    description: "Luxurious suite with separate living area",
    bedType: "King Size",
    size: "450 sq ft",
    maxOccupancy: 4,
    basePrice: 299,
    amenities: "Mini bar, Coffee maker, Safe, Balcony",
    viewType: "City View",
    floor: "10-15",
    totalRooms: 20,
    availableRooms: 5,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Standard Room",
    description: "Comfortable room with essential amenities",
    bedType: "Queen Size",
    size: "300 sq ft",
    maxOccupancy: 2,
    basePrice: 149,
    amenities: "Coffee maker, Safe",
    viewType: "Street View",
    floor: "3-8",
    totalRooms: 50,
    availableRooms: 15,
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Family Room",
    description: "Spacious room perfect for families",
    bedType: "2 Queen Size",
    size: "500 sq ft",
    maxOccupancy: 6,
    basePrice: 249,
    amenities: "Mini fridge, Coffee maker, Safe, Extra beds",
    viewType: "Garden View",
    floor: "2-6",
    totalRooms: 15,
    availableRooms: 3,
    status: "Active",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    name: "Presidential Suite",
    description: "Ultimate luxury with premium amenities",
    bedType: "California King",
    size: "1200 sq ft",
    maxOccupancy: 8,
    basePrice: 899,
    amenities: "Full kitchen, Dining area, Living room, 2 Bathrooms, Jacuzzi, Balcony",
    viewType: "Panoramic View",
    floor: "Top Floor",
    totalRooms: 2,
    availableRooms: 1,
    status: "Active",
    createdAt: "2024-01-18",
  },
]

let nextId = 5

export const getRoomTypes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = roomTypes
      if (searchTerm) {
        filtered = roomTypes.filter(
          (rt) =>
            rt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rt.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getRoomTypeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const roomType = roomTypes.find((rt) => rt.id === Number.parseInt(id))
      if (roomType) {
        resolve(roomType)
      } else {
        reject(new Error("Room type not found"))
      }
    }, 200)
  })
}

export const createRoomType = async (roomTypeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRoomType = {
        id: nextId++,
        ...roomTypeData,
        availableRooms: roomTypeData.totalRooms,
        createdAt: new Date().toISOString().split("T")[0],
      }
      roomTypes.push(newRoomType)
      resolve(newRoomType)
    }, 300)
  })
}

export const updateRoomType = async (id, roomTypeData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypes.findIndex((rt) => rt.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypes[index] = { ...roomTypes[index], ...roomTypeData }
        resolve(roomTypes[index])
      } else {
        reject(new Error("Room type not found"))
      }
    }, 300)
  })
}

export const deleteRoomType = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypes.findIndex((rt) => rt.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Room type not found"))
      }
    }, 300)
  })
}
