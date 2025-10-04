// Mock API for Departments Management
let departments = [
  {
    id: 1,
    name: "Quản lý",
    code: "DEPT-MGT",
    description: "Bộ phận quản lý và điều hành khách sạn",
    managerName: "Nguyễn Văn An",
    employeeCount: 5,
    budget: 150000000,
    status: "active",
  },
  {
    id: 2,
    name: "Lễ tân",
    code: "DEPT-FD",
    description: "Bộ phận tiếp đón và phục vụ khách hàng",
    managerName: "Trần Thị Bình",
    employeeCount: 12,
    budget: 80000000,
    status: "active",
  },
  {
    id: 3,
    name: "Buồng phòng",
    code: "DEPT-HSK",
    description: "Bộ phận vệ sinh và chăm sóc phòng",
    managerName: "Lê Thị Cẩm",
    employeeCount: 20,
    budget: 60000000,
    status: "active",
  },
  {
    id: 4,
    name: "Nhà hàng",
    code: "DEPT-FB",
    description: "Bộ phận ẩm thực và đồ uống",
    managerName: "Phạm Văn Dũng",
    employeeCount: 15,
    budget: 100000000,
    status: "active",
  },
  {
    id: 5,
    name: "An ninh",
    code: "DEPT-SEC",
    description: "Bộ phận bảo vệ và an ninh",
    managerName: "Hoàng Văn Em",
    employeeCount: 8,
    budget: 50000000,
    status: "active",
  },
  {
    id: 6,
    name: "Kỹ thuật",
    code: "DEPT-ENG",
    description: "Bộ phận bảo trì và sửa chữa",
    managerName: "Võ Văn Phúc",
    employeeCount: 10,
    budget: 70000000,
    status: "active",
  },
]

let nextId = 7

export const departmentsAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = departments.filter(
        (dept) =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.managerName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: departments }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const department = departments.find((d) => d.id === Number.parseInt(id))
    return { data: department }
  },

  create: async (departmentData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newDepartment = {
      id: nextId++,
      code: `DEPT-${departmentData.name.substring(0, 3).toUpperCase()}`,
      employeeCount: 0,
      ...departmentData,
    }
    departments.push(newDepartment)
    return { data: newDepartment }
  },

  update: async (id, departmentData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = departments.findIndex((d) => d.id === Number.parseInt(id))
    if (index !== -1) {
      departments[index] = { ...departments[index], ...departmentData }
      return { data: departments[index] }
    }
    throw new Error("Department not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    departments = departments.filter((d) => d.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
