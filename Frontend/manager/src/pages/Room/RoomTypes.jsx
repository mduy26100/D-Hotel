"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetRoomTypes } from "../../hooks/rooms/roomTypes/useGetRoomTypes";
import { useDeleteRoomType } from "../../hooks/rooms/roomTypes/useDeleteRoomType";
import RoomTypeList from "../../components/rooms/roomTypes/RoomTypeList";
import UpsertRoomType from "../../components/rooms/roomTypes/UpsertRoomType";

export default function RoomTypes() {
  const { roomTypes, loading, refetch } = useGetRoomTypes();
  const { deleteRoomType } = useDeleteRoomType();

  const [editingRoomType, setEditingRoomType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setEditingRoomType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (roomType) => {
    setEditingRoomType(roomType);
    setIsModalOpen(true);
  };

  const handleDelete = (roomType) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">{roomType.name}</span>?
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteRoomType({
            id: roomType.id,
            hotelId: roomType.hotelId,
            name: roomType.name,
            description: roomType.description,
            baseHourlyPrice: roomType.baseHourlyPrice,
            baseHours: roomType.baseHours,
            extraHourPrice: roomType.extraHourPrice,
            maxHours: roomType.maxHours,
            overnightPrice: roomType.overnightPrice,
            overnightStartTime: roomType.overnightStartTime,
            overnightEndTime: roomType.overnightEndTime,
            dailyPrice: roomType.dailyPrice,
            dailyStartTime: roomType.dailyStartTime,
            dailyEndTime: roomType.dailyEndTime,
            area: roomType.area,
            quantityGuestId: roomType.quantityGuestId,
            bedTypeId: roomType.bedTypeId,
            quantity: roomType.quantity,
            isActive: roomType.isActive,
          });
          notification.success({
            message: "Deleted Successfully",
            description: `${roomType.name} has been deleted.`,
            placement: "topRight",
          });
          refetch();
        } catch (err) {
          notification.error({
            message: "Delete Failed",
            description:
              err?.response?.data?.message ||
              "Something went wrong while deleting this room type.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Room Types</h1>
          <p className="text-gray-600">Manage room types and configurations</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Room Type
        </button>
      </div>

      {/* Upsert Modal */}
      <UpsertRoomType
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
        editingRoomType={editingRoomType}
      />

      {/* Room Type List */}
      <RoomTypeList
        roomTypes={roomTypes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
