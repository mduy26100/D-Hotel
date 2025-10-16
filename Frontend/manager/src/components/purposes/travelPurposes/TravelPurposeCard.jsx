import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Modal } from "antd";

const RoomlPurposeCard = ({ travelPurpose, onEdit, onDelete }) => {
  const handleDeleteClick = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete "${travelPurpose.name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => onDelete(travelPurpose),
    });
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {travelPurpose.name}
          </h3>
          <p className="text-gray-500 mt-1">
            ID: <span className="text-gray-700">{travelPurpose.id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(travelPurpose)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit Travel Purpose"
          >
            <PencilIcon className="w-5 h-5" />
          </button>

          <button
            onClick={handleDeleteClick}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete Travel Purpose"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomlPurposeCard;
