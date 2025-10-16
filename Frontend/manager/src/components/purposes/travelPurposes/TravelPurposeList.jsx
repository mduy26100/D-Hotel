import React, { useState } from "react";
import SearchBox from "../../ui/SearchBox";
import TravelPurposeCard from "./TravelPurposeCard";

const TravelPurposeList = ({ travelPurposes, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTravelPurposes = travelPurposes.filter((travelPurpose) =>
    travelPurpose.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (travelPurposes.length === 0)
    return (
      <div className="text-center text-gray-500 py-8">
        No Travel Purpose found
      </div>
    );

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search Travel Purpose..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTravelPurposes.map((travelPurpose) => (
          <TravelPurposeCard
            key={travelPurpose.id}
            travelPurpose={travelPurpose}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TravelPurposeList;
