"use client";

import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TimePicker,
  Divider,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useCreateRoomType } from "../../../hooks/rooms/roomTypes/useCreateRoomType";
import { useUpdateRoomType } from "../../../hooks/rooms/roomTypes/useUpdateRoomType";
import { useGetHotels } from "../../../hooks/hotels/hotels/useGetHotels";
import { useGetBedTypes } from "../../../hooks/rooms/bedTypes/useGetBedTypes";
import { useGetQuantityGuests } from "../../../hooks/rooms/quantityGuests/useGetQuantityGuests";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // theme

const { Title } = Typography;

const UpsertRoomType = ({ open, onClose, refetch, editingRoomType }) => {
  const [form] = Form.useForm();
  const { createRoomType, loading: creating } = useCreateRoomType();
  const { updateRoomType, loading: updating } = useUpdateRoomType();
  const { hotels, loading: loadingHotels } = useGetHotels();
  const { bedTypes, loading: loadingBeds } = useGetBedTypes();
  const { quantityGuests, loading: loadingGuests } = useGetQuantityGuests();

  const isEditMode = !!editingRoomType;

  useEffect(() => {
    if (isEditMode && editingRoomType) {
      const initial = {
        BaseHourlyPrice: editingRoomType.baseHourlyPrice ?? null,
        BaseHours: editingRoomType.baseHours ?? null,
        ExtraHourPrice: editingRoomType.extraHourPrice ?? null,
        MaxHours: editingRoomType.maxHours ?? null,
        OvernightPrice: editingRoomType.overnightPrice ?? null,
        OvernightStartTime: editingRoomType.overnightStartTime
          ? dayjs(editingRoomType.overnightStartTime, "HH:mm:ss")
          : null,
        OvernightEndTime: editingRoomType.overnightEndTime
          ? dayjs(editingRoomType.overnightEndTime, "HH:mm:ss")
          : null,
        DailyPrice: editingRoomType.dailyPrice ?? null,
        DailyStartTime: editingRoomType.dailyStartTime
          ? dayjs(editingRoomType.dailyStartTime, "HH:mm:ss")
          : null,
        DailyEndTime: editingRoomType.dailyEndTime
          ? dayjs(editingRoomType.dailyEndTime, "HH:mm:ss")
          : null,
        quantity: editingRoomType.quantity ?? null,
        hotelId: editingRoomType.hotelId ?? null,
        name: editingRoomType.name ?? "",
        description: editingRoomType.description ?? "",
        area: editingRoomType.area ?? "",
        quantityGuestId: editingRoomType.quantityGuestId ?? null,
        bedTypeId: editingRoomType.bedTypeId ?? null,
        isActive: editingRoomType.isActive ?? true,
      };
      form.setFieldsValue(initial);
    } else {
      form.resetFields();
    }
  }, [editingRoomType, isEditMode, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        baseHourlyPrice: Number(values.BaseHourlyPrice) || null,
        baseHours: Number(values.BaseHours) || null,
        extraHourPrice: Number(values.ExtraHourPrice) || null,
        maxHours: Number(values.MaxHours) || null,
        overnightPrice: Number(values.OvernightPrice) || null,
        dailyPrice: Number(values.DailyPrice) || null,
        quantity: Number(values.quantity) || null,
        overnightStartTime: values.OvernightStartTime
          ? values.OvernightStartTime.format("HH:mm:ss")
          : null,
        overnightEndTime: values.OvernightEndTime
          ? values.OvernightEndTime.format("HH:mm:ss")
          : null,
        dailyStartTime: values.DailyStartTime
          ? values.DailyStartTime.format("HH:mm:ss")
          : null,
        dailyEndTime: values.DailyEndTime
          ? values.DailyEndTime.format("HH:mm:ss")
          : null,
      };

      if (isEditMode) {
        await updateRoomType({ ...payload, id: editingRoomType.id });
        notification.success({
          message: "Room type updated successfully",
          description: `${payload.name} has been updated.`,
        });
      } else {
        await createRoomType(payload);
        notification.success({
          message: "Room type created successfully",
          description: `${payload.name} has been added.`,
        });
      }

      onClose();
      if (refetch) await refetch();
    } catch (error) {
      notification.error({
        message: "Action failed",
        description: error.message || "Something went wrong.",
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
      width={720}
      className="rounded-xl"
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ isActive: true }}
      >
        {/* ========== Thông tin cơ bản ========== */}
        <Title level={4} className="!text-blue-600 !mb-3">
          Basic Information
        </Title>

        <div className="grid grid-cols-2 gap-4 mb-4">
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

          <Form.Item
            label="Room Type Name"
            name="name"
            rules={[
              { required: true, message: "Please enter a room type name" },
            ]}
          >
            <Input placeholder="e.g., Deluxe Sea View" />
          </Form.Item>

          <Form.Item
            label="Area"
            name="area"
            rules={[{ required: true, message: "Please enter area" }]}
          >
            <Input placeholder="e.g., 40m²" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            placeholder="Enter room description..."
          />
        </Form.Item>

        <Divider />

        {/* ========== Theo giờ ========== */}
        <Title level={4} className="!text-blue-600 !mb-3">
          🕒 Hourly Pricing
        </Title>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item label="Base Hourly Price (₫)" name="BaseHourlyPrice">
            <InputNumber
              min={0}
              step={10000}
              style={{ width: "100%" }}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item label="Base Hours" name="BaseHours">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Extra Hour Price (₫)" name="ExtraHourPrice">
            <InputNumber
              min={0}
              step={10000}
              style={{ width: "100%" }}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item label="Max Hours" name="MaxHours">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Divider />

        {/* ========== Qua đêm ========== */}
        <Title level={4} className="!text-blue-600 !mb-3">
          🌙 Overnight Pricing
        </Title>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item label="Overnight Price (₫)" name="OvernightPrice">
            <InputNumber
              min={0}
              step={10000}
              style={{ width: "100%" }}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item label="Overnight Start Time" name="OvernightStartTime">
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Overnight End Time" name="OvernightEndTime">
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Divider />

        {/* ========== Theo ngày ========== */}
        <Title level={4} className="!text-blue-600 !mb-3">
          ☀️ Daily Pricing
        </Title>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Form.Item label="Daily Price (₫)" name="DailyPrice">
            <InputNumber
              min={0}
              step={10000}
              style={{ width: "100%" }}
              formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(v) => v.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item label="Daily Start Time" name="DailyStartTime">
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Daily End Time" name="DailyEndTime">
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Divider />

        {/* ========== Các thuộc tính khác ========== */}
        <Title level={4} className="!text-blue-600 !mb-3">
          Additional Settings
        </Title>

        <div className="grid grid-cols-2 gap-4">
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
            >
              {quantityGuests.map((g) => (
                <Select.Option key={g.id} value={g.id}>
                  {g.name} ({g.minGuests}-{g.maxGuests} guests)
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

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
            >
              {bedTypes.map((b) => (
                <Select.Option key={b.id} value={b.id}>
                  {b.name} ({b.capacity} guests)
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

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
};

export default UpsertRoomType;
