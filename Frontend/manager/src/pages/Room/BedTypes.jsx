"use client";

import { useState, useEffect } from "react";
import {
  BedDouble,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  getBedTypes,
  createBedType,
  updateBedType,
  deleteBedType,
} from "../../api/mock/bedTypes";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function BedTypes() {
  const [bedTypes, setBedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dimensions: "",
    capacity: 1,
    icon: "bed-double",
    status: "Active",
  });

  useEffect(() => {
    fetchBedTypes();
  }, [searchTerm]);

  const fetchBedTypes = async () => {
    setLoading(true);
    try {
      const data = await getBedTypes(searchTerm);
      setBedTypes(data);
    } catch (error) {
      console.error("Error fetching bed types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (bedType = null) => {
    if (bedType) {
      setSelectedBedType(bedType);
      setFormData(bedType);
    } else {
      setSelectedBedType(null);
      setFormData({
        name: "",
        description: "",
        dimensions: "",
        capacity: 1,
        icon: "bed-double",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBedType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBedType) {
        await updateBedType(selectedBedType.id, formData);
      } else {
        await createBedType(formData);
      }
      fetchBedTypes();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving bed type:", error);
    }
  };

  const handleDeleteClick = (bedType) => {
    setSelectedBedType(bedType);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBedType(selectedBedType.id);
      fetchBedTypes();
      setIsDeleteModalOpen(false);
      setSelectedBedType(null);
    } catch (error) {
      console.error("Error deleting bed type:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bed Types</h1>
          <p className="text-gray-600">Manage bed types and configurations</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Bed Type
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Bed Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {bedTypes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {bedTypes.filter((bt) => bt.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BedDouble className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">
                {bedTypes.reduce((sum, bt) => sum + bt.capacity, 0)}
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
            placeholder="Search bed types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Bed Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Loading...
          </div>
        ) : bedTypes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No bed types found
          </div>
        ) : (
          bedTypes.map((bedType) => (
            <div
              key={bedType.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BedDouble className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    bedType.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {bedType.status}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {bedType.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {bedType.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">{bedType.dimensions}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    Capacity: {bedType.capacity}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenModal(bedType)}
                  className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(bedType)}
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
        title={selectedBedType ? "Edit Bed Type" : "Add Bed Type"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Bed Type Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <Input
            label="Dimensions"
            value={formData.dimensions}
            onChange={(e) =>
              setFormData({ ...formData, dimensions: e.target.value })
            }
            placeholder='e.g., 76" x 80"'
            required
          />
          <Input
            label="Capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({
                ...formData,
                capacity: Number.parseInt(e.target.value),
              })
            }
            required
          />
          <Input
            label="Icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., bed-double, bed-single"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {selectedBedType ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Bed Type"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <strong>{selectedBedType?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDeleteConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
