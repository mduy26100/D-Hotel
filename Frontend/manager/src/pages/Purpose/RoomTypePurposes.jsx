"use client";

import { useState, useEffect } from "react";
import { Link2, Search, PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  getRoomTypePurposes,
  createRoomTypePurpose,
  updateRoomTypePurpose,
  deleteRoomTypePurpose,
} from "../../api/mock/roomTypePurposes";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RoomTypePurposes() {
  const [roomTypePurposes, setRoomTypePurposes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRTP, setSelectedRTP] = useState(null);
  const [formData, setFormData] = useState({
    roomTypeName: "",
    purposeName: "",
    priority: 1,
    description: "",
    status: "Active",
  });

  useEffect(() => {
    fetchRoomTypePurposes();
  }, [searchTerm]);

  const fetchRoomTypePurposes = async () => {
    setLoading(true);
    try {
      const data = await getRoomTypePurposes(searchTerm);
      setRoomTypePurposes(data);
    } catch (error) {
      console.error("Error fetching room type purposes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (rtp = null) => {
    if (rtp) {
      setSelectedRTP(rtp);
      setFormData(rtp);
    } else {
      setSelectedRTP(null);
      setFormData({
        roomTypeName: "",
        purposeName: "",
        priority: 1,
        description: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRTP(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRTP) {
        await updateRoomTypePurpose(selectedRTP.id, formData);
      } else {
        await createRoomTypePurpose(formData);
      }
      fetchRoomTypePurposes();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room type purpose:", error);
    }
  };

  const handleDeleteClick = (rtp) => {
    setSelectedRTP(rtp);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoomTypePurpose(selectedRTP.id);
      fetchRoomTypePurposes();
      setIsDeleteModalOpen(false);
      setSelectedRTP(null);
    } catch (error) {
      console.error("Error deleting room type purpose:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Room Type Purposes
          </h1>
          <p className="text-gray-600">Link room types with travel purposes</p>
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
              <Link2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Mappings</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomTypePurposes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Link2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Mappings</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  roomTypePurposes.filter((rtp) => rtp.status === "Active")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Link2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Room Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(roomTypePurposes.map((rtp) => rtp.roomTypeName)).size}
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
            placeholder="Search by room type or purpose..."
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
                  Purpose
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : roomTypePurposes.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No room type purposes found
                  </td>
                </tr>
              ) : (
                roomTypePurposes.map((rtp) => (
                  <tr
                    key={rtp.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rtp.roomTypeName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {rtp.purposeName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        Priority {rtp.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs">
                        {rtp.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          rtp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rtp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(rtp)}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(rtp)}
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
        title={selectedRTP ? "Edit Room Type Purpose" : "Add Room Type Purpose"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Room Type Name"
            value={formData.roomTypeName}
            onChange={(e) =>
              setFormData({ ...formData, roomTypeName: e.target.value })
            }
            required
          />
          <Input
            label="Purpose Name"
            value={formData.purposeName}
            onChange={(e) =>
              setFormData({ ...formData, purposeName: e.target.value })
            }
            required
          />
          <Input
            label="Priority"
            type="number"
            min="1"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: Number.parseInt(e.target.value),
              })
            }
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
              {selectedRTP ? "Update" : "Create"}
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
        title="Delete Room Type Purpose"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the mapping between{" "}
            <strong>{selectedRTP?.roomTypeName}</strong> and{" "}
            <strong>{selectedRTP?.purposeName}</strong>? This action cannot be
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
