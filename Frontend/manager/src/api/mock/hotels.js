// Mock data for Hotels
const hotels = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    categoryId: 1,
    categoryName: "Luxury",
    address: "123 Main Street, New York",
    phone: "+1 234 567 8900",
    email: "contact@grandplaza.com",
    rating: 5,
    totalRooms: 150,
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Seaside Resort",
    categoryId: 2,
    categoryName: "Resort",
    address: "456 Beach Road, Miami",
    phone: "+1 234 567 8901",
    email: "info@seasideresort.com",
    rating: 4,
    totalRooms: 200,
    status: "Active",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "City Center Inn",
    categoryId: 3,
    categoryName: "Budget",
    address: "789 Downtown Ave, Chicago",
    phone: "+1 234 567 8902",
    email: "hello@citycenterinn.com",
    rating: 3,
    totalRooms: 80,
    status: "Active",
    createdAt: "2024-03-10",
  },
]

let nextId = 4

export const getHotels = async (searchTerm = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = hotels
      if (searchTerm) {
        filtered = hotels.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.email.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }
      resolve(filtered)
    }, 300)
  })
}

export const getHotelById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const hotel = hotels.find((h) => h.id === Number.parseInt(id))
      if (hotel) {
        resolve(hotel)
      } else {
        reject(new Error("Hotel not found"))
      }
    }, 200)
  })
}

export const createHotel = async (hotelData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newHotel = {
        id: nextId++,
        ...hotelData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      hotels.push(newHotel)
      resolve(newHotel)
    }, 300)
  })
}

export const updateHotel = async (id, hotelData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotels.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotels[index] = { ...hotels[index], ...hotelData }
        resolve(hotels[index])
      } else {
        reject(new Error("Hotel not found"))
      }
    }, 300)
  })
}

export const deleteHotel = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = hotels.findIndex((h) => h.id === Number.parseInt(id))
      if (index !== -1) {
        hotels.splice(index, 1)
        resolve({ success: true })
      } else {
        reject(new Error("Hotel not found"))
      }
    }, 300)
  })
}
