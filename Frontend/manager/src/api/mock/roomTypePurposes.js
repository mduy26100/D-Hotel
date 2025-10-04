// Mock data for Room Type Purposes
const roomTypePurposes = [
  {
    id: 1,
    roomTypeName: "Deluxe Suite",
    purposeName: "Business",
    priority: 1,
    description: "Ideal for business travelers with workspace",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    roomTypeName: "Family Room",
    purposeName: "Family",
    priority: 1,
    description: "Perfect for families with children",
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    roomTypeName: "Honeymoon Suite",
    purposeName: "Romantic",
    priority: 1,
    description: "Romantic setting for couples",
    status: "Active",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    roomTypeName: "Standard Room",
    purposeName: "Leisure",
    priority: 2,
    description: "Comfortable for leisure travelers",
    status: "Active",
    createdAt: "2024-01-18",
  },
]

let nextId = 5

export const getRoomTypePurposes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = roomTypePurposes
      if (searchTerm) {
        filtered = roomTypePurposes.filter(
          (rtp) =>
            rtp.roomTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rtp.purposeName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getRoomTypePurposeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rtp = roomTypePurposes.find((r) => r.id === Number.parseInt(id))
      if (rtp) {
        resolve(rtp)
      } else {
        reject(new Error("Room type purpose not found"))
      }
    }, 200)
  })
}

export const createRoomTypePurpose = async (rtpData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRTP = {
        id: nextId++,
        ...rtpData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      roomTypePurposes.push(newRTP)
      resolve(newRTP)
    }, 300)
  })
}

export const updateRoomTypePurpose = async (id, rtpData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypePurposes.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypePurposes[index] = { ...roomTypePurposes[index], ...rtpData }
        resolve(roomTypePurposes[index])
      } else {
        reject(new Error("Room type purpose not found"))
      }
    }, 300)
  })
}

export const deleteRoomTypePurpose = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomTypePurposes.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomTypePurposes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Room type purpose not found"))
      }
    }, 300)
  })
}
