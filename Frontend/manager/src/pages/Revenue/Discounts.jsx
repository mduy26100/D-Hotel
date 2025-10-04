"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit2, Trash2, Tag, Percent, Calendar } from "lucide-react"
import { discountsAPI } from "../../api/mock/discounts"

export default function Discounts() {
  const [discounts, setDiscounts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    minAmount: 0,
    maxDiscount: 0,
    startDate: "",
    endDate: "",
    usageLimit: 0,
    status: "active",
    applicableRoomTypes: [],
    applicableHotels: [],
  })

  useEffect(() => {
    fetchDiscounts()
  }, [searchTerm])

  const fetchDiscounts = async () => {
    try {
      const response = await discountsAPI.getAll(searchTerm)
      setDiscounts(response.data)
    } catch (error) {
      console.error("Error fetching discounts:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedDiscount) {
        await discountsAPI.update(selectedDiscount.id, formData)
      } else {
        await discountsAPI.create(formData)
      }
      fetchDiscounts()
      closeModal()
    } catch (error) {
      console.error("Error saving discount:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await discountsAPI.delete(selectedDiscount.id)
      fetchDiscounts()
      setIsDeleteModalOpen(false)
      setSelectedDiscount(null)
    } catch (error) {
      console.error("Error deleting discount:", error)
    }
  }

  const openModal = (discount = null) => {
    if (discount) {
      setSelectedDiscount(discount)
      setFormData(discount)
    } else {
      setSelectedDiscount(null)
      setFormData({
        code: "",
        name: "",
        description: "",
        discountType: "percentage",
        discountValue: 0,
        minAmount: 0,
        maxDiscount: 0,
        startDate: "",
        endDate: "",
        usageLimit: 0,
        status: "active",
        applicableRoomTypes: [],
        applicableHotels: [],
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDiscount(null)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-100", text: "text-green-800", label: "Đang hoạt động" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800", label: "Tạm dừng" },
      expired: { bg: "bg-red-100", text: "text-red-800", label: "Hết hạn" },
    }
    const config = statusConfig[status] || statusConfig.active
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  const activeDiscounts = discounts.filter((d) => d.status === "active").length
  const totalUsage = discounts.reduce((sum, d) => sum + d.usedCount, 0)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Khuyến mãi</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý các chương trình khuyến mãi</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Tạo khuyến mãi
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng khuyến mãi</p>
              <p className="text-2xl font-bold text-gray-800">{discounts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Tag className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">{activeDiscounts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Percent className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Lượt sử dụng</p>
              <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="text-purple-600" size={24} />
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
            placeholder="Tìm kiếm theo mã, tên khuyến mãi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Discounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discounts.map((discount) => (
          <div key={discount.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="text-blue-600" size={20} />
                  <h3 className="font-bold text-lg text-gray-800">{discount.code}</h3>
                </div>
                <p className="text-gray-900 font-medium">{discount.name}</p>
                <p className="text-gray-600 text-sm mt-1">{discount.description}</p>
              </div>
              {getStatusBadge(discount.status)}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="font-medium text-gray-900">
                  {discount.discountType === "percentage"
                    ? `${discount.discountValue}%`
                    : formatCurrency(discount.discountValue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Đơn tối thiểu:</span>
                <span className="font-medium text-gray-900">{formatCurrency(discount.minAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Giảm tối đa:</span>
                <span className="font-medium text-gray-900">{formatCurrency(discount.maxDiscount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sử dụng:</span>
                <span className="font-medium text-gray-900">
                  {discount.usedCount} / {discount.usageLimit}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Từ: {discount.startDate}</span>
                <span>Đến: {discount.endDate}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal(discount)}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Sửa
                </button>
                <button
                  onClick={() => {
                    setSelectedDiscount(discount)
                    setIsDeleteModalOpen(true)
                  }}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedDiscount ? "Chỉnh sửa khuyến mãi" : "Tạo khuyến mãi mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mã khuyến mãi</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên khuyến mãi</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loại giảm giá</label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="percentage">Phần trăm (%)</option>
                      <option value="fixed">Số tiền cố định (VNĐ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị giảm</label>
                    <input
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đơn tối thiểu</label>
                    <input
                      type="number"
                      value={formData.minAmount}
                      onChange={(e) => setFormData({ ...formData, minAmount: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giảm tối đa</label>
                    <input
                      type="number"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: Number.parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giới hạn sử dụng</label>
                    <input
                      type="number"
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({ ...formData, usageLimit: Number.parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Tạm dừng</option>
                      <option value="expired">Hết hạn</option>
                    </select>
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
                    {selectedDiscount ? "Cập nhật" : "Tạo mới"}
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
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa khuyến mãi {selectedDiscount?.code}?</p>
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
