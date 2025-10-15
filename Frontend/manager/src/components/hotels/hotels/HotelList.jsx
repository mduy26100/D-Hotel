import React, { useState, useMemo } from "react";
import { Modal, notification } from "antd";
import HotelTable from "./HotelTable";
import { Search } from "lucide-react";
import { deleteHotelAPI } from "../../../api/hotels/hotels";
import HotelDetailsModal from "./HotelDetailsModal";
import SearchBox from "../../ui/SearchBox";

const HotelList = ({ hotels, loading, refetch, onEditHotel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const filteredHotels = useMemo(() => {
    if (!searchTerm) return hotels || [];
    return (hotels || []).filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hotels, searchTerm]);

  const handleViewDetails = (id) => {
    setSelectedHotelId(id);
  };

  const handleCloseDetails = () => {
    setSelectedHotelId(null);
  };

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
        onViewDetails={handleViewDetails} // ✅ truyền hàm click xuống
      />

      {/* ✅ Modal hiển thị chi tiết */}
      {selectedHotelId && (
        <HotelDetailsModal
          id={selectedHotelId}
          isOpen={!!selectedHotelId}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default HotelList;
