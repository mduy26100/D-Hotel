"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  getHotelUtilities,
  createHotelUtility,
  updateHotelUtility,
  deleteHotelUtility,
} from "../../api/mock/hotelUtilities";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function HotelUtilities() {
  const [hotelUtilities, setHotelUtilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHU, setSelectedHU] = useState(null);
  const [formData, setFormData] = useState({
    hotelName: "",
    utilityName: "",
    isAvailable: true,
    location: "",
    operatingHours: "",
    additionalCost: 0,
    notes: "",
    status: "Active",
  });

  useEffect(() => {
    fetchHotelUtilities();
  }, [searchTerm]);

  const fetchHotelUtilities = async () => {
    setLoading(true);
    try {
      const data = await getHotelUtilities(searchTerm);
      setHotelUtilities(data);
    } catch (error) {
      console.error("Error fetching hotel utilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (hu = null) => {
    if (hu) {
      setSelectedHU(hu);
      setFormData(hu);
    } else {
      setSelectedHU(null);
      setFormData({
        hotelName: "",
        utilityName: "",
        isAvailable: true,
        location: "",
        operatingHours: "",
        additionalCost: 0,
        notes: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHU(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedHU) {
        await updateHotelUtility(selectedHU.id, formData);
      } else {
        await createHotelUtility(formData);
      }
      fetchHotelUtilities();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving hotel utility:", error);
    }
  };

  const handleDeleteClick = (hu) => {
    setSelectedHU(hu);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteHotelUtility(selectedHU.id);
      fetchHotelUtilities();
      setIsDeleteModalOpen(false);
      setSelectedHU(null);
    } catch (error) {
      console.error("Error deleting hotel utility:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hotel Utilities
          </h1>
          <p className="text-gray-600">Manage utilities assigned to hotels</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Assign Utility
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
              <p className="text-sm text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelUtilities.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelUtilities.filter((hu) => hu.isAvailable).length}
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
              <p className="text-sm text-gray-600">Paid Utilities</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelUtilities.filter((hu) => hu.additionalCost > 0).length}
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
            placeholder="Search hotel utilities..."
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
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utility
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
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
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : hotelUtilities.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hotel utilities found
                  </td>
                </tr>
              ) : (
                hotelUtilities.map((hu) => (
                  <tr
                    key={hu.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hu.hotelName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {hu.utilityName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{hu.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {hu.operatingHours}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {hu.additionalCost > 0
                          ? `$${hu.additionalCost}`
                          : "Free"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          hu.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {hu.isAvailable ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          hu.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {hu.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(hu)}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(hu)}
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
        title={selectedHU ? "Edit Hotel Utility" : "Assign Utility to Hotel"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Hotel Name"
            value={formData.hotelName}
            onChange={(e) =>
              setFormData({ ...formData, hotelName: e.target.value })
            }
            required
          />
          <Input
            label="Utility Name"
            value={formData.utilityName}
            onChange={(e) =>
              setFormData({ ...formData, utilityName: e.target.value })
            }
            required
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="e.g., Rooftop, Ground Floor"
            required
          />
          <Input
            label="Operating Hours"
            value={formData.operatingHours}
            onChange={(e) =>
              setFormData({ ...formData, operatingHours: e.target.value })
            }
            placeholder="e.g., 24/7, 9:00 AM - 5:00 PM"
            required
          />
          <Input
            label="Additional Cost ($)"
            type="number"
            min="0"
            value={formData.additionalCost}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalCost: Number.parseInt(e.target.value),
              })
            }
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                Available
              </span>
            </label>
          </div>
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
              {selectedHU ? "Update" : "Create"}
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
        title="Delete Hotel Utility"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the utility assignment for{" "}
            <strong>{selectedHU?.utilityName}</strong> at{" "}
            <strong>{selectedHU?.hotelName}</strong>? This action cannot be
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
