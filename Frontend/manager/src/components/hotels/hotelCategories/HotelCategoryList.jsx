import React, { useState } from "react";
import HotelCategoryCard from "./HotelCategoryCard";
import SearchBox from "../../ui/SearchBox";

const HotelCategoryList = ({ categories, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (categories.length === 0)
    return (
      <div className="text-center text-gray-500 py-8">No categories found</div>
    );

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search hotel categories..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <HotelCategoryCard
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={onDelete} // ✅ Thêm prop này
          />
        ))}
      </div>
    </div>
  );
};

export default HotelCategoryList;
