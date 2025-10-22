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
  Divider,
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
        id: initialData?.id || 0,
        roomTypeId: values.roomTypeId,
        priceType: values.priceType,
        baseHourlyPrice: values.baseHourlyPrice || 0,
        extraHourPrice: values.extraHourPrice || 0,
        overnightPrice: values.overnightPrice || 0,
        dailyPrice: values.dailyPrice || 0,
        startDate: values.startDate.format("YYYY-MM-DDTHH:mm:ss"),
        endDate: values.endDate.format("YYYY-MM-DDTHH:mm:ss"),
        isActive: values.isActive,
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
      width={700}
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
                  {rt.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="priceType"
          label="Price Type"
          rules={[{ required: true, message: "Please enter price type" }]}
        >
          <Input placeholder="e.g., Weekend Promotion, Holiday Discount..." />
        </Form.Item>

        <Divider orientation="left">Pricing Details</Divider>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="baseHourlyPrice"
            label="Base Hourly Price (₫)"
            rules={[
              { required: true, message: "Please enter base hourly price" },
            ]}
          >
            <InputNumber
              min={0}
              step={10000}
              className="w-full"
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="extraHourPrice"
            label="Extra Hour Price (₫)"
            rules={[
              { required: true, message: "Please enter extra hour price" },
            ]}
          >
            <InputNumber
              min={0}
              step={10000}
              className="w-full"
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="overnightPrice"
            label="Overnight Price (₫)"
            rules={[
              { required: true, message: "Please enter overnight price" },
            ]}
          >
            <InputNumber
              min={0}
              step={10000}
              className="w-full"
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="dailyPrice"
            label="Daily Price (₫)"
            rules={[{ required: true, message: "Please enter daily price" }]}
          >
            <InputNumber
              min={0}
              step={10000}
              className="w-full"
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>
        </div>

        <Divider orientation="left">Active Period</Divider>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker className="w-full" format="DD/MM/YYYY" />
          </Form.Item>
        </div>

        <Divider orientation="left">Status</Divider>

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
