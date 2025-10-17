"use client";
import React, { useState, useMemo } from "react";
import QuantityGuestTable from "./QuantityGuestTable";
import SearchBox from "../../ui/SearchBox";

const QuantityGuestList = ({ quantityGuests, loading, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc danh sách theo tên (hoặc có thể đổi sang field khác nếu cần)
  const filteredGuests = useMemo(() => {
    if (!quantityGuests) return [];
    return quantityGuests.filter((guest) =>
      guest.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quantityGuests, searchTerm]);

  return (
    <div className="space-y-4">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search guest by name..."
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <QuantityGuestTable
          quantityGuests={filteredGuests}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default QuantityGuestList;
