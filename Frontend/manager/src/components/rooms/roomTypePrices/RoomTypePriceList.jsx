import React, { useState, useMemo } from "react";
import RoomTypePriceCard from "./RoomTypePriceCard";
import SearchBox from "../../ui/SearchBox";

const RoomTypePriceList = ({ roomTypePrices, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoomTypePrices = useMemo(() => {
    if (!searchTerm.trim()) return roomTypePrices;
    const lower = searchTerm.toLowerCase();
    return roomTypePrices.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        b.description?.toLowerCase().includes(lower) ||
        b.dimensions?.toLowerCase().includes(lower) ||
        String(b.capacity).includes(lower)
    );
  }, [roomTypePrices, searchTerm]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">
        Loading...
      </div>
    );
  }

  if (roomTypePrices.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">
        No room type prices found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search room type prices..."
      />

      {filteredRoomTypePrices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoomTypePrices.map((roomTypePrice) => (
            <RoomTypePriceCard
              key={roomTypePrice.id}
              roomTypePrice={roomTypePrice}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">
          No results found for “{searchTerm}”
        </div>
      )}
    </div>
  );
};

export default RoomTypePriceList;
