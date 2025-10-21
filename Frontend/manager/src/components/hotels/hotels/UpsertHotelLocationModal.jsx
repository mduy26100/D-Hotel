"use client";

import React from "react";
import { Modal, Select, Form, Button, Spin, notification } from "antd";
import { useGetAllLocations } from "../../../hooks/places/locations/useGetAllLocations";
import { useCreateHotelLocation } from "../../../hooks/places/hotelLocations/useCreateHotelLocation";
import { useUpdateHotelLocation } from "../../../hooks/places/hotelLocations/useUpdateHotelLocation";

const UpsertHotelLocationModal = ({ hotel, isOpen, onClose, refetch }) => {
  const [form] = Form.useForm();
  const { locations, loading: loadingLocations } = useGetAllLocations();
  const { createHotelLocation, loading: creating } = useCreateHotelLocation();
  const { updateHotelLocation, loading: updating } = useUpdateHotelLocation();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleSubmit = async (values) => {
    const { locationId } = values;

    try {
      const payload = { hotelId: hotel.id, locationId };

      if (hotel?.location?.id) {
        await updateHotelLocation(hotel.id, payload);
        openNotification(
          "success",
          "Updated Successfully",
          "Hotel location has been updated."
        );
      } else {
        await createHotelLocation(payload);
        openNotification(
          "success",
          "Added Successfully",
          "Hotel location has been added."
        );
      }

      refetch?.();
      onClose();
    } catch (error) {
      openNotification("error", "Error", "Failed to save hotel location.");
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
            {hotel?.location?.id
              ? "Update Hotel Location"
              : "Add Hotel Location"}
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
            initialValues={{ locationId: hotel?.location?.id || undefined }}
          >
            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  Select Location
                </span>
              }
              name="locationId"
              rules={[{ required: true, message: "Please select a location" }]}
            >
              {loadingLocations ? (
                <div className="flex justify-center py-6">
                  <Spin />
                </div>
              ) : (
                <Select
                  size="large"
                  placeholder="Select a location"
                  className="rounded-xl"
                  listHeight={300} // scroll nếu nhiều option
                  options={locations.map((loc) => ({
                    value: loc.id,
                    label: (
                      <div className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded-md">
                        <img
                          src={loc.imgUrl}
                          alt={loc.name}
                          className="w-8 h-8 object-cover rounded-md border border-gray-200"
                        />
                        <span className="font-medium text-gray-800">
                          {loc.name}
                        </span>
                      </div>
                    ),
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
                {hotel?.location?.id ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpsertHotelLocationModal;
