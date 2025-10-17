"use client";

import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch, notification } from "antd";
import { useCreateQuantityGuest } from "../../../hooks/rooms/quantityGuests/useCreateQuantityGuest";
import { useUpdateQuantityGuest } from "../../../hooks/rooms/quantityGuests/useUpdateQuantityGuest";

const UpsertQuantityGuest = ({ open, onClose, refetch, editData = null }) => {
  const [form] = Form.useForm();
  const { createQuantityGuest, loading: creating } = useCreateQuantityGuest();
  const { updateQuantityGuest, loading: updating } = useUpdateQuantityGuest();
  const [api, contextHolder] = notification.useNotification();

  const isEdit = !!editData;

  // Fill form when editing
  useEffect(() => {
    if (isEdit && editData) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
    }
  }, [editData, form, isEdit]);

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateQuantityGuest({ ...editData, ...values });
        api.success({
          message: "Updated Successfully",
          description: `${values.name} has been updated.`,
        });
      } else {
        await createQuantityGuest(values);
        api.success({
          message: "Created Successfully",
          description: `${values.name} has been added.`,
        });
      }
      form.resetFields();
      onClose();
      refetch();
    } catch (err) {
      api.error({
        message: "Operation Failed",
        description: err?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div className="text-xl font-semibold text-gray-800">
            {isEdit ? "Update Quantity Guest" : "Add Quantity Guest"}
          </div>
        }
        open={open}
        onCancel={() => {
          form.resetFields();
          onClose();
        }}
        centered
        okText={isEdit ? "Update" : "Create"}
        confirmLoading={creating || updating}
        onOk={() => form.submit()}
        width={600}
        className="rounded-xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ childrenAllowed: true }}
        >
          <Form.Item
            name="name"
            label="Configuration Name"
            rules={[
              { required: true, message: "Please enter configuration name" },
            ]}
          >
            <Input placeholder="e.g. Family Room Guest Setup" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="minGuests"
              label="Minimum Guests"
              rules={[{ required: true, message: "Enter minimum guests" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item
              name="maxGuests"
              label="Maximum Guests"
              rules={[{ required: true, message: "Enter maximum guests" }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="standardGuests"
              label="Standard Guests"
              rules={[{ required: true, message: "Enter standard guests" }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Form.Item
              name="extraGuestCharge"
              label="Extra Guest Charge ($)"
              rules={[{ required: true, message: "Enter extra guest charge" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <Form.Item
              name="childrenAllowed"
              label="Allow Children"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              shouldUpdate={(prev, curr) =>
                prev.childrenAllowed !== curr.childrenAllowed
              }
              noStyle
            >
              {({ getFieldValue }) =>
                getFieldValue("childrenAllowed") ? (
                  <Form.Item
                    name="maxChildren"
                    label="Maximum Children"
                    rules={[
                      {
                        required: true,
                        message: "Enter maximum children allowed",
                      },
                    ]}
                  >
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpsertQuantityGuest;
