import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetRoomTypePrices } from "../../hooks/rooms/roomTypePrices/useGetRoomTypePrices";
import RoomTypePriceList from "../../components/rooms/roomTypePrices/RoomTypePriceList";
import UpsertRoomTypePrice from "../../components/rooms/roomTypePrices/UpsertRoomTypePrice";
import { useDeleteRoomTypePrice } from "../../hooks/rooms/roomTypePrices/useDeleteRoomTypePrice";

const RoomTypePrices = () => {
  const { roomTypePrices, loading, refetch } = useGetRoomTypePrices();
  const { deleteRoomTypePrice } = useDeleteRoomTypePrice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomTypePrice, setSelectedRoomTypePrice] = useState(null);

  const handleOpenModal = () => {
    setSelectedRoomTypePrice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedRoomTypePrice(item);
    setIsModalOpen(true);
  };

  const handleDelete = (roomTypePrice) => {
    Modal.confirm({
      title: "Confirm Deletion",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">
            {roomTypePrice.name}
          </span>
          ?
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteRoomTypePrice({
            id: roomTypePrice.id,
            roomTypeId: roomTypePrice.roomTypeId,
            price: roomTypePrice.price,
            startDate: roomTypePrice.startDate,
            endDate: roomTypePrice.endDate,
            priceType: roomTypePrice.priceType,
            isActive: roomTypePrice.isActive,
          });
          notification.success({
            message: "Deleted Successfully",
            description: `${roomTypePrice.name} has been deleted.`,
            placement: "topRight",
          });
          refetch();
        } catch (err) {
          notification.error({
            message: "Delete Failed",
            description:
              err?.response?.data?.message ||
              "Something went wrong while deleting this room type price.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Room Type Prices
          </h1>
          <p className="text-gray-600">
            Manage room type prices and configurations
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Room Type Price
        </button>
      </div>

      <RoomTypePriceList
        roomTypePrices={roomTypePrices}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UpsertRoomTypePrice
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedRoomTypePrice}
        onSuccess={refetch}
      />
    </div>
  );
};

export default RoomTypePrices;
