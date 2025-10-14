"use client";

import { useState, useEffect } from "react";
import {
  DoorOpen,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DollarSign,
  Users,
} from "lucide-react";
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  deleteRoomType,
} from "../../api/mock/roomTypes";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function RoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bedType: "",
    size: "",
    maxOccupancy: 2,
    basePrice: 0,
    amenities: "",
    viewType: "",
    floor: "",
    totalRooms: 1,
    status: "Active",
  });

  useEffect(() => {
    fetchRoomTypes();
  }, [searchTerm]);

  const fetchRoomTypes = async () => {
    setLoading(true);
    try {
      const data = await getRoomTypes(searchTerm);
      setRoomTypes(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (roomType = null) => {
    if (roomType) {
      setSelectedRoomType(roomType);
      setFormData(roomType);
    } else {
      setSelectedRoomType(null);
      setFormData({
        name: "",
        description: "",
        bedType: "",
        size: "",
        maxOccupancy: 2,
        basePrice: 0,
        amenities: "",
        viewType: "",
        floor: "",
        totalRooms: 1,
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoomType(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRoomType) {
        await updateRoomType(selectedRoomType.id, formData);
      } else {
        await createRoomType(formData);
      }
      fetchRoomTypes();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room type:", error);
    }
  };

  const handleDeleteClick = (roomType) => {
    setSelectedRoomType(roomType);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoomType(selectedRoomType.id);
      fetchRoomTypes();
      setIsDeleteModalOpen(false);
      setSelectedRoomType(null);
    } catch (error) {
      console.error("Error deleting room type:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Types</h1>
          <p className="text-gray-600">Manage room types and configurations</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Room Type
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Room Types</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomTypes.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomTypes.reduce((sum, rt) => sum + rt.totalRooms, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {roomTypes.reduce((sum, rt) => sum + rt.availableRooms, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Price</p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {(
                  roomTypes.reduce((sum, rt) => sum + rt.basePrice, 0) /
                    roomTypes.length || 0
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
            placeholder="Search room types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Room Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Loading...
          </div>
        ) : roomTypes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No room types found
          </div>
        ) : (
          roomTypes.map((roomType) => (
            <div
              key={roomType.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DoorOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {roomType.name}
                    </h3>
                    <p className="text-sm text-gray-600">{roomType.bedType}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    roomType.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {roomType.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {roomType.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DoorOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{roomType.size}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Max {roomType.maxOccupancy}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">
                    ${roomType.basePrice}/night
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">
                    {roomType.availableRooms}/{roomType.totalRooms} available
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                  Amenities
                </p>
                <p className="text-sm text-gray-900">{roomType.amenities}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {roomType.viewType}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                  Floor {roomType.floor}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenModal(roomType)}
                  className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(roomType)}
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
        title={selectedRoomType ? "Edit Room Type" : "Add Room Type"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <Input
            label="Room Type Name"
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Bed Type"
              value={formData.bedType}
              onChange={(e) =>
                setFormData({ ...formData, bedType: e.target.value })
              }
              placeholder="e.g., King Size"
              required
            />
            <Input
              label="Size"
              value={formData.size}
              onChange={(e) =>
                setFormData({ ...formData, size: e.target.value })
              }
              placeholder="e.g., 450 sq ft"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Max Occupancy"
              type="number"
              min="1"
              value={formData.maxOccupancy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxOccupancy: Number.parseInt(e.target.value),
                })
              }
              required
            />
            <Input
              label="Base Price ($)"
              type="number"
              min="0"
              value={formData.basePrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basePrice: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <textarea
              value={formData.amenities}
              onChange={(e) =>
                setFormData({ ...formData, amenities: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Mini bar, Coffee maker, Safe"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="View Type"
              value={formData.viewType}
              onChange={(e) =>
                setFormData({ ...formData, viewType: e.target.value })
              }
              placeholder="e.g., City View"
              required
            />
            <Input
              label="Floor"
              value={formData.floor}
              onChange={(e) =>
                setFormData({ ...formData, floor: e.target.value })
              }
              placeholder="e.g., 10-15"
              required
            />
          </div>
          <Input
            label="Total Rooms"
            type="number"
            min="1"
            value={formData.totalRooms}
            onChange={(e) =>
              setFormData({
                ...formData,
                totalRooms: Number.parseInt(e.target.value),
              })
            }
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
              {selectedRoomType ? "Update" : "Create"}
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
        title="Delete Room Type"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <strong>{selectedRoomType?.name}</strong>? This action cannot be
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
