// Mock data for Room Type Images
const roomTypeImages = [
  {
    id: 1,
    roomTypeName: "Deluxe Suite",
    imageUrl: "/luxury-hotel-suite.png",
    caption: "Spacious deluxe suite with city view",
    isPrimary: true,
    displayOrder: 1,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    roomTypeName: "Deluxe Suite",
    imageUrl: "/hotel-suite-bathroom.jpg",
    caption: "Modern bathroom with premium fixtures",
    isPrimary: false,
    displayOrder: 2,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    roomTypeName: "Standard Room",
    imageUrl: "/standard-hotel-room.png",
    caption: "Comfortable standard room",
    isPrimary: true,
    displayOrder: 1,
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 4,
    roomTypeName: "Family Room",
    imageUrl: "/family-hotel-room.png",
    caption: "Spacious family room with multiple beds",
    isPrimary: true,
    displayOrder: 1,
    status: "Active",
    createdAt: "2024-01-17",
  },
]

let nextId = 5

export const getRoomTypeImages = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = roomTypeImages
      if (searchTerm) {
        filtered = roomTypeImages.filter((rti) => rti.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      resolve(filtered)
    }, 300)
  })
}

export const getRoomTypeImageById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rti = roomTypeImages.find((r) => r.id === Number.parseInt(id))
      if (rti) {
        resolve(rti)
      } else {
        reject(new Error("Room type image not found"))
      }
    }, 200)
  })
}

export const createRoomTypeImage = async (rtiData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRTI = {
        id: nextId++,
        ...rtiData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      roomTypeImages.push(newRTI)
      resolve(newRTI)
    }, 300)
  })
}

export const updateRoomTypeImage = async (id, rtiData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypeImages.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypeImages[index] = { ...roomTypeImages[index], ...rtiData }
        resolve(roomTypeImages[index])
      } else {
        reject(new Error("Room type image not found"))
      }
    }, 300)
  })
}

export const deleteRoomTypeImage = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypeImages.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypeImages.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Room type image not found"))
      }
    }, 300)
  })
}
