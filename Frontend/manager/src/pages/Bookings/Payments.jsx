"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2, CreditCard, DollarSign, TrendingUp } from "lucide-react"
import { paymentsAPI } from "../../api/mock/payments"

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    amount: 0,
    paymentMethod: "cash",
    cardNumber: "",
    bankName: "",
    accountNumber: "",
    walletType: "",
    status: "completed",
    notes: "",
  })

  useEffect(() => {
    fetchPayments()
  }, [searchTerm])

  const fetchPayments = async () => {
    try {
      const response = await paymentsAPI.getAll(searchTerm)
      setPayments(response.data)
    } catch (error) {
      console.error("Error fetching payments:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedPayment) {
        await paymentsAPI.update(selectedPayment.id, formData)
      } else {
        await paymentsAPI.create(formData)
      }
      fetchPayments()
      closeModal()
    } catch (error) {
      console.error("Error saving payment:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await paymentsAPI.delete(selectedPayment.id)
      fetchPayments()
      setIsDeleteModalOpen(false)
      setSelectedPayment(null)
    } catch (error) {
      console.error("Error deleting payment:", error)
    }
  }

  const openModal = (payment = null) => {
    if (payment) {
      setSelectedPayment(payment)
      setFormData(payment)
    } else {
      setSelectedPayment(null)
      setFormData({
        invoiceNumber: "",
        customerName: "",
        amount: 0,
        paymentMethod: "cash",
        cardNumber: "",
        bankName: "",
        accountNumber: "",
        walletType: "",
        status: "completed",
        notes: "",
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPayment(null)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-800", label: "Hoàn thành" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Đang xử lý" },
      failed: { bg: "bg-red-100", text: "text-red-800", label: "Thất bại" },
      refunded: { bg: "bg-gray-100", text: "text-gray-800", label: "Đã hoàn tiền" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  const getPaymentMethodLabel = (method) => {
    const methods = {
      cash: "Tiền mặt",
      credit_card: "Thẻ tín dụng",
      bank_transfer: "Chuyển khoản",
      e_wallet: "Ví điện tử",
    }
    return methods[method] || method
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const completedPayments = payments.filter((p) => p.status === "completed").length
  const pendingPayments = payments.filter((p) => p.status === "pending").length

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Thanh toán</h1>
          <p className="text-gray-600 mt-1">Theo dõi và quản lý các giao dịch thanh toán</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm thanh toán
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng thanh toán</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">{completedPayments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CreditCard className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đang xử lý</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingPayments}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <TrendingUp className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã thanh toán, hóa đơn, khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hóa đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.paymentCode}</div>
                    <div className="text-sm text-gray-500">{payment.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getPaymentMethodLabel(payment.paymentMethod)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(payment.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(payment)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPayment(payment)
                          setIsDeleteModalOpen(true)
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedPayment ? "Chỉnh sửa thanh toán" : "Thêm thanh toán mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã hóa đơn</label>
                    <input
                      type="text"
                      value={formData.invoiceNumber}
                      onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="cash">Tiền mặt</option>
                      <option value="credit_card">Thẻ tín dụng</option>
                      <option value="bank_transfer">Chuyển khoản</option>
                      <option value="e_wallet">Ví điện tử</option>
                    </select>
                  </div>

                  {formData.paymentMethod === "credit_card" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số thẻ</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {formData.paymentMethod === "bank_transfer" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngân hàng</label>
                        <input
                          type="text"
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số tài khoản</label>
                        <input
                          type="text"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === "e_wallet" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loại ví</label>
                      <input
                        type="text"
                        value={formData.walletType}
                        onChange={(e) => setFormData({ ...formData, walletType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="MoMo, ZaloPay, VNPay..."
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="completed">Hoàn thành</option>
                      <option value="pending">Đang xử lý</option>
                      <option value="failed">Thất bại</option>
                      <option value="refunded">Đã hoàn tiền</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    {selectedPayment ? "Cập nhật" : "Thêm mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa thanh toán {selectedPayment?.paymentCode}?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Hủy
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
