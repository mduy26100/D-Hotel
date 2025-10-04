// Mock data for Hotel Staffs
const hotelStaffs = [
  {
    id: 1,
    firstName: "John",
    lastName: "Manager",
    hotelId: 1,
    hotelName: "Grand Plaza Hotel",
    position: "General Manager",
    email: "john.manager@grandplaza.com",
    phone: "+1 234 567 8900",
    hireDate: "2023-01-15",
    status: "Active",
    avatar: "/man-avatar.png",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Williams",
    hotelId: 1,
    hotelName: "Grand Plaza Hotel",
    position: "Front Desk Manager",
    email: "sarah.williams@grandplaza.com",
    phone: "+1 234 567 8901",
    hireDate: "2023-03-20",
    status: "Active",
    avatar: "/diverse-woman-avatar.png",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    hotelId: 2,
    hotelName: "Seaside Resort",
    position: "Operations Manager",
    email: "mike.johnson@seasideresort.com",
    phone: "+1 234 567 8902",
    hireDate: "2023-06-10",
    status: "Active",
    avatar: "/man-avatar.png",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    hotelId: 2,
    hotelName: "Seaside Resort",
    position: "Housekeeping Manager",
    email: "emily.davis@seasideresort.com",
    phone: "+1 234 567 8903",
    hireDate: "2023-08-15",
    status: "Active",
    avatar: "/diverse-woman-avatar.png",
  },
]

let nextId = 5

export const getHotelStaffs = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotelStaffs
      if (searchTerm) {
        filtered = hotelStaffs.filter(
          (staff) =>
            staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.position.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelStaffById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const staff = hotelStaffs.find((s) => s.id === Number.parseInt(id))
      if (staff) {
        resolve(staff)
      } else {
        reject(new Error("Staff not found"))
      }
    }, 200)
  })
}

export const createHotelStaff = async (staffData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStaff = {
        id: nextId++,
        ...staffData,
        hireDate: new Date().toISOString().split("T")[0],
      }
      hotelStaffs.push(newStaff)
      resolve(newStaff)
    }, 300)
  })
}

export const updateHotelStaff = async (id, staffData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelStaffs.findIndex((s) => s.id === Number.parseInt(id))
      if (index !== -1) {
        hotelStaffs[index] = { ...hotelStaffs[index], ...staffData }
        resolve(hotelStaffs[index])
      } else {
        reject(new Error("Staff not found"))
      }
    }, 300)
  })
}

export const deleteHotelStaff = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotelStaffs.findIndex((s) => s.id === Number.parseInt(id))
      if (index !== -1) {
        hotelStaffs.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Staff not found"))
      }
    }, 300)
  })
}
