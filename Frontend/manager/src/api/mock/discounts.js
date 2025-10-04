// Mock API for Discounts Management
let discounts = [
  {
    id: 1,
    code: "SUMMER2024",
    name: "Khuyến mãi mùa hè 2024",
    description: "Giảm giá 20% cho tất cả các phòng trong mùa hè",
    discountType: "percentage",
    discountValue: 20,
    minAmount: 1000000,
    maxDiscount: 500000,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    usageLimit: 100,
    usedCount: 45,
    status: "active",
    applicableRoomTypes: ["Deluxe", "Suite"],
    applicableHotels: ["Grand Hotel", "Ocean View Resort"],
  },
  {
    id: 2,
    code: "NEWUSER50",
    name: "Ưu đãi khách hàng mới",
    description: "Giảm 50,000đ cho khách hàng đặt phòng lần đầu",
    discountType: "fixed",
    discountValue: 50000,
    minAmount: 500000,
    maxDiscount: 50000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 500,
    usedCount: 234,
    status: "active",
    applicableRoomTypes: ["Standard", "Deluxe"],
    applicableHotels: [],
  },
  {
    id: 3,
    code: "WEEKEND30",
    name: "Giảm giá cuối tuần",
    description: "Giảm 30% cho đặt phòng vào cuối tuần",
    discountType: "percentage",
    discountValue: 30,
    minAmount: 800000,
    maxDiscount: 1000000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    usageLimit: 200,
    usedCount: 156,
    status: "active",
    applicableRoomTypes: [],
    applicableHotels: ["City Center Hotel"],
  },
  {
    id: 4,
    code: "HOLIDAY2023",
    name: "Khuyến mãi lễ tết 2023",
    description: "Giảm giá đặc biệt dịp lễ tết",
    discountType: "percentage",
    discountValue: 25,
    minAmount: 2000000,
    maxDiscount: 800000,
    startDate: "2023-12-20",
    endDate: "2024-01-10",
    usageLimit: 50,
    usedCount: 50,
    status: "expired",
    applicableRoomTypes: [],
    applicableHotels: [],
  },
]

let nextId = 5

export const discountsAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = discounts.filter(
        (discount) =>
          discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          discount.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: discounts }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const discount = discounts.find((d) => d.id === Number.parseInt(id))
    return { data: discount }
  },

  create: async (discountData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newDiscount = {
      id: nextId++,
      usedCount: 0,
      ...discountData,
    }
    discounts.push(newDiscount)
    return { data: newDiscount }
  },

  update: async (id, discountData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = discounts.findIndex((d) => d.id === Number.parseInt(id))
    if (index !== -1) {
      discounts[index] = { ...discounts[index], ...discountData }
      return { data: discounts[index] }
    }
    throw new Error("Discount not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    discounts = discounts.filter((d) => d.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
