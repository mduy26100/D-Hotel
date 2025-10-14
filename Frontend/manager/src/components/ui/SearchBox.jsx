import React from "react";
import { Search } from "lucide-react";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  icon = <Search className="w-5 h-5 text-gray-400" />,
}) => {
  return (
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
};

export default SearchBox;
