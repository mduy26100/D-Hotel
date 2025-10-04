"use client"

import { useState, useEffect } from "react"
import { Sparkles, Search, PlusIcon, PencilIcon, TrashIcon, Star } from "lucide-react"
import { getUtilities, createUtility, updateUtility, deleteUtility } from "../../api/mock/utilities"
import Modal from "../../components/Modal"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function Utilities() {
  const [utilities, setUtilities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUtility, setSelectedUtility] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    icon: "",
    isPremium: false,
    status: "Active",
  })

  useEffect(() => {
    fetchUtilities()
  }, [searchTerm])

  const fetchUtilities = async () => {
    setLoading(true)
    try {
      const data = await getUtilities(searchTerm)
      setUtilities(data)
    } catch (error) {
      console.error("Error fetching utilities:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (utility = null) => {
    if (utility) {
      setSelectedUtility(utility)
      setFormData(utility)
    } else {
      setSelectedUtility(null)
      setFormData({
        name: "",
        description: "",
        category: "",
        icon: "",
        isPremium: false,
        status: "Active",
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUtility(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedUtility) {
        await updateUtility(selectedUtility.id, formData)
      } else {
        await createUtility(formData)
      }
      fetchUtilities()
      handleCloseModal()
    } catch (error) {
      console.error("Error saving utility:", error)
    }
  }

  const handleDeleteClick = (utility) => {
    setSelectedUtility(utility)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteUtility(selectedUtility.id)
      fetchUtilities()
      setIsDeleteModalOpen(false)
      setSelectedUtility(null)
    } catch (error) {
      console.error("Error deleting utility:", error)
    }
  }

  const categories = [...new Set(utilities.map((u) => u.category))]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Utilities</h1>
          <p className="text-gray-600">Manage hotel utilities and amenities</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Utility
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Utilities</p>
              <p className="text-2xl font-bold text-gray-900">{utilities.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {utilities.filter((u) => u.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Premium</p>
              <p className="text-2xl font-bold text-gray-900">{utilities.filter((u) => u.isPremium).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
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
            placeholder="Search utilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Utilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading...</div>
        ) : utilities.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">No utilities found</div>
        ) : (
          utilities.map((utility) => (
            <div key={utility.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  {utility.isPremium && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Premium
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      utility.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {utility.status}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{utility.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{utility.description}</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {utility.category}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenModal(utility)}
                  className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(utility)}
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedUtility ? "Edit Utility" : "Add Utility"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Utility Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., Recreation, Connectivity, Dining"
            required
          />
          <Input
            label="Icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., wifi, waves, dumbbell"
            required
          />
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPremium}
                onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Premium Utility</span>
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
              {selectedUtility ? "Update" : "Create"}
            </Button>
            <Button type="button" onClick={handleCloseModal} className="flex-1 bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Utility">
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete <strong>{selectedUtility?.name}</strong>? This action cannot be undone.
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
