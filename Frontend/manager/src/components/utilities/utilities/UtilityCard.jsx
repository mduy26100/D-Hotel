import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import UtilityItemList from "../utilityItems/UtilityItemList";

const UtilityCard = ({ utility, deleting, onEdit, onDelete, refetch }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={utility.iconUrl}
          alt={utility.name}
          className="w-12 h-12 rounded-lg object-cover border"
        />
        <h3 className="text-lg font-semibold text-gray-900">{utility.name}</h3>
      </div>

      {/* Move Add Item + List down here */}
      <UtilityItemList
        items={utility.utilityItems}
        utility={utility}
        refetch={refetch}
      />
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
      <button
        onClick={() => onEdit(utility)}
        className="flex-1 font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 py-2 border-r border-gray-200 transition"
      >
        <PencilIcon className="w-4 h-4" /> Edit
      </button>

      <button
        onClick={() => onDelete(utility)}
        disabled={deleting}
        className={`flex-1 font-medium flex items-center justify-center gap-2 py-2 transition ${
          deleting
            ? "text-gray-400 cursor-not-allowed"
            : "text-red-600 hover:text-red-800"
        }`}
      >
        <TrashIcon className="w-4 h-4" />
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  </div>
);

export default UtilityCard;
