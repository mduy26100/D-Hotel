"use client"

import { useState, useEffect } from "react"
import { Building2, Search, PlusIcon, PencilIcon, TrashIcon } from "lucide-react"
import {
  getHotelTravelPurposes,
  createHotelTravelPurpose,
  updateHotelTravelPurpose,
  deleteHotelTravelPurpose,
} from "../../api/mock/hotelTravelPurposes"
import Modal from "../../components/Modal"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function HotelTravelPurposes() {
  const [hotelTravelPurposes, setHotelTravelPurposes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedHTP, setSelectedHTP] = useState(null)
  const [formData, setFormData] = useState({
    hotelName: "",
    purposeName: "",
    priority: 1,
    amenities: "",
    targetAudience: "",
    status: "Active",
  })

  useEffect(() => {
    fetchHotelTravelPurposes()
  }, [searchTerm])

  const fetchHotelTravelPurposes = async () => {
    setLoading(true)
    try {
      const data = await getHotelTravelPurposes(searchTerm)
      setHotelTravelPurposes(data)
    } catch (error) {
      console.error("Error fetching hotel travel purposes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (htp = null) => {
    if (htp) {
      setSelectedHTP(htp)
      setFormData(htp)
    } else {
      setSelectedHTP(null)
      setFormData({
        hotelName: "",
        purposeName: "",
        priority: 1,
        amenities: "",
        targetAudience: "",
        status: "Active",
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedHTP(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedHTP) {
        await updateHotelTravelPurpose(selectedHTP.id, formData)
      } else {
        await createHotelTravelPurpose(formData)
      }
      fetchHotelTravelPurposes()
      handleCloseModal()
    } catch (error) {
      console.error("Error saving hotel travel purpose:", error)
    }
  }

  const handleDeleteClick = (htp) => {
    setSelectedHTP(htp)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteHotelTravelPurpose(selectedHTP.id)
      fetchHotelTravelPurposes()
      setIsDeleteModalOpen(false)
      setSelectedHTP(null)
    } catch (error) {
      console.error("Error deleting hotel travel purpose:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Travel Purposes</h1>
          <p className="text-gray-600">Link hotels with travel purposes and target audiences</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Mapping
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Mappings</p>
              <p className="text-2xl font-bold text-gray-900">{hotelTravelPurposes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Mappings</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelTravelPurposes.filter((htp) => htp.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Hotels</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(hotelTravelPurposes.map((htp) => htp.hotelName)).size}
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
            placeholder="Search by hotel or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading...</div>
        ) : hotelTravelPurposes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No hotel travel purposes found</div>
        ) : (
          hotelTravelPurposes.map((htp) => (
            <div key={htp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{htp.hotelName}</h3>
                    <p className="text-sm text-gray-600">{htp.purposeName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      htp.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {htp.status}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    Priority {htp.priority}
                  </span>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Amenities</p>
                  <p className="text-sm text-gray-900">{htp.amenities}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Target Audience</p>
                  <p className="text-sm text-gray-900">{htp.targetAudience}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenModal(htp)}
                  className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(htp)}
                  className="flex-1 text-red-600 hover:text-red-800 font-medium flex items-center justify-center gap-1 py-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedHTP ? "Edit Hotel Travel Purpose" : "Add Hotel Travel Purpose"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Hotel Name"
            value={formData.hotelName}
            onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
            required
          />
          <Input
            label="Purpose Name"
            value={formData.purposeName}
            onChange={(e) => setFormData({ ...formData, purposeName: e.target.value })}
            required
          />
          <Input
            label="Priority"
            type="number"
            min="1"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: Number.parseInt(e.target.value) })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <textarea
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Conference rooms, Business center"
              required
            />
          </div>
          <Input
            label="Target Audience"
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            placeholder="e.g., Corporate travelers"
            required
          />
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
              {selectedHTP ? "Update" : "Create"}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Hotel Travel Purpose">
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the mapping between <strong>{selectedHTP?.hotelName}</strong> and{" "}
            <strong>{selectedHTP?.purposeName}</strong>? This action cannot be undone.
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
