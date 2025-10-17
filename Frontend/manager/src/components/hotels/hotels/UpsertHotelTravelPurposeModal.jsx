"use client";

import React from "react";
import { Modal, Select, Form, Button, Spin, notification } from "antd";
import { useGetTravelPurposes } from "../../../hooks/purposes/travelPurposes/useGetTravelPurposes";
import { useCreateHotelTravelPurpose } from "../../../hooks/purposes/hotelTravelPurposes/useCreateHotelTravelPurpose";
import { useUpdateHotelTravelPurpose } from "../../../hooks/purposes/hotelTravelPurposes/useUpdateHotelTravelPurpose";

const UpsertHotelTravelPurposeModal = ({ hotel, isOpen, onClose, refetch }) => {
  const [form] = Form.useForm();
  const { travelPurposes, loading: loadingPurposes } = useGetTravelPurposes();
  const { createHotelTravelPurpose, loading: creating } =
    useCreateHotelTravelPurpose();
  const { updateHotelTravelPurpose, loading: updating } =
    useUpdateHotelTravelPurpose();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleSubmit = async (values) => {
    const { travelPurposeId } = values;
    try {
      const payload = { hotelId: hotel.id, travelPurposeId };

      if (hotel?.travelPurpose?.id) {
        // update: thêm id của record cũ
        await updateHotelTravelPurpose(payload);
        openNotification(
          "success",
          "Updated Successfully",
          "Hotel travel purpose has been updated."
        );
      } else {
        // create
        await createHotelTravelPurpose(payload);
        openNotification(
          "success",
          "Added Successfully",
          "Hotel travel purpose has been added."
        );
      }

      refetch?.();
      onClose();
    } catch (error) {
      openNotification(
        "error",
        "Error",
        "Failed to save hotel travel purpose."
      );
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
            {hotel?.travelPurpose?.[0]?.id
              ? "Update Hotel Travel Purpose"
              : "Add Hotel Travel Purpose"}
          </div>
        }
        footer={null}
        bodyStyle={{ backgroundColor: "#ffffff" }}
      >
        <div className="py-3">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              travelPurposeId: hotel?.travelPurpose?.[0]?.id || undefined,
            }}
          >
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  Select Travel Purpose
                </span>
              }
              name="travelPurposeId"
              rules={[
                { required: true, message: "Please select a travel purpose" },
              ]}
            >
              {loadingPurposes ? (
                <div className="flex justify-center py-6">
                  <Spin />
                </div>
              ) : (
                <Select
                  size="large"
                  placeholder="Select a travel purpose"
                  className="rounded-xl"
                  options={travelPurposes.map((tp) => ({
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
                {hotel?.travelPurpose?.[0]?.id ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpsertHotelTravelPurposeModal;
