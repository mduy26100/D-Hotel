"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2, Eye, DollarSign, Calendar, CreditCard } from "lucide-react"
import { invoicesAPI } from "../../api/mock/invoices"

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isViewMode, setIsViewMode] = useState(false)
  const [formData, setFormData] = useState({
    bookingId: "",
    customerName: "",
    hotelName: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    nights: 1,
    roomPrice: 0,
    serviceCharges: 0,
    tax: 0,
    discount: 0,
    status: "pending",
    paymentMethod: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchInvoices()
  }, [searchTerm])

  const fetchInvoices = async () => {
    try {
      const response = await invoicesAPI.getAll(searchTerm)
      setInvoices(response.data)
    } catch (error) {
      console.error("Error fetching invoices:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const totalAmount = formData.roomPrice + formData.serviceCharges + formData.tax - formData.discount
      const invoiceData = {
        ...formData,
        totalAmount,
        paidAmount: formData.status === "paid" ? totalAmount : 0,
      }

      if (selectedInvoice) {
        await invoicesAPI.update(selectedInvoice.id, invoiceData)
      } else {
        await invoicesAPI.create(invoiceData)
      }
      fetchInvoices()
      closeModal()
    } catch (error) {
      console.error("Error saving invoice:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await invoicesAPI.delete(selectedInvoice.id)
      fetchInvoices()
      setIsDeleteModalOpen(false)
      setSelectedInvoice(null)
    } catch (error) {
      console.error("Error deleting invoice:", error)
    }
  }

  const openModal = (invoice = null, viewMode = false) => {
    if (invoice) {
      setSelectedInvoice(invoice)
      setFormData(invoice)
      setIsViewMode(viewMode)
    } else {
      setSelectedInvoice(null)
      setFormData({
        bookingId: "",
        customerName: "",
        hotelName: "",
        roomType: "",
        checkIn: "",
        checkOut: "",
        nights: 1,
        roomPrice: 0,
        serviceCharges: 0,
        tax: 0,
        discount: 0,
        status: "pending",
        paymentMethod: "",
        dueDate: "",
        notes: "",
      })
      setIsViewMode(false)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedInvoice(null)
    setIsViewMode(false)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { bg: "bg-green-100", text: "text-green-800", label: "Đã thanh toán" },
      partial: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Thanh toán 1 phần" },
      pending: { bg: "bg-orange-100", text: "text-orange-800", label: "Chờ thanh toán" },
      overdue: { bg: "bg-red-100", text: "text-red-800", label: "Quá hạn" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)
  const paidRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
  const pendingRevenue = totalRevenue - paidRevenue

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Hóa đơn</h1>
          <p className="text-gray-600 mt-1">Quản lý hóa đơn và thanh toán</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Tạo hóa đơn
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đã thu</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(paidRevenue)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CreditCard className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Chưa thu</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(pendingRevenue)}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="text-orange-600" size={24} />
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
            placeholder="Tìm kiếm theo mã hóa đơn, khách hàng, khách sạn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã hóa đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách sạn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày lập
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{invoice.bookingId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.hotelName}</div>
                    <div className="text-sm text-gray-500">{invoice.roomType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.issueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.totalAmount)}</div>
                    <div className="text-sm text-gray-500">Đã thu: {formatCurrency(invoice.paidAmount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(invoice.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(invoice, true)} className="text-blue-600 hover:text-blue-900">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => openModal(invoice)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice)
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
                {isViewMode ? "Chi tiết hóa đơn" : selectedInvoice ? "Chỉnh sửa hóa đơn" : "Tạo hóa đơn mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã đặt phòng</label>
                    <input
                      type="text"
                      value={formData.bookingId}
                      onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
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
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khách sạn</label>
                    <input
                      type="text"
                      value={formData.hotelName}
                      onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
                    <input
                      type="text"
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày nhận phòng</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày trả phòng</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số đêm</label>
                    <input
                      type="number"
                      value={formData.nights}
                      onChange={(e) => setFormData({ ...formData, nights: Number.parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá phòng</label>
                    <input
                      type="number"
                      value={formData.roomPrice}
                      onChange={(e) => setFormData({ ...formData, roomPrice: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phí dịch vụ</label>
                    <input
                      type="number"
                      value={formData.serviceCharges}
                      onChange={(e) => setFormData({ ...formData, serviceCharges: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thuế</label>
                    <input
                      type="number"
                      value={formData.tax}
                      onChange={(e) => setFormData({ ...formData, tax: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={isViewMode}
                    >
                      <option value="pending">Chờ thanh toán</option>
                      <option value="partial">Thanh toán 1 phần</option>
                      <option value="paid">Đã thanh toán</option>
                      <option value="overdue">Quá hạn</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      disabled={isViewMode}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {isViewMode ? "Đóng" : "Hủy"}
                  </button>
                  {!isViewMode && (
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {selectedInvoice ? "Cập nhật" : "Tạo mới"}
                    </button>
                  )}
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
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa hóa đơn {selectedInvoice?.invoiceNumber}?</p>
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
