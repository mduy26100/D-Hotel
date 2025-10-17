import React, { useState, useMemo } from "react";
import BedTypeCard from "./BedTypeCard";
import SearchBox from "../../ui/SearchBox";

const BedTypeList = ({ bedTypes, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBedTypes = useMemo(() => {
    if (!searchTerm.trim()) return bedTypes;
    const lower = searchTerm.toLowerCase();
    return bedTypes.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        b.description?.toLowerCase().includes(lower) ||
        b.dimensions?.toLowerCase().includes(lower) ||
        String(b.capacity).includes(lower)
    );
  }, [bedTypes, searchTerm]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">
        Loading...
      </div>
    );
  }

  if (bedTypes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">
        No bed types found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search bed types..."
      />

      {filteredBedTypes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBedTypes.map((bedType) => (
            <BedTypeCard
              key={bedType.id}
              bedType={bedType}
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

export default BedTypeList;
