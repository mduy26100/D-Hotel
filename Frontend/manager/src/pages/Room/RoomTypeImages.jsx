"use client"

import { useState, useEffect } from "react"
import { ImageIcon, Search, PlusIcon, PencilIcon, TrashIcon, Star } from "lucide-react"
import {
  getRoomTypeImages,
  createRoomTypeImage,
  updateRoomTypeImage,
  deleteRoomTypeImage,
} from "../../api/mock/roomTypeImages"
import Modal from "../../components/Modal"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function RoomTypeImages() {
  const [roomTypeImages, setRoomTypeImages] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRTI, setSelectedRTI] = useState(null)
  const [formData, setFormData] = useState({
    roomTypeName: "",
    imageUrl: "",
    caption: "",
    isPrimary: false,
    displayOrder: 1,
    status: "Active",
  })

  useEffect(() => {
    fetchRoomTypeImages()
  }, [searchTerm])

  const fetchRoomTypeImages = async () => {
    setLoading(true)
    try {
      const data = await getRoomTypeImages(searchTerm)
      setRoomTypeImages(data)
    } catch (error) {
      console.error("Error fetching room type images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (rti = null) => {
    if (rti) {
      setSelectedRTI(rti)
      setFormData(rti)
    } else {
      setSelectedRTI(null)
      setFormData({
        roomTypeName: "",
        imageUrl: "",
        caption: "",
        isPrimary: false,
        displayOrder: 1,
        status: "Active",
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRTI(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedRTI) {
        await updateRoomTypeImage(selectedRTI.id, formData)
      } else {
        await createRoomTypeImage(formData)
      }
      fetchRoomTypeImages()
      handleCloseModal()
    } catch (error) {
      console.error("Error saving room type image:", error)
    }
  }

  const handleDeleteClick = (rti) => {
    setSelectedRTI(rti)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoomTypeImage(selectedRTI.id)
      fetchRoomTypeImages()
      setIsDeleteModalOpen(false)
      setSelectedRTI(null)
    } catch (error) {
      console.error("Error deleting room type image:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Type Images</h1>
          <p className="text-gray-600">Manage images for room types</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Images</p>
              <p className="text-2xl font-bold text-gray-900">{roomTypeImages.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary Images</p>
              <p className="text-2xl font-bold text-gray-900">{roomTypeImages.filter((rti) => rti.isPrimary).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Room Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(roomTypeImages.map((rti) => rti.roomTypeName)).size}
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

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading...</div>
        ) : roomTypeImages.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No room type images found</div>
        ) : (
          roomTypeImages.map((rti) => (
            <div key={rti.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={rti.imageUrl || "/placeholder.svg"}
                  alt={rti.caption}
                  className="w-full h-full object-cover"
                />
                {rti.isPrimary && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium">
                    <Star className="w-3 h-3" />
                    Primary
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      rti.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {rti.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{rti.roomTypeName}</h3>
                  <p className="text-sm text-gray-600">{rti.caption}</p>
                </div>
                <div className="mb-3">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    Order: {rti.displayOrder}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleOpenModal(rti)}
                    className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(rti)}
                    className="flex-1 text-red-600 hover:text-red-800 font-medium flex items-center justify-center gap-1 py-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRTI ? "Edit Room Type Image" : "Add Room Type Image"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Room Type Name"
            value={formData.roomTypeName}
            onChange={(e) => setFormData({ ...formData, roomTypeName: e.target.value })}
            required
          />
          <Input
            label="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="/comfortable-hotel-room.png"
            required
          />
          <Input
            label="Caption"
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
            required
          />
          <Input
            label="Display Order"
            type="number"
            min="1"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: Number.parseInt(e.target.value) })}
            required
          />
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Set as primary image</span>
            </label>
          </div>
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
              {selectedRTI ? "Update" : "Create"}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Room Type Image">
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this image for <strong>{selectedRTI?.roomTypeName}</strong>? This action
            cannot be undone.
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
