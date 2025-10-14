"use client";

import { useState, useEffect } from "react";
import {
  DoorOpen,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getRoomPurposes,
  createRoomPurpose,
  updateRoomPurpose,
  deleteRoomPurpose,
} from "../../api/mock/roomPurposes";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RoomPurposes() {
  const [roomPurposes, setRoomPurposes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRP, setSelectedRP] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: "",
    purposeName: "",
    isAvailable: true,
    notes: "",
    status: "Active",
  });

  useEffect(() => {
    fetchRoomPurposes();
  }, [searchTerm]);

  const fetchRoomPurposes = async () => {
    setLoading(true);
    try {
      const data = await getRoomPurposes(searchTerm);
      setRoomPurposes(data);
    } catch (error) {
      console.error("Error fetching room purposes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (rp = null) => {
    if (rp) {
      setSelectedRP(rp);
      setFormData(rp);
    } else {
      setSelectedRP(null);
      setFormData({
        roomNumber: "",
        purposeName: "",
        isAvailable: true,
        notes: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRP(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRP) {
        await updateRoomPurpose(selectedRP.id, formData);
      } else {
        await createRoomPurpose(formData);
      }
      fetchRoomPurposes();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room purpose:", error);
    }
  };

  const handleDeleteClick = (rp) => {
    setSelectedRP(rp);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoomPurpose(selectedRP.id);
      fetchRoomPurposes();
      setIsDeleteModalOpen(false);
      setSelectedRP(null);
    } catch (error) {
      console.error("Error deleting room purpose:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Room Purposes
          </h1>
          <p className="text-gray-600">Assign purposes to individual rooms</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Room Purpose
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomPurposes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomPurposes.filter((rp) => rp.isAvailable).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupied Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomPurposes.filter((rp) => !rp.isAvailable).length}
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
            placeholder="Search by room number or purpose..."
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
                  Room Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
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
              ) : roomPurposes.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No room purposes found
                  </td>
                </tr>
              ) : (
                roomPurposes.map((rp) => (
                  <tr
                    key={rp.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <DoorOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {rp.roomNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {rp.purposeName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 w-fit ${
                          rp.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rp.isAvailable ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Available
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Occupied
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs">
                        {rp.notes}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          rp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(rp)}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(rp)}
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
        title={selectedRP ? "Edit Room Purpose" : "Add Room Purpose"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Room Number"
            value={formData.roomNumber}
            onChange={(e) =>
              setFormData({ ...formData, roomNumber: e.target.value })
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
                Room is available
              </span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
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
              {selectedRP ? "Update" : "Create"}
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
        title="Delete Room Purpose"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the purpose assignment for room{" "}
            <strong>{selectedRP?.roomNumber}</strong>? This action cannot be
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
