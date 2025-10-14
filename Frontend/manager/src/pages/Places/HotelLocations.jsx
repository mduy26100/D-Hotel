"use client";

import { useState, useEffect } from "react";
import {
  MapPinIcon,
  Search,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Building2Icon,
} from "lucide-react";
import {
  getHotelLocations,
  createHotelLocation,
  updateHotelLocation,
  deleteHotelLocation,
} from "../../api/mock/hotelLocations";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function HotelLocations() {
  const [hotelLocations, setHotelLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedHotelLocation, setSelectedHotelLocation] = useState(null);
  const [formData, setFormData] = useState({
    hotelName: "",
    locationName: "",
    address: "",
    latitude: 0,
    longitude: 0,
    distanceFromCenter: "",
    nearbyAttractions: "",
    status: "Active",
  });

  useEffect(() => {
    fetchHotelLocations();
  }, [searchTerm]);

  const fetchHotelLocations = async () => {
    setLoading(true);
    try {
      const data = await getHotelLocations(searchTerm);
      setHotelLocations(data);
    } catch (error) {
      console.error("Error fetching hotel locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (hotelLocation = null) => {
    if (hotelLocation) {
      setSelectedHotelLocation(hotelLocation);
      setFormData(hotelLocation);
    } else {
      setSelectedHotelLocation(null);
      setFormData({
        hotelName: "",
        locationName: "",
        address: "",
        latitude: 0,
        longitude: 0,
        distanceFromCenter: "",
        nearbyAttractions: "",
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHotelLocation(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedHotelLocation) {
        await updateHotelLocation(selectedHotelLocation.id, formData);
      } else {
        await createHotelLocation(formData);
      }
      fetchHotelLocations();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving hotel location:", error);
    }
  };

  const handleDeleteClick = (hotelLocation) => {
    setSelectedHotelLocation(hotelLocation);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteHotelLocation(selectedHotelLocation.id);
      fetchHotelLocations();
      setIsDeleteModalOpen(false);
      setSelectedHotelLocation(null);
    } catch (error) {
      console.error("Error deleting hotel location:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hotel Locations
          </h1>
          <p className="text-gray-600">
            Manage hotel location details and coordinates
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Hotel Location
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Locations</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelLocations.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2Icon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Locations</p>
              <p className="text-2xl font-bold text-gray-900">
                {hotelLocations.filter((hl) => hl.status === "Active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Hotels</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(hotelLocations.map((hl) => hl.hotelName)).size}
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
            placeholder="Search by hotel name, location, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Hotel Locations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coordinates
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
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
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : hotelLocations.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hotel locations found
                  </td>
                </tr>
              ) : (
                hotelLocations.map((hotelLocation) => (
                  <tr
                    key={hotelLocation.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {hotelLocation.hotelName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {hotelLocation.locationName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {hotelLocation.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-600">
                        <div>Lat: {hotelLocation.latitude}</div>
                        <div>Lng: {hotelLocation.longitude}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {hotelLocation.distanceFromCenter}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          hotelLocation.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {hotelLocation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenModal(hotelLocation)}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(hotelLocation)}
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
        title={
          selectedHotelLocation ? "Edit Hotel Location" : "Add Hotel Location"
        }
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
            label="Location Name"
            value={formData.locationName}
            onChange={(e) =>
              setFormData({ ...formData, locationName: e.target.value })
            }
            required
          />
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="0.0001"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  latitude: Number.parseFloat(e.target.value),
                })
              }
              required
            />
            <Input
              label="Longitude"
              type="number"
              step="0.0001"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longitude: Number.parseFloat(e.target.value),
                })
              }
              required
            />
          </div>
          <Input
            label="Distance from Center"
            value={formData.distanceFromCenter}
            onChange={(e) =>
              setFormData({ ...formData, distanceFromCenter: e.target.value })
            }
            placeholder="e.g., 2.5 km"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nearby Attractions
            </label>
            <textarea
              value={formData.nearbyAttractions}
              onChange={(e) =>
                setFormData({ ...formData, nearbyAttractions: e.target.value })
              }
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Times Square, Central Park"
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
              {selectedHotelLocation ? "Update" : "Create"}
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
        title="Delete Hotel Location"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the location for{" "}
            <strong>{selectedHotelLocation?.hotelName}</strong>? This action
            cannot be undone.
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
