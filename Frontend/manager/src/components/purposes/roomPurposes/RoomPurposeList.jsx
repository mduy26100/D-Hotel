import React, { useState } from "react";
import SearchBox from "../../ui/SearchBox";
import RoomPurposeCard from "./RoomPurposeCard";

const RoomPurposeList = ({ roomPurposes, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoomPurposes = roomPurposes.filter((roomPurpose) =>
    roomPurpose.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (roomPurposes.length === 0)
    return (
      <div className="text-center text-gray-500 py-8">
        No Room Purpose found
      </div>
    );

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search Room Purpose..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoomPurposes.map((roomPurpose) => (
          <RoomPurposeCard
            key={roomPurpose.id}
            roomPurpose={roomPurpose}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomPurposeList;
