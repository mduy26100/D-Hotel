import React, { useState, useEffect } from "react";
import { Modal, Input, notification } from "antd";
import { useCreateUtilityItem } from "../../../hooks/utilites/utilityItems/useCreateUtilityItem";
import { useUpdateUtilityItem } from "../../../hooks/utilites/utilityItems/useUpdateUtilityItem";

const UpsertUtilityItem = ({ open, onClose, utility, item, refetch }) => {
  const isEdit = Boolean(item);
  const { createUtilityItem, loading: creating } = useCreateUtilityItem();
  const { updateUtilityItem, loading: updating } = useUpdateUtilityItem();

  const [name, setName] = useState("");

  useEffect(() => {
    setName(item?.name || "");
  }, [item]);

  // ✅ Validate input
  const validateInput = () => {
    if (!name.trim()) {
      notification.warning({
        message: "Validation Error",
        description: "Item name cannot be empty.",
      });
      return false;
    }
    return true;
  };

  // ✅ Handle create
  const handleCreate = async () => {
    await createUtilityItem({
      utilityId: utility.id,
      name,
    });
    notification.success({
      message: "Success",
      description: `Added new item to "${utility.name}" successfully!`,
    });
  };

  // ✅ Handle update
  const handleUpdate = async () => {
    await updateUtilityItem({
      id: item.id,
      utilityId: utility.id,
      name,
    });
    notification.success({
      message: "Success",
      description: `Updated utility item "${name}" in "${utility.name}" successfully!`,
    });
  };

  // ✅ Main handler
  const handleOk = async () => {
    if (!validateInput()) return;
    try {
      if (isEdit) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
      refetch();
      setName("");
      onClose();
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} utility item.`,
      });
    }
  };

  return (
    <Modal
      title={
        isEdit
          ? `Edit Utility Item in "${utility?.name}"`
          : `Add Utility Item to "${utility?.name}"`
      }
      open={open}
      onOk={handleOk}
      confirmLoading={creating || updating}
      maskClosable={false}
      // ✅ Bấm Cancel sẽ reset và đóng modal
      onCancel={() => {
        setName("");
        onClose();
      }}
      okText={isEdit ? "Save Changes" : "Add"}
      cancelText="Cancel"
    >
      <Input
        placeholder="Enter utility item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={creating || updating}
      />
    </Modal>
  );
};

export default UpsertUtilityItem;
