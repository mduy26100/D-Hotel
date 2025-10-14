"use client";

import { useState } from "react";
import { Search, PlusIcon } from "lucide-react";
import UpsertUtility from "../../components/utilities/utilities/UpsertUtility";
import UtilityList from "../../components/utilities/utilities/UtilityList";
import { useGetUtilities } from "../../hooks/utilites/utilities/useGetUtilities";

export default function Utilities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUtility, setSelectedUtility] = useState(null);

  const { utilities, loading, error, refetch } = useGetUtilities();

  const handleOpenModal = (utility = null) => {
    setSelectedUtility(utility);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
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

      <UpsertUtility
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedUtility={selectedUtility}
        setSelectedUtility={setSelectedUtility}
        refetch={refetch}
      />

      <UtilityList
        utilities={utilities}
        loading={loading}
        error={error}
        handleOpenModal={handleOpenModal}
        handleDeleteClick={(utility) => console.log("delete", utility)}
        refetch={refetch}
      />
    </div>
  );
}
