// Mock API for Payments Management
let payments = [
  {
    id: 1,
    paymentCode: "PAY-2024-001",
    invoiceNumber: "INV-2024-001",
    customerName: "Nguyễn Văn A",
    amount: 2650000,
    paymentMethod: "credit_card",
    cardNumber: "**** **** **** 1234",
    transactionId: "TXN-001-2024",
    paymentDate: "2024-01-15",
    status: "completed",
    notes: "Thanh toán thành công",
  },
  {
    id: 2,
    paymentCode: "PAY-2024-002",
    invoiceNumber: "INV-2024-002",
    customerName: "Trần Thị B",
    amount: 1000000,
    paymentMethod: "bank_transfer",
    bankName: "Vietcombank",
    accountNumber: "1234567890",
    transactionId: "TXN-002-2024",
    paymentDate: "2024-01-20",
    status: "completed",
    notes: "Thanh toán 50% đặt cọc",
  },
  {
    id: 3,
    paymentCode: "PAY-2024-003",
    invoiceNumber: "INV-2024-004",
    customerName: "Phạm Văn D",
    amount: 3500000,
    paymentMethod: "cash",
    transactionId: "TXN-003-2024",
    paymentDate: "2024-01-25",
    status: "completed",
    notes: "Thanh toán tiền mặt tại quầy",
  },
  {
    id: 4,
    paymentCode: "PAY-2024-004",
    invoiceNumber: "INV-2024-005",
    customerName: "Hoàng Thị E",
    amount: 1500000,
    paymentMethod: "e_wallet",
    walletType: "MoMo",
    transactionId: "TXN-004-2024",
    paymentDate: "2024-02-01",
    status: "pending",
    notes: "Đang xử lý",
  },
]

let nextId = 5

export const paymentsAPI = {
  getAll: async (searchTerm = "") => {
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (searchTerm) {
      const filtered = payments.filter(
        (payment) =>
          payment.paymentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return { data: filtered }
    }

    return { data: payments }
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const payment = payments.find((p) => p.id === Number.parseInt(id))
    return { data: payment }
  },

  create: async (paymentData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const newPayment = {
      id: nextId++,
      paymentCode: `PAY-2024-${String(nextId).padStart(3, "0")}`,
      transactionId: `TXN-${String(nextId).padStart(3, "0")}-2024`,
      paymentDate: new Date().toISOString().split("T")[0],
      ...paymentData,
    }
    payments.push(newPayment)
    return { data: newPayment }
  },

  update: async (id, paymentData) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const index = payments.findIndex((p) => p.id === Number.parseInt(id))
    if (index !== -1) {
      payments[index] = { ...payments[index], ...paymentData }
      return { data: payments[index] }
    }
    throw new Error("Payment not found")
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    payments = payments.filter((p) => p.id !== Number.parseInt(id))
    return { data: { success: true } }
  },
}
