// Mock data for Utility Items
const utilityItems = [
  {
    id: 1,
    utilityName: "WiFi",
    itemName: "Router",
    quantity: 50,
    brand: "Cisco",
    model: "RV340",
    purchaseDate: "2023-06-15",
    warrantyExpiry: "2026-06-15",
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    utilityName: "Swimming Pool",
    itemName: "Pool Heater",
    quantity: 2,
    brand: "Hayward",
    model: "H400FDN",
    purchaseDate: "2023-03-20",
    warrantyExpiry: "2025-03-20",
    status: "Active",
    createdAt: "2024-01-11",
  },
  {
    id: 3,
    utilityName: "Gym",
    itemName: "Treadmill",
    quantity: 5,
    brand: "Life Fitness",
    model: "T5",
    purchaseDate: "2023-08-10",
    warrantyExpiry: "2025-08-10",
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 4,
    utilityName: "Gym",
    itemName: "Weight Set",
    quantity: 10,
    brand: "Rogue",
    model: "Olympic Set",
    purchaseDate: "2023-08-10",
    warrantyExpiry: "2028-08-10",
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    utilityName: "Restaurant",
    itemName: "Commercial Oven",
    quantity: 3,
    brand: "Vulcan",
    model: "VC4GD",
    purchaseDate: "2023-05-01",
    warrantyExpiry: "2025-05-01",
    status: "Active",
    createdAt: "2024-01-14",
  },
  {
    id: 6,
    utilityName: "Spa",
    itemName: "Massage Table",
    quantity: 8,
    brand: "Earthlite",
    model: "Spirit",
    purchaseDate: "2023-07-15",
    warrantyExpiry: "2026-07-15",
    status: "Active",
    createdAt: "2024-01-15",
  },
]

let nextId = 7

export const getUtilityItems = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = utilityItems
      if (searchTerm) {
        filtered = utilityItems.filter(
          (item) =>
            item.utilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getUtilityItemById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = utilityItems.find((ui) => ui.id === Number.parseInt(id))
      if (item) {
        resolve(item)
      } else {
        reject(new Error("Utility item not found"))
      }
    }, 200)
  })
}

export const createUtilityItem = async (itemData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = {
        id: nextId++,
        ...itemData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      utilityItems.push(newItem)
      resolve(newItem)
    }, 300)
  })
}

export const updateUtilityItem = async (id, itemData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = utilityItems.findIndex((ui) => ui.id === Number.parseInt(id))
      if (index !== -1) {
        utilityItems[index] = { ...utilityItems[index], ...itemData }
        resolve(utilityItems[index])
      } else {
        reject(new Error("Utility item not found"))
      }
    }, 300)
  })
}

export const deleteUtilityItem = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = utilityItems.findIndex((ui) => ui.id === Number.parseInt(id))
      if (index !== -1) {
        utilityItems.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Utility item not found"))
      }
    }, 300)
  })
}
