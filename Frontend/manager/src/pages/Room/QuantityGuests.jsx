"use client"

import { useState, useEffect } from "react"
import { Users, Search, PlusIcon, PencilIcon, TrashIcon, DollarSign } from "lucide-react"
import {
  getQuantityGuests,
  createQuantityGuest,
  updateQuantityGuest,
  deleteQuantityGuest,
} from "../../api/mock/quantityGuests"
import Modal from "../../components/Modal"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function QuantityGuests() {
  const [quantityGuests, setQuantityGuests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedQG, setSelectedQG] = useState(null)
  const [formData, setFormData] = useState({
    roomTypeName: "",
    minGuests: 1,
    maxGuests: 2,
    standardGuests: 2,
    extraGuestCharge: 0,
    childrenAllowed: true,
    maxChildren: 0,
    status: "Active",
  })

  useEffect(() => {
    fetchQuantityGuests()
  }, [searchTerm])

  const fetchQuantityGuests = async () => {
    setLoading(true)
    try {
      const data = await getQuantityGuests(searchTerm)
      setQuantityGuests(data)
    } catch (error) {
      console.error("Error fetching quantity guests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (qg = null) => {
    if (qg) {
      setSelectedQG(qg)
      setFormData(qg)
    } else {
      setSelectedQG(null)
      setFormData({
        roomTypeName: "",
        minGuests: 1,
        maxGuests: 2,
        standardGuests: 2,
        extraGuestCharge: 0,
        childrenAllowed: true,
        maxChildren: 0,
        status: "Active",
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedQG(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedQG) {
        await updateQuantityGuest(selectedQG.id, formData)
      } else {
        await createQuantityGuest(formData)
      }
      fetchQuantityGuests()
      handleCloseModal()
    } catch (error) {
      console.error("Error saving quantity guest:", error)
    }
  }

  const handleDeleteClick = (qg) => {
    setSelectedQG(qg)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteQuantityGuest(selectedQG.id)
      fetchQuantityGuests()
      setIsDeleteModalOpen(false)
      setSelectedQG(null)
    } catch (error) {
      console.error("Error deleting quantity guest:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quantity Guests</h1>
          <p className="text-gray-600">Manage guest capacity and pricing for room types</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Configuration
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Configurations</p>
              <p className="text-2xl font-bold text-gray-900">{quantityGuests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Max Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">
                {quantityGuests.reduce((sum, qg) => sum + qg.maxGuests, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Extra Guest Fee</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {(
                  quantityGuests.reduce((sum, qg) => sum + qg.extraGuestCharge, 0) / quantityGuests.length || 0
                ).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by room type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Range
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Standard
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Extra Charge
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Children
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : quantityGuests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No quantity guest configurations found
                  </td>
                </tr>
              ) : (
                quantityGuests.map((qg) => (
                  <tr key={qg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{qg.roomTypeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {qg.minGuests} - {qg.maxGuests} guests
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {qg.standardGuests} guests
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${qg.extraGuestCharge}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {qg.childrenAllowed ? `Max ${qg.maxChildren}` : "Not allowed"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          qg.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {qg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(qg)}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(qg)}
                          className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedQG ? "Edit Guest Configuration" : "Add Guest Configuration"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Room Type Name"
            value={formData.roomTypeName}
            onChange={(e) => setFormData({ ...formData, roomTypeName: e.target.value })}
            required
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Min Guests"
              type="number"
              min="1"
              value={formData.minGuests}
              onChange={(e) => setFormData({ ...formData, minGuests: Number.parseInt(e.target.value) })}
              required
            />
            <Input
              label="Max Guests"
              type="number"
              min="1"
              value={formData.maxGuests}
              onChange={(e) => setFormData({ ...formData, maxGuests: Number.parseInt(e.target.value) })}
              required
            />
            <Input
              label="Standard"
              type="number"
              min="1"
              value={formData.standardGuests}
              onChange={(e) => setFormData({ ...formData, standardGuests: Number.parseInt(e.target.value) })}
              required
            />
          </div>
          <Input
            label="Extra Guest Charge ($)"
            type="number"
            min="0"
            value={formData.extraGuestCharge}
            onChange={(e) => setFormData({ ...formData, extraGuestCharge: Number.parseInt(e.target.value) })}
            required
          />
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={formData.childrenAllowed}
                onChange={(e) => setFormData({ ...formData, childrenAllowed: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Children Allowed</span>
            </label>
          </div>
          {formData.childrenAllowed && (
            <Input
              label="Max Children"
              type="number"
              min="0"
              value={formData.maxChildren}
              onChange={(e) => setFormData({ ...formData, maxChildren: Number.parseInt(e.target.value) })}
              required
            />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {selectedQG ? "Update" : "Create"}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Guest Configuration">
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the guest configuration for <strong>{selectedQG?.roomTypeName}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 hover:bg-red-700">
              Delete
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
