import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Modal } from "antd";

const HotelCategoryCard = ({ category, onEdit, onDelete }) => {
  const handleDeleteClick = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => onDelete(category),
    });
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {category.name}
          </h3>
          <p className="text-gray-500 mt-1">
            ID: <span className="text-gray-700">{category.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(category)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit Category"
          >
            <PencilIcon className="w-5 h-5" />
          </button>

          <button
            onClick={handleDeleteClick}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete Category"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCategoryCard;
