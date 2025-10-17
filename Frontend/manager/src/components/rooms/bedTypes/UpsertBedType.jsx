"use client";

import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  notification,
  Divider,
} from "antd";
import { useCreateBedType } from "../../../hooks/rooms/bedTypes/useCreateBedType";
import { useUpdateBedType } from "../../../hooks/rooms/bedTypes/useUpdateBedType";

const UpsertBedType = ({ open, onClose, bedType, onSuccess }) => {
  const [form] = Form.useForm();
  const { createBedType, loading: creating } = useCreateBedType();
  const { updateBedType, loading: updating } = useUpdateBedType();
  const isEdit = !!bedType?.id;

  useEffect(() => {
    if (isEdit && bedType) {
      form.setFieldsValue(bedType);
    } else {
      form.resetFields();
    }
  }, [bedType, isEdit, form]);

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values, id: isEdit ? bedType.id : 0 };

      if (isEdit) {
        await updateBedType(payload);
        notification.success({
          message: "Updated successfully",
          description: `"${values.name}" has been updated.`,
          placement: "topRight",
        });
      } else {
        await createBedType(payload);
        notification.success({
          message: "Created successfully",
          description: `"${values.name}" has been added.`,
          placement: "topRight",
        });
      }

      onClose();
      onSuccess?.();
    } catch (err) {
      notification.error({
        message: isEdit ? "Update Failed" : "Create Failed",
        description: err.message || "Something went wrong.",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      okText={isEdit ? "Update" : "Create"}
      cancelText="Cancel"
      onOk={() => form.submit()}
      confirmLoading={creating || updating}
      centered
      width={600}
      className="rounded-2xl"
      styles={{
        header: {
          borderBottom: "none",
          paddingBottom: 0,
        },
        body: {
          paddingTop: 0,
        },
      }}
      title={
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Bed Type" : "Add New Bed Type"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? "Update details for this bed type."
              : "Fill in the information below to add a new bed type."}
          </p>
        </div>
      }
    >
      <Divider className="my-3" />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        size="large"
        className="pt-2"
      >
        <Form.Item
          name="name"
          label={
            <span className="font-medium text-gray-700">Bed Type Name</span>
          }
          rules={[
            { required: true, message: "Please enter bed type name" },
            { max: 100, message: "Name cannot exceed 100 characters" },
          ]}
        >
          <Input placeholder="e.g. King Size" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="font-medium text-gray-700">Description</span>}
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="e.g. Large bed suitable for 2 adults"
            className="rounded-lg"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="dimensions"
            label={
              <span className="font-medium text-gray-700">Dimensions</span>
            }
            rules={[{ required: true, message: "Please enter dimensions" }]}
          >
            <Input placeholder="e.g. 76 x 80" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label={<span className="font-medium text-gray-700">Capacity</span>}
            rules={[
              { required: true, message: "Please enter capacity" },
              { type: "number", min: 1, message: "Minimum capacity is 1" },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              placeholder="e.g. 2"
              className="w-full rounded-lg"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="isShared"
          label={<span className="font-medium text-gray-700">Is Shared?</span>}
          valuePropName="checked"
          tooltip="Enable if this bed type can be shared between guests"
        >
          <Switch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpsertBedType;
