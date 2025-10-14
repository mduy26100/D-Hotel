import React, { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Modal, notification } from "antd";
import UpsertUtilityItem from "./UpsertUtilityItem";
import { useDeleteUtilityItem } from "../../../hooks/utilites/utilityItems/useDeleteUtilityItem";

const UtilityItemList = ({ items = [], utility, refetch }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { deleteUtilityItem, loading } = useDeleteUtilityItem();

  const handleOpenAddModal = () => {
    setSelectedItem(null);
    setOpenModal(true);
  };

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  // ⚡ Hàm xử lý confirm delete bằng Ant Design
  const handleDeleteClick = (item) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteUtilityItem({
            id: item.id,
            utilityId: utility.id,
            name: item.name,
          });
          notification.success({
            message: "Deleted",
            description: `Utility item "${item.name}" has been deleted successfully.`,
          });
          refetch();
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Failed to delete utility item.",
          });
        }
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium text-gray-700">Items</p>
        <button
          onClick={handleOpenAddModal}
          className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No items</p>
      ) : (
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center group hover:bg-gray-50 rounded-md px-2 py-1 transition"
            >
              <span>{item.name}</span>
              <div className="hidden group-hover:flex gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(item)}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <UpsertUtilityItem
        open={openModal}
        onClose={handleCloseModal}
        utility={utility}
        item={selectedItem}
        refetch={refetch}
      />
    </div>
  );
};

export default UtilityItemList;
