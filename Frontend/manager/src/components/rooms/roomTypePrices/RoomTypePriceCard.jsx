import React from "react";
import { CalendarRange, PencilIcon, TrashIcon } from "lucide-react";

const RoomTypePriceCard = ({ roomTypePrice, onEdit, onDelete }) => {
  const formattedStart = new Date(roomTypePrice.startDate).toLocaleDateString(
    "vi-VN"
  );
  const formattedEnd = new Date(roomTypePrice.endDate).toLocaleDateString(
    "vi-VN"
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <CalendarRange className="w-6 h-6 text-primary" />
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            roomTypePrice.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-gray-800"
          }`}
        >
          {roomTypePrice.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {roomTypePrice.priceType}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Room Type ID: {roomTypePrice.roomTypeId}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium">
            Giá: {roomTypePrice.price.toLocaleString("vi-VN")} VND
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
            {formattedStart} → {formattedEnd}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(roomTypePrice)}
          className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2"
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(roomTypePrice)}
          className="flex-1 text-red-600 hover:text-red-800 font-medium flex items-center justify-center gap-1 py-2"
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default RoomTypePriceCard;
