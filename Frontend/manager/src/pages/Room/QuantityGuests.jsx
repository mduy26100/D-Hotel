"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Modal, notification } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { useGetQuantityGuests } from "../../hooks/rooms/quantityGuests/useGetQuantityGuests";
import { useDeleteQuantityGuest } from "../../hooks/rooms/quantityGuests/useDeleteQuantityGuest";

import QuantityGuestList from "../../components/rooms/quantityGuests/QuantityGuestList";
import UpsertQuantityGuest from "../../components/rooms/quantityGuests/UpsertQuantityGuest";

const { confirm } = Modal;

export default function QuantityGuests() {
  const { quantityGuests, loading, error, refetch } = useGetQuantityGuests();
  const { deleteQuantityGuest } = useDeleteQuantityGuest();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleOpenModal = (guest = null) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedGuest(null);
    setIsModalOpen(false);
  };

  const handleDelete = (guest) => {
    confirm({
      title: "Are you sure you want to delete this configuration?",
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p>
            <strong>{guest.name}</strong>
          </p>
          <p>This action cannot be undone.</p>
        </>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteQuantityGuest({
            id: guest.id,
            name: guest.name,
            minGuests: guest.minGuests,
            maxGuests: guest.maxGuests,
            standardGuests: guest.standardGuests,
            extraGuestCharge: guest.extraGuestCharge,
            childrenAllowed: guest.childrenAllowed,
            maxChildren: guest.maxChildren,
          });

          notification.success({
            message: "Deleted Successfully",
            description: `${guest.name} has been removed.`,
          });
          refetch();
        } catch (err) {
          notification.error({
            message: "Delete Failed",
            description:
              err?.response?.data?.message ||
              "An error occurred while deleting.",
          });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quantity Guests
          </h1>
          <p className="text-gray-600">
            Manage guest capacity and pricing for room types
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Quantity Guest Configuration
        </button>
      </div>

      {/* List */}
      <QuantityGuestList
        quantityGuests={quantityGuests}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      {/* Upsert Modal */}
      <UpsertQuantityGuest
        open={isModalOpen}
        onClose={handleCloseModal}
        refetch={refetch}
        editData={selectedGuest}
      />
    </div>
  );
}
