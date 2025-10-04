// Mock data for Bed Types
const bedTypes = [
  {
    id: 1,
    name: "King Size",
    description: "Large bed suitable for 2 adults",
    dimensions: '76" x 80"',
    capacity: 2,
    icon: "bed-double",
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Queen Size",
    description: "Medium bed suitable for 2 adults",
    dimensions: '60" x 80"',
    capacity: 2,
    icon: "bed-double",
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Twin",
    description: "Single bed for 1 person",
    dimensions: '38" x 75"',
    capacity: 1,
    icon: "bed-single",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Full Size",
    description: "Double bed for 1-2 people",
    dimensions: '54" x 75"',
    capacity: 2,
    icon: "bed-double",
    status: "Active",
    createdAt: "2024-01-18",
  },
  {
    id: 5,
    name: "California King",
    description: "Extra long bed for tall guests",
    dimensions: '72" x 84"',
    capacity: 2,
    icon: "bed-double",
    status: "Active",
    createdAt: "2024-01-20",
  },
]

let nextId = 6

export const getBedTypes = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = bedTypes
      if (searchTerm) {
        filtered = bedTypes.filter(
          (bedType) =>
            bedType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bedType.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getBedTypeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bedType = bedTypes.find((bt) => bt.id === Number.parseInt(id))
      if (bedType) {
        resolve(bedType)
      } else {
        reject(new Error("Bed type not found"))
      }
    }, 200)
  })
}

export const createBedType = async (bedTypeData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBedType = {
        id: nextId++,
        ...bedTypeData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      bedTypes.push(newBedType)
      resolve(newBedType)
    }, 300)
  })
}

export const updateBedType = async (id, bedTypeData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = bedTypes.findIndex((bt) => bt.id === Number.parseInt(id))
      if (index !== -1) {
        bedTypes[index] = { ...bedTypes[index], ...bedTypeData }
        resolve(bedTypes[index])
      } else {
        reject(new Error("Bed type not found"))
      }
    }, 300)
  })
}

export const deleteBedType = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = bedTypes.findIndex((bt) => bt.id === Number.parseInt(id))
      if (index !== -1) {
        bedTypes.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Bed type not found"))
      }
    }, 300)
  })
}
