"use client";

import { useState, useCallback } from "react";
import { PlusIcon } from "lucide-react";
import { Spin, Empty, notification } from "antd";
import { useDeleteTravelPurpose } from "../../hooks/purposes/travelPurposes/useDeleteTravelPurpose";
import { useGetTravelPurposes } from "../../hooks/purposes/travelPurposes/useGetTravelPurposes";
import UpsertTravelPurpose from "../../components/purposes/travelPurposes/UpsertTravelPurpose";
import TravelPurposeList from "../../components/purposes/travelPurposes/TravelPurposeList";

export default function TravelPurposes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTravelPurpose, setSelectedTravelPurpose] = useState(null);
  const { travelPurposes, loading, error, refetch } = useGetTravelPurposes();
  const { deleteTravelPurpose } = useDeleteTravelPurpose();

  const handleOpenModal = () => {
    setSelectedTravelPurpose(null);
    setIsModalOpen(true);
  };

  const handleEdit = (travelPurpose) => {
    setSelectedTravelPurpose(travelPurpose);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTravelPurpose(null);
  };

  const handleSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (travelPurpose) => {
    try {
      await deleteTravelPurpose({
        id: travelPurpose.id,
        name: travelPurpose.name,
      });
      notification.success({
        message: "Delete Successful",
        description: `Travel Purpose "${travelPurpose.name}" has been deleted successfully.`,
        placement: "topRight",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: "An error occurred while deleting the travelPurpose.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Travel Purposes
          </h1>
          <p className="text-gray-600">
            Manage hotel Travel Purposes types and classifications
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Travel Purpose
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">
          Failed to load travelPurposes. Please try again.
        </p>
      ) : travelPurposes?.length > 0 ? (
        <TravelPurposeList
          travelPurposes={travelPurposes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Empty description="No travelPurposes found" />
      )}

      <UpsertTravelPurpose
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedTravelPurpose={selectedTravelPurpose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
