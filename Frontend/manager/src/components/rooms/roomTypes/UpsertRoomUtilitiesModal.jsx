"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Checkbox, Spin, notification } from "antd";
import { useGetUtilities } from "../../../hooks/utilites/utilities/useGetUtilities";
import { useUpdateRoomUtility } from "../../../hooks/utilites/roomUtiliies/useUpdateRoomUtility";

const UpsertRoomUtilitiesModal = ({ room, isOpen, onClose, refetch }) => {
  const { utilities, loading: loadingUtilities, error } = useGetUtilities();
  const { updateRoomUtility, loading } = useUpdateRoomUtility();

  const [selectedIds, setSelectedIds] = useState([]);

  // Khi modal mở, set lại tiện ích ban đầu
  useEffect(() => {
    if (isOpen) {
      const initial = room.utilities?.map((u) => u.id) || [];
      setSelectedIds(initial);
    } else {
      setSelectedIds([]);
    }
  }, [isOpen, room]);

  const handleCheckboxChange = (utilityId) => {
    setSelectedIds((prev) =>
      prev.includes(utilityId)
        ? prev.filter((id) => id !== utilityId)
        : [...prev, utilityId]
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        roomId: room.id,
        utilityIds: selectedIds.join(","), // gửi dạng "1,2,3"
      };

      // 🧩 Log nhẹ
      console.log("🟢 Selected utilities:", selectedIds);
      console.log("📦 Payload gửi API:", payload);

      await updateRoomUtility(payload);

      notification.success({
        message: "Success",
        description: "Room utilities updated successfully!",
      });

      refetch?.();
      onClose();
    } catch (err) {
      console.error("❌ Error updating room utilities:", err);
      notification.error({
        message: "Failed",
        description:
          err?.response?.data?.title ||
          err?.message ||
          "Failed to update room utilities. Please try again.",
      });
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={`Manage Utilities for ${room.name}`}
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

export default UpsertRoomUtilitiesModal;
