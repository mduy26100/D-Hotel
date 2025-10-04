// Mock data for Hotel Categories
const hotelCategories = [
  {
    id: 1,
    name: "Luxury",
    description: "High-end luxury hotels with premium amenities",
    hotelCount: 15,
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Resort",
    description: "Vacation resorts with recreational facilities",
    hotelCount: 22,
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 3,
    name: "Budget",
    description: "Affordable hotels for budget travelers",
    hotelCount: 45,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 4,
    name: "Boutique",
    description: "Small, stylish hotels with unique character",
    hotelCount: 18,
    status: "Active",
    createdAt: "2024-02-01",
  },
]

let nextId = 5

export const getHotelCategories = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotelCategories
      if (searchTerm) {
        filtered = hotelCategories.filter(
          (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelCategoryById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const category = hotelCategories.find((c) => c.id === Number.parseInt(id))
      if (category) {
        resolve(category)
      } else {
        reject(new Error("Category not found"))
      }
    }, 200)
  })
}

export const createHotelCategory = async (categoryData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCategory = {
        id: nextId++,
        ...categoryData,
        hotelCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      hotelCategories.push(newCategory)
      resolve(newCategory)
    }, 300)
  })
}

export const updateHotelCategory = async (id, categoryData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelCategories.findIndex((c) => c.id === Number.parseInt(id))
      if (index !== -1) {
        hotelCategories[index] = { ...hotelCategories[index], ...categoryData }
        resolve(hotelCategories[index])
      } else {
        reject(new Error("Category not found"))
      }
    }, 300)
  })
}

export const deleteHotelCategory = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelCategories.findIndex((c) => c.id === Number.parseInt(id))
      if (index !== -1) {
        hotelCategories.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Category not found"))
      }
    }, 300)
  })
}
