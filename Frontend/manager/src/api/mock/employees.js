// Mock API for Employees Management
let employees = [
  {
    id: 1,
    employeeCode: "EMP-001",
    fullName: "Nguyễn Văn An",
    email: "an.nguyen@hotel.com",
    phone: "0901234567",
    position: "Quản lý khách sạn",
    department: "Quản lý",
    hotelName: "Grand Hotel",
    dateOfBirth: "1985-05-15",
    hireDate: "2020-01-10",
    salary: 25000000,
    status: "active",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    emergencyContact: "0912345678",
    avatar: "/man-avatar.png",
  },
  {
    id: 2,
    employeeCode: "EMP-002",
    fullName: "Trần Thị Bình",
    email: "binh.tran@hotel.com",
    phone: "0902345678",
    position: "Lễ tân",
    department: "Lễ tân",
    hotelName: "Grand Hotel",
    dateOfBirth: "1992-08-20",
    hireDate: "2021-03-15",
    salary: 12000000,
    status: "active",
    address: "456 Lê Lợi, Q1, TP.HCM",
    emergencyContact: "0923456789",
    avatar: "/diverse-woman-avatar.png",
  },
  {
    id: 3,
    employeeCode: "EMP-003",
    fullName: "Lê Văn Cường",
    email: "cuong.le@hotel.com",
    phone: "0903456789",
    position: "Bảo vệ",
    department: "An ninh",
    hotelName: "Ocean View Resort",
    dateOfBirth: "1988-12-10",
    hireDate: "2019-06-20",
    salary: 10000000,
    status: "active",
    address: "789 Trần Hưng Đạo, Q5, TP.HCM",
    emergencyContact: "0934567890",
    avatar: "/man-avatar.png",
  },
  {
    id: 4,
    employeeCode: "EMP-004",
    fullName: "Phạm Thị Dung",
    email: "dung.pham@hotel.com",
    phone: "0904567890",
    position: "Phục vụ phòng",
    department: "Buồng phòng",
    hotelName: "City Center Hotel",
    dateOfBirth: "1995-03-25",
    hireDate: "2022-01-05",
    salary: 9000000,
    status: "on_leave",
    address: "321 Võ Văn Tần, Q3, TP.HCM",
    emergencyContact: "0945678901",
    avatar: "/diverse-woman-avatar.png",
  },
]

let nextId = 5

export const employeesAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = employees.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: employees }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const employee = employees.find((e) => e.id === Number.parseInt(id))
    return { data: employee }
  },

  create: async (employeeData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newEmployee = {
      id: nextId++,
      employeeCode: `EMP-${String(nextId).padStart(3, "0")}`,
      ...employeeData,
    }
    employees.push(newEmployee)
    return { data: newEmployee }
  },

  update: async (id, employeeData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = employees.findIndex((e) => e.id === Number.parseInt(id))
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employeeData }
      return { data: employees[index] }
    }
    throw new Error("Employee not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    employees = employees.filter((e) => e.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
