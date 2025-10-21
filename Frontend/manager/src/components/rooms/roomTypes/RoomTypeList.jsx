"use client";

import { useState, useMemo } from "react";
import RoomTypeCard from "./RoomTypeCard";
import RoomDetail from "./RoomDetail";
import SearchBox from "../../ui/SearchBox";

const RoomTypeList = ({ roomTypes, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredRoomTypes = useMemo(() => {
    if (!searchTerm.trim()) return roomTypes;
    return roomTypes.filter((roomType) =>
      roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roomTypes, searchTerm]);

  const handleShowDetails = (id) => {
    setSelectedRoomTypeId(id);
    setIsDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedRoomTypeId(null);
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search room type by name..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            Loading...
          </div>
        ) : filteredRoomTypes.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No room types found
          </div>
        ) : (
          filteredRoomTypes.map((roomType) => (
            <RoomTypeCard
              key={roomType.id}
              roomType={roomType}
              onEdit={onEdit}
              onDelete={onDelete}
              onShowDetails={handleShowDetails}
            />
          ))
        )}
      </div>

      {/* ✅ Modal hiển thị chi tiết phòng */}
      {isDetailOpen && (
        <RoomDetail
          roomTypeId={selectedRoomTypeId}
          open={isDetailOpen}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default RoomTypeList;
