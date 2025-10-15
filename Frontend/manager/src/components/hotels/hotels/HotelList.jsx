import React, { useState, useMemo } from "react";
import { Modal, notification } from "antd";
import HotelTable from "./HotelTable";
import { Search } from "lucide-react";
import { deleteHotelAPI } from "../../../api/hotels/hotels";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  icon = <Search className="w-5 h-5 text-gray-400" />,
}) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}
  >
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  </div>
);

const HotelList = ({ hotels, loading, refetch, onEditHotel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(false);

  const filteredHotels = useMemo(() => {
    if (!searchTerm) return hotels || [];
    return (hotels || []).filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hotels, searchTerm]);

  const handleDeleteHotel = (hotel) => {
    Modal.confirm({
      title: "Are you sure you want to delete this hotel?",
      content: `Hotel: "${hotel.name}" will be permanently removed.`,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      confirmLoading: deleting,
      onOk: async () => {
        setDeleting(true);
        try {
          // Gọi API xóa với DTO đầy đủ
          await deleteHotelAPI({
            id: hotel.id,
            name: hotel.name,
            categoryId: hotel.categoryId,
            hotelManagerId: hotel.hotelManagerId,
            address: hotel.address,
            description: hotel.description,
            imgUrl: hotel.imgUrl || "",
            isActive: hotel.isActive,
          });

          notification.success({
            message: "Hotel Deleted",
            description: `Hotel "${hotel.name}" has been deleted successfully.`,
            placement: "topRight",
          });

          refetch?.();
        } catch (err) {
          console.error(err);
          notification.error({
            message: "Delete Failed",
            description:
              err?.message || "Something went wrong. Please try again.",
            placement: "topRight",
          });
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  return (
    <div className="space-y-4">
      <SearchBox value={searchTerm} onChange={setSearchTerm} />

      <HotelTable
        hotels={filteredHotels}
        loading={loading}
        onEdit={onEditHotel}
        onDelete={handleDeleteHotel}
      />
    </div>
  );
};

export default HotelList;
