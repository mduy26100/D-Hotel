"use client";

import { useState, useMemo } from "react";
import RoomTypeCard from "./RoomTypeCard";
import SearchBox from "../../ui/SearchBox";

const RoomTypeList = ({ roomTypes, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Lọc dữ liệu theo tên (case-insensitive)
  const filteredRoomTypes = useMemo(() => {
    if (!searchTerm.trim()) return roomTypes;
    return roomTypes.filter((roomType) =>
      roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roomTypes, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search room type by name..."
      />

      {/* Danh sách */}
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
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RoomTypeList;
