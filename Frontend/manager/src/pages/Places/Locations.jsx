"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import LocationList from "../../components/places/locations/LocationList";
import { useGetAllLocations } from "../../hooks/places/locations/useGetAllLocations";
import UpsertLocation from "../../components/places/locations/UpsertLocation";

export default function Locations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const { locations, loading, refetch } = useGetAllLocations();

  const handleOpenModal = () => {
    setEditingLocation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setIsModalOpen(true);
  };

  const handleDelete = async (location) => {};

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Locations</h1>
          <p className="text-gray-600">
            Manage geographic locations and destinations
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Location
        </button>
      </div>

      <LocationList
        locations={locations}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refetch={refetch}
      />

      <UpsertLocation
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        editingLocation={editingLocation}
      />
    </div>
  );
}
