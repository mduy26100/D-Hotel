"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Checkbox, Spin, notification } from "antd";
import { useUpdateHotelUtilities } from "../../../hooks/utilites/hotelUtilities/useUpdateHotelUtilities";
import { useGetUtilities } from "../../../hooks/utilites/utilities/useGetUtilities";

const UpsertHotelUtilitiesModal = ({ hotel, isOpen, onClose, refetch }) => {
  const { utilities, loading: loadingUtilities, error } = useGetUtilities();
  const { updateUtilities, loading } = useUpdateHotelUtilities();
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const initial = hotel.utilities?.map((u) => u.id) || [];
      setSelectedIds(initial);
    } else {
      setSelectedIds([]);
    }
  }, [isOpen, hotel]);

  const handleCheckboxChange = (utilityId) => {
    setSelectedIds((prev) =>
      prev.includes(utilityId)
        ? prev.filter((id) => id !== utilityId)
        : [...prev, utilityId]
    );
  };

  const handleSubmit = async () => {
    try {
      await updateUtilities({
        hotelId: hotel.id,
        utilityIds: selectedIds.join(","),
      });

      notification.success({
        message: "Success",
        description: "Hotel utilities updated successfully!",
      });

      refetch?.();
      onClose();
    } catch (err) {
      notification.error({
        message: "Failed",
        description:
          err?.message || "Failed to update utilities. Please try again.",
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={`Manage Utilities for ${hotel.name}`}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>,
      ]}
      centered
    >
      {loadingUtilities ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="text-red-500 py-8 text-center">
          Failed to load utilities.
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-auto">
          {utilities.map((utility) => (
            <Checkbox
              key={utility.id}
              checked={selectedIds.includes(utility.id)}
              onChange={() => handleCheckboxChange(utility.id)}
            >
              {utility.name}
            </Checkbox>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default UpsertHotelUtilitiesModal;
