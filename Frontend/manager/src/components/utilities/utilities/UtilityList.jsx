import React, { useState, useMemo } from "react";
import { Modal, notification } from "antd";
import UtilityCard from "./UtilityCard";
import { useDeleteUtility } from "../../../hooks/utilites/utilities/useDeleteUtility";
import AddUtilityItem from "../utilityItems/UpsertUtilityItem";
import SearchBox from "../../ui/SearchBox";

const UtilityList = ({
  utilities,
  loading,
  error,
  handleOpenModal,
  refetch,
}) => {
  const { deleteUtility, loading: deleting } = useDeleteUtility();
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUtility, setSelectedUtility] = useState(null);

  // Filter logic
  const filteredUtilities = useMemo(() => {
    if (!utilities?.length) return [];
    return utilities.filter((u) => {
      const nameMatch = u.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const itemMatch = u.utilityItems?.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return nameMatch || itemMatch;
    });
  }, [utilities, searchTerm]);

  // Delete logic
  const handleDeleteClick = (utility) => {
    Modal.confirm({
      title: "Are you sure you want to delete this utility?",
      content: `This will permanently remove "${utility.name}".`,
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await deleteUtility({
            dto: {
              id: utility.id,
              name: utility.name,
              iconUrl: utility.iconUrl,
            },
          });
          notification.success({
            message: "Success",
            description: "Utility deleted successfully!",
          });
          refetch();
        } catch {
          notification.error({
            message: "Error",
            description: "Failed to delete utility.",
          });
        }
      },
    });
  };

  const handleOpenAddModal = (utility) => {
    setSelectedUtility(utility);
    setOpenModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenModal(false);
    setSelectedUtility(null);
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 py-8">Loading utilities...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load utilities: {error.message}
      </p>
    );
  if (!utilities?.length)
    return (
      <p className="text-center text-gray-500 py-8">No utilities available</p>
    );

  return (
    <div className="space-y-6">
      <SearchBox
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search utilities..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUtilities.map((utility) => (
          <UtilityCard
            key={utility.id}
            utility={utility}
            deleting={deleting}
            onEdit={handleOpenModal}
            onDelete={handleDeleteClick}
            onAddItem={handleOpenAddModal}
            refetch={refetch}
          />
        ))}
      </div>

      {selectedUtility && (
        <AddUtilityItem
          open={openModal}
          onClose={handleCloseAddModal}
          utility={selectedUtility}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default UtilityList;
