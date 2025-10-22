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
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <CalendarRange className="w-6 h-6 text-blue-600" />
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

      {/* Body */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {roomTypePrice.priceType}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Room Type ID: {roomTypePrice.roomTypeId}
        </p>

        {/* Giá chi tiết */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
          {roomTypePrice.baseHourlyPrice > 0 && (
            <p>
              <span className="font-medium">Base Hourly:</span>{" "}
              {roomTypePrice.baseHourlyPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
          {roomTypePrice.extraHourPrice > 0 && (
            <p>
              <span className="font-medium">Extra Hour:</span>{" "}
              {roomTypePrice.extraHourPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
          {roomTypePrice.overnightPrice > 0 && (
            <p>
              <span className="font-medium">Overnight:</span>{" "}
              {roomTypePrice.overnightPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
          {roomTypePrice.dailyPrice > 0 && (
            <p>
              <span className="font-medium">Daily:</span>{" "}
              {roomTypePrice.dailyPrice.toLocaleString("vi-VN")}₫
            </p>
          )}
        </div>

        {/* Thời gian áp dụng */}
        <div className="text-xs text-gray-500 mt-2">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
            {formattedStart} → {formattedEnd}
          </span>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(roomTypePrice)}
          className="flex-1 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 py-2"
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
