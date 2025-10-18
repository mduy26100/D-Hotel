"use client";

import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  notification,
} from "antd";
import { useCreateRoomType } from "../../../hooks/rooms/roomTypes/useCreateRoomType";
import { useUpdateRoomType } from "../../../hooks/rooms/roomTypes/useUpdateRoomType";
import { useGetHotels } from "../../../hooks/hotels/hotels/useGetHotels";
import { useGetBedTypes } from "../../../hooks/rooms/bedTypes/useGetBedTypes";
import { useGetQuantityGuests } from "../../../hooks/rooms/quantityGuests/useGetQuantityGuests";

export default function UpsertRoomType({
  open,
  onClose,
  refetch,
  editingRoomType,
}) {
  const [form] = Form.useForm();
  const { createRoomType, loading: creating } = useCreateRoomType();
  const { updateRoomType, loading: updating } = useUpdateRoomType();
  const { hotels, loading: loadingHotels } = useGetHotels();
  const { bedTypes, loading: loadingBeds } = useGetBedTypes();
  const { quantityGuests, loading: loadingGuests } = useGetQuantityGuests();

  const isEditMode = !!editingRoomType;

  useEffect(() => {
    if (isEditMode && editingRoomType) {
      form.setFieldsValue(editingRoomType);
    } else {
      form.resetFields();
    }
  }, [editingRoomType, isEditMode, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        basePrice: Number(values.basePrice),
        quantity: Number(values.quantity),
      };

      if (isEditMode) {
        await updateRoomType({ ...payload, id: editingRoomType.id });
        notification.success({
          message: "Room type updated successfully",
          description: `${payload.name} has been updated.`,
          placement: "topRight",
        });
      } else {
        await createRoomType(payload);
        notification.success({
          message: "Room type created successfully",
          description: `${payload.name} has been added.`,
          placement: "topRight",
        });
      }

      onClose();
      if (refetch) await refetch();
    } catch (error) {
      notification.error({
        message: "Action failed",
        description: error.message || "Something went wrong.",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      title={isEditMode ? "Edit Room Type" : "Add Room Type"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={creating || updating}
      okText={isEditMode ? "Update" : "Create"}
      cancelText="Cancel"
      className="rounded-xl"
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isActive: true }}
      >
        {/* Hotel */}
        <Form.Item
          label="Hotel"
          name="hotelId"
          rules={[{ required: true, message: "Please select a hotel" }]}
        >
          <Select
            loading={loadingHotels}
            placeholder="Select a hotel"
            showSearch
            optionFilterProp="children"
            className="w-full"
          >
            {hotels
              .filter((h) => h.isActive)
              .map((hotel) => (
                <Select.Option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        {/* Name */}
        <Form.Item
          label="Room Type Name"
          name="name"
          rules={[{ required: true, message: "Please enter a room type name" }]}
        >
          <Input placeholder="e.g., Deluxe Sea View" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter room description..." />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          {/* Base Price */}
          <Form.Item
            label="Base Price (₫)"
            name="basePrice"
            rules={[{ required: true, message: "Please enter base price" }]}
          >
            <InputNumber
              min={0}
              step={10000}
              style={{ width: "100%" }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/,/g, "")}
            />
          </Form.Item>

          {/* Area */}
          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "Please enter area" }]}
          >
            <Input placeholder="e.g., 40m²" />
          </Form.Item>

          {/* Quantity */}
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          {/* Guest Quantity */}
          <Form.Item
            label="Guest Capacity"
            name="quantityGuestId"
            rules={[{ required: true, message: "Please select guest type" }]}
          >
            <Select
              loading={loadingGuests}
              placeholder="Select guest type"
              showSearch
              optionFilterProp="children"
              className="w-full"
            >
              {quantityGuests.map((g) => (
                <Select.Option key={g.id} value={g.id}>
                  {g.name} ({g.minGuests}-{g.maxGuests} guests)
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Bed Type */}
          <Form.Item
            label="Bed Type"
            name="bedTypeId"
            rules={[{ required: true, message: "Please select bed type" }]}
          >
            <Select
              loading={loadingBeds}
              placeholder="Select bed type"
              showSearch
              optionFilterProp="children"
              className="w-full"
            >
              {bedTypes.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name} ({b.capacity} guests)
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Active */}
          <Form.Item
            label="Active Status"
            name="isActive"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
