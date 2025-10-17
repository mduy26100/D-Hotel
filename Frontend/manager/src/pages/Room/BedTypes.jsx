"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Modal, notification } from "antd";
import { useGetBedTypes } from "../../hooks/rooms/bedTypes/useGetBedTypes";
import { useDeleteBedType } from "../../hooks/rooms/bedTypes/useDeleteBedType";
import BedTypeList from "../../components/rooms/bedTypes/BedTypeList";
import UpsertBedType from "../../components/rooms/bedTypes/UpsertBedType";

export default function BedTypes() {
  const { bedTypes, loading, refetch } = useGetBedTypes();
  const { deleteBedType } = useDeleteBedType();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBedType, setSelectedBedType] = useState(null);

  const handleOpenModal = (bedType = null) => {
    setSelectedBedType(bedType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBedType(null);
  };

  const handleDelete = (bedType) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: (
        <>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">"{bedType.name}"</span>?
        </>
      ),
      okText: "Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        try {
          await deleteBedType({
            id: bedType.id,
            name: bedType.name,
            description: bedType.description,
            dimensions: bedType.dimensions,
            capacity: bedType.capacity,
            isShared: bedType.isShared,
          });

          notification.success({
            message: "Deleted Successfully",
            description: `"${bedType.name}" has been removed.`,
            placement: "topRight",
          });

          refetch();
        } catch (err) {
          notification.error({
            message: "Delete Failed",
            description:
              err?.response?.data?.message ||
              "Something went wrong while deleting.",
            placement: "topRight",
          });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bed Types</h1>
          <p className="text-gray-600">Manage bed types and configurations</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Bed Type
        </button>
      </div>

      <BedTypeList
        bedTypes={bedTypes}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <UpsertBedType
        open={isModalOpen}
        onClose={handleCloseModal}
        bedType={selectedBedType}
        onSuccess={refetch}
      />
    </div>
  );
}
