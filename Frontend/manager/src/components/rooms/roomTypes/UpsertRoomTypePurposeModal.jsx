"use client";

import React from "react";
import { Modal, Select, Form, Button, Spin, notification } from "antd";
import { useCreateRoomTypePurpose } from "../../../hooks/purposes/roomTypePurposes/useCreateRoomTypePurpose";
import { useUpdateRoomTypePurpose } from "../../../hooks/purposes/roomTypePurposes/useUpdateRoomTypePurpose";
import { useGetRoomPurposes } from "../../../hooks/purposes/roomPurposes/useGetRoomPurposes";

const UpsertRoomTypePurposeModal = ({ room, isOpen, onClose, refetch }) => {
  const [form] = Form.useForm();
  const { roomPurposes, loading: loadingPurposes } = useGetRoomPurposes();
  const { createRoomTypePurpose, loading: creating } =
    useCreateRoomTypePurpose();
  const { updateRoomTypePurpose, loading: updating } =
    useUpdateRoomTypePurpose();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleSubmit = async (values) => {
    const { roomPurposeId } = values;
    try {
      const payload = { roomId: room.id, roomPurposeId };

      if (room?.roomPurpose?.id) {
        await updateRoomTypePurpose(payload);
        openNotification(
          "success",
          "Updated Successfully",
          "Room type purpose has been updated."
        );
      } else {
        // create
        await createRoomTypePurpose(payload);
        openNotification(
          "success",
          "Added Successfully",
          "Room type purpose has been added."
        );
      }

      refetch?.();
      onClose();
    } catch (error) {
      openNotification("error", "Error", "Failed to save room room purpose.");
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        onCancel={onClose}
        centered
        width={500}
        destroyOnClose
        title={
          <div className="text-lg font-semibold text-gray-900">
            {room?.roomPurpose?.[0]?.id
              ? "Update Room Type Purpose"
              : "Add Room Type Purpose"}
          </div>
        }
        footer={null}
        styles={{ backgroundColor: "#ffffff" }}
      >
        <div className="py-3">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              roomPurposeId: room?.roomPurpose?.[0]?.id || undefined,
            }}
          >
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  Select Travel Purpose
                </span>
              }
              name="roomPurposeId"
              rules={[
                { required: true, message: "Please select a room purpose" },
              ]}
            >
              {loadingPurposes ? (
                <div className="flex justify-center py-6">
                  <Spin />
                </div>
              ) : (
                <Select
                  size="large"
                  placeholder="Select a room purpose"
                  className="rounded-xl"
                  options={roomPurposes.map((tp) => ({
                    value: tp.id,
                    label: tp.name,
                  }))}
                />
              )}
            </Form.Item>

            <Form.Item className="flex justify-end mb-0">
              <Button onClick={onClose} className="mr-3 rounded-lg px-4 py-2">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-lg px-6 py-2"
                loading={creating || updating}
              >
                {room?.roomPurpose?.[0]?.id ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpsertRoomTypePurposeModal;
