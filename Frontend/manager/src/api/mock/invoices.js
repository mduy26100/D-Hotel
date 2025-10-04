// Mock API for Invoices Management
let invoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    bookingId: "BK-001",
    customerName: "Nguyễn Văn A",
    hotelName: "Grand Hotel",
    roomType: "Deluxe Suite",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    nights: 3,
    roomPrice: 2000000,
    serviceCharges: 500000,
    tax: 250000,
    discount: 100000,
    totalAmount: 2650000,
    paidAmount: 2650000,
    status: "paid",
    paymentMethod: "credit_card",
    issueDate: "2024-01-15",
    dueDate: "2024-01-15",
    paidDate: "2024-01-15",
    notes: "Thanh toán đầy đủ",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    bookingId: "BK-002",
    customerName: "Trần Thị B",
    hotelName: "Ocean View Resort",
    roomType: "Standard Room",
    checkIn: "2024-01-20",
    checkOut: "2024-01-23",
    nights: 3,
    roomPrice: 1500000,
    serviceCharges: 300000,
    tax: 180000,
    discount: 0,
    totalAmount: 1980000,
    paidAmount: 1000000,
    status: "partial",
    paymentMethod: "bank_transfer",
    issueDate: "2024-01-20",
    dueDate: "2024-01-23",
    paidDate: "2024-01-20",
    notes: "Đã thanh toán 50%",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    bookingId: "BK-003",
    customerName: "Lê Văn C",
    hotelName: "City Center Hotel",
    roomType: "Presidential Suite",
    checkIn: "2024-02-01",
    checkOut: "2024-02-05",
    nights: 4,
    roomPrice: 5000000,
    serviceCharges: 1000000,
    tax: 600000,
    discount: 500000,
    totalAmount: 6100000,
    paidAmount: 0,
    status: "pending",
    paymentMethod: null,
    issueDate: "2024-02-01",
    dueDate: "2024-02-05",
    paidDate: null,
    notes: "Chờ thanh toán",
  },
]

let nextId = 4

export const invoicesAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = invoices.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.hotelName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: invoices }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const invoice = invoices.find((i) => i.id === Number.parseInt(id))
    return { data: invoice }
  },

  create: async (invoiceData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newInvoice = {
      id: nextId++,
      invoiceNumber: `INV-2024-${String(nextId).padStart(3, "0")}`,
      ...invoiceData,
      issueDate: new Date().toISOString().split("T")[0],
    }
    invoices.push(newInvoice)
    return { data: newInvoice }
  },

  update: async (id, invoiceData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = invoices.findIndex((i) => i.id === Number.parseInt(id))
    if (index !== -1) {
      invoices[index] = { ...invoices[index], ...invoiceData }
      return { data: invoices[index] }
    }
    throw new Error("Invoice not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    invoices = invoices.filter((i) => i.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
