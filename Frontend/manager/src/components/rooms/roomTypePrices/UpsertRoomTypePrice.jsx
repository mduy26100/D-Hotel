import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  notification,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useCreateRoomTypePrice } from "../../../hooks/rooms/roomTypePrices/useCreateRoomTypePrice";
import { useUpdateRoomTypePrice } from "../../../hooks/rooms/roomTypePrices/useUpdateRoomTypePrice";
import { useGetRoomTypes } from "../../../hooks/rooms/roomTypes/useGetRoomTypes";

const UpsertRoomTypePrice = ({ open, onClose, initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const { createRoomTypePrice, loading: creating } = useCreateRoomTypePrice();
  const { updateRoomTypePrice, loading: updating } = useUpdateRoomTypePrice();
  const { roomTypes, loading: loadingRoomTypes } = useGetRoomTypes();

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (open) {
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
          startDate: initialData.startDate
            ? dayjs(initialData.startDate)
            : null,
          endDate: initialData.endDate ? dayjs(initialData.endDate) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.endDate.isBefore(values.startDate)) {
        notification.warning({
          message: "Invalid Date Range",
          description: "End date must be after start date.",
        });
        return;
      }

      const payload = {
        ...values,
        id: initialData?.id || 0,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
      };

      if (isEdit) {
        await updateRoomTypePrice(payload);
        notification.success({
          message: "Update Successful",
          description: "Room type price has been updated successfully.",
        });
      } else {
        await createRoomTypePrice(payload);
        notification.success({
          message: "Create Successful",
          description: "Room type price has been added successfully.",
        });
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      notification.error({
        message: "Action Failed",
        description: err?.message || "An error occurred while processing data.",
      });
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Room Type Price" : "Add New Room Type Price"}
      open={open}
      onCancel={onClose}
      okText={isEdit ? "Update" : "Create"}
      onOk={handleSubmit}
      confirmLoading={creating || updating}
      destroyOnClose
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          isActive: true,
        }}
      >
        {/* Room Type Selection */}
        <Form.Item
          name="roomTypeId"
          label="Room Type"
          rules={[{ required: true, message: "Please select a room type" }]}
        >
          <Select
            loading={loadingRoomTypes}
            placeholder="Select a room type"
            showSearch
            optionFilterProp="children"
            className="w-full"
          >
            {roomTypes
              .filter((rt) => rt.isActive)
              .map((rt) => (
                <Select.Option key={rt.id} value={rt.id}>
                  {rt.name} — {rt.basePrice.toLocaleString()}₫
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priceType"
          label="Price Type"
          rules={[{ required: true, message: "Please enter Price Type" }]}
        >
          <Input placeholder="e.g., Holiday Season, Weekend, etc." />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price (VND)"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            className="w-full"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/,/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: "Please select an end date" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Active Status"
          valuePropName="checked"
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpsertRoomTypePrice;
