"use client";

import {
  DoorOpen,
  Users,
  DollarSign,
  BedDouble,
  Pencil,
  Trash2,
  BedSingle,
} from "lucide-react";

const RoomTypeCard = ({ roomType, onEdit, onDelete, onShowDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <DoorOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            {/* ✅ Tên phòng chuyển thành nút bấm */}
            <button
              onClick={() => onShowDetails(roomType.id)}
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-all underline-offset-2 hover:underline"
            >
              {roomType.name}
            </button>
            <p className="text-sm text-gray-600">
              {roomType.bedType || "Standard Bed"}
            </p>
          </div>
        </div>

        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            roomType.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {roomType.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {roomType.description || "No description available."}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <BedDouble className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{roomType.area}m2</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">
            Max {roomType.quantityGuestId || 2} guests
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {roomType.overnightPrice != null
              ? Number(roomType.overnightPrice).toLocaleString("vi-VN")
              : "0"}
            ₫ / night
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <BedSingle className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">
            {roomType.quantity} rooms available
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(roomType)}
          className="flex-1 text-primary hover:text-primary-dark font-medium flex items-center justify-center gap-1 py-2 transition-all"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

        <button
          onClick={() => onDelete(roomType)}
          className="flex-1 text-red-600 hover:text-red-800 font-medium flex items-center justify-center gap-1 py-2 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default RoomTypeCard;
