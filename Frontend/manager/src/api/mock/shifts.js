// Mock API for Shifts Management
let shifts = [
  {
    id: 1,
    shiftName: "Ca sáng",
    shiftCode: "SHIFT-M",
    startTime: "06:00",
    endTime: "14:00",
    department: "Lễ tân",
    employeeName: "Trần Thị Bình",
    date: "2024-02-15",
    hotelName: "Grand Hotel",
    status: "completed",
    notes: "Ca làm việc bình thường",
  },
  {
    id: 2,
    shiftName: "Ca chiều",
    shiftCode: "SHIFT-A",
    startTime: "14:00",
    endTime: "22:00",
    department: "Lễ tân",
    employeeName: "Nguyễn Văn Giang",
    date: "2024-02-15",
    hotelName: "Grand Hotel",
    status: "completed",
    notes: "",
  },
  {
    id: 3,
    shiftName: "Ca đêm",
    shiftCode: "SHIFT-N",
    startTime: "22:00",
    endTime: "06:00",
    department: "An ninh",
    employeeName: "Lê Văn Cường",
    date: "2024-02-15",
    hotelName: "Ocean View Resort",
    status: "completed",
    notes: "Ca đêm yên tĩnh",
  },
  {
    id: 4,
    shiftName: "Ca sáng",
    shiftCode: "SHIFT-M",
    startTime: "06:00",
    endTime: "14:00",
    department: "Buồng phòng",
    employeeName: "Phạm Thị Dung",
    date: "2024-02-16",
    hotelName: "City Center Hotel",
    status: "in_progress",
    notes: "",
  },
  {
    id: 5,
    shiftName: "Ca chiều",
    shiftCode: "SHIFT-A",
    startTime: "14:00",
    endTime: "22:00",
    department: "Nhà hàng",
    employeeName: "Hoàng Văn Hùng",
    date: "2024-02-16",
    hotelName: "Grand Hotel",
    status: "scheduled",
    notes: "Dự kiến đông khách",
  },
]

let nextId = 6

export const shiftsAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = shifts.filter(
        (shift) =>
          shift.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shift.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shift.department.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: shifts }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const shift = shifts.find((s) => s.id === Number.parseInt(id))
    return { data: shift }
  },

  create: async (shiftData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newShift = {
      id: nextId++,
      ...shiftData,
    }
    shifts.push(newShift)
    return { data: newShift }
  },

  update: async (id, shiftData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = shifts.findIndex((s) => s.id === Number.parseInt(id))
    if (index !== -1) {
      shifts[index] = { ...shifts[index], ...shiftData }
      return { data: shifts[index] }
    }
    throw new Error("Shift not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    shifts = shifts.filter((s) => s.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
