"use client";

import { useState, useEffect } from "react";
import { Building2Icon as BuildingOfficeIcon, PlusIcon } from "lucide-react";
import { useGetHotels } from "../../hooks/hotels/hotels/useGetHotels";
import HotelList from "../../components/hotels/hotels/HotelList";
import UpsertHotel from "../../components/hotels/hotels/UpsertHotel";

export default function Hotels() {
  const { hotels, loading, error, refetch } = useGetHotels();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const handleOpenModal = () => {
    setEditingHotel(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setIsModalOpen(true);
  };

  const handleDeleteHotel = (hotel) => {
    console.log("Delete hotel", hotel);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotels</h1>
          <p className="text-gray-600">Manage hotel information and details</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Hotel
        </button>
      </div>

      <UpsertHotel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hotel={editingHotel}
        refetch={refetch}
      />

      {/* Hotels Table */}
      <HotelList
        hotels={hotels}
        loading={loading}
        refetch={refetch}
        onEditHotel={handleEditHotel}
      />
    </div>
  );
}
