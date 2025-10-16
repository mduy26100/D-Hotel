"use client";

import { useState, useCallback } from "react";
import { PlusIcon } from "lucide-react";
import { Spin, Empty, notification } from "antd";
import { useDeleteRoomPurpose } from "../../hooks/purposes/roomPurposes/useDeleteRoomPurpose";
import RoomPurposeList from "../../components/purposes/roomPurposes/RoomPurposeList";
import UpsertRoomPurpose from "../../components/purposes/roomPurposes/UpsertRoomPurpose";
import { useGetRoomPurposes } from "../../hooks/purposes/roomPurposes/useGetRoomPurposes";

export default function RoomPurposes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomPurpose, setSelectedRoomPurpose] = useState(null);
  const { roomPurposes, loading, error, refetch } = useGetRoomPurposes();
  const { deleteRoomPurpose } = useDeleteRoomPurpose();

  const handleOpenModal = () => {
    setSelectedRoomPurpose(null);
    setIsModalOpen(true);
  };

  const handleEdit = (roomPurpose) => {
    setSelectedRoomPurpose(roomPurpose);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoomPurpose(null);
  };

  const handleSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (roomPurpose) => {
    try {
      await deleteRoomPurpose({
        id: roomPurpose.id,
        name: roomPurpose.name,
      });
      notification.success({
        message: "Delete Successful",
        description: `Room Purpose "${roomPurpose.name}" has been deleted successfully.`,
        placement: "topRight",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: "An error occurred while deleting the roomPurpose.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Room Purposes
          </h1>
          <p className="text-gray-600">
            Manage hotel Room Purposes types and classifications
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Room Purpose
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">
          Failed to load roomPurposes. Please try again.
        </p>
      ) : roomPurposes?.length > 0 ? (
        <RoomPurposeList
          roomPurposes={roomPurposes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Empty description="No roomPurposes found" />
      )}

      <UpsertRoomPurpose
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedRoomPurpose={selectedRoomPurpose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
