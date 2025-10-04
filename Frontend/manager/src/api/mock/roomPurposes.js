// Mock data for Room Purposes
const roomPurposes = [
  {
    id: 1,
    roomNumber: "101",
    purposeName: "Business",
    isAvailable: true,
    notes: "Equipped with desk and high-speed internet",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    roomNumber: "205",
    purposeName: "Family",
    isAvailable: true,
    notes: "Extra beds available for children",
    status: "Active",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    roomNumber: "301",
    purposeName: "Romantic",
    isAvailable: false,
    notes: "Currently booked for honeymoon",
    status: "Active",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    roomNumber: "102",
    purposeName: "Leisure",
    isAvailable: true,
    notes: "Standard amenities",
    status: "Active",
    createdAt: "2024-01-18",
  },
]

let nextId = 5

export const getRoomPurposes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = roomPurposes
      if (searchTerm) {
        filtered = roomPurposes.filter(
          (rp) =>
            rp.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rp.purposeName.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getRoomPurposeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rp = roomPurposes.find((r) => r.id === Number.parseInt(id))
      if (rp) {
        resolve(rp)
      } else {
        reject(new Error("Room purpose not found"))
      }
    }, 200)
  })
}

export const createRoomPurpose = async (rpData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRP = {
        id: nextId++,
        ...rpData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      roomPurposes.push(newRP)
      resolve(newRP)
    }, 300)
  })
}

export const updateRoomPurpose = async (id, rpData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomPurposes.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomPurposes[index] = { ...roomPurposes[index], ...rpData }
        resolve(roomPurposes[index])
      } else {
        reject(new Error("Room purpose not found"))
      }
    }, 300)
  })
}

export const deleteRoomPurpose = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = roomPurposes.findIndex((r) => r.id === Number.parseInt(id))
      if (index !== -1) {
        roomPurposes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Room purpose not found"))
      }
    }, 300)
  })
}
