"use client";

import { useState, useEffect } from "react";
import {
  Target,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
} from "lucide-react";
import {
  getTravelPurposes,
  createTravelPurpose,
  updateTravelPurpose,
  deleteTravelPurpose,
} from "../../api/mock/travelPurposes";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function TravelPurposes() {
  const [purposes, setPurposes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "briefcase",
    status: "Active",
  });

  useEffect(() => {
    fetchPurposes();
  }, [searchTerm]);

  const fetchPurposes = async () => {
    setLoading(true);
    try {
      const data = await getTravelPurposes(searchTerm);
      setPurposes(data);
    } catch (error) {
      console.error("Error fetching travel purposes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (purpose = null) => {
    if (purpose) {
      setSelectedPurpose(purpose);
      setFormData(purpose);
    } else {
      setSelectedPurpose(null);
      setFormData({
        name: "",
        description: "",
        icon: "briefcase",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPurpose(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPurpose) {
        await updateTravelPurpose(selectedPurpose.id, formData);
      } else {
        await createTravelPurpose(formData);
      }
      fetchPurposes();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving travel purpose:", error);
    }
  };

  const handleDeleteClick = (purpose) => {
    setSelectedPurpose(purpose);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTravelPurpose(selectedPurpose.id);
      fetchPurposes();
      setIsDeleteModalOpen(false);
      setSelectedPurpose(null);
    } catch (error) {
      console.error("Error deleting travel purpose:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Travel Purposes
          </h1>
          <p className="text-gray-600">
            Manage travel purpose categories and types
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Purpose
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Purposes</p>
              <p className="text-2xl font-bold text-gray-900">
                {purposes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BriefcaseIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Purposes</p>
              <p className="text-2xl font-bold text-gray-900">
                {purposes.filter((p) => p.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hotels</p>
              <p className="text-2xl font-bold text-gray-900">
                {purposes.reduce((sum, p) => sum + p.hotelCount, 0)}
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
            placeholder="Search travel purposes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Purposes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Loading...
          </div>
        ) : purposes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No travel purposes found
          </div>
        ) : (
          purposes.map((purpose) => (
            <div
              key={purpose.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    purpose.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {purpose.status}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {purpose.name}
                </h3>
                <p className="text-sm text-gray-600">{purpose.description}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {purpose.hotelCount}
                  </span>{" "}
                  hotels
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(purpose)}
                    className="text-primary hover:text-primary-dark p-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(purpose)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <TrashIcon className="w-4 h-4" />
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
        title={selectedPurpose ? "Edit Travel Purpose" : "Add Travel Purpose"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Purpose Name"
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
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <Input
            label="Icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., briefcase, sun, users"
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
              {selectedPurpose ? "Update" : "Create"}
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
        title="Delete Travel Purpose"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <strong>{selectedPurpose?.name}</strong>? This action cannot be
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
