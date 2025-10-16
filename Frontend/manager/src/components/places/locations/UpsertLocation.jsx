"use client";

import React, { useEffect, useState } from "react";
import { Modal, Upload, Input, Spin, Button, Form, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateLocation } from "../../../hooks/places/locations/useCreateLocation";
import { useUpdateLocation } from "../../../hooks/places/locations/useUpdateLocation";

export default function UpsertLocation({
  open,
  onClose,
  refetch,
  editingLocation,
}) {
  const [form] = Form.useForm();
  const isEdit = !!editingLocation;
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { createLocation, loading: creating } = useCreateLocation();
  const { updateLocation, loading: updating } = useUpdateLocation();

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        name: editingLocation.name || "",
      });
      setFileList(
        editingLocation.imgUrl
          ? [
              {
                uid: "-1",
                name: editingLocation.name,
                status: "done",
                url: editingLocation.imgUrl,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [isEdit, editingLocation, form]);

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleSubmit = async (values) => {
    const file = fileList[0]?.originFileObj || null;
    const payload = { name: values.name, image: file };

    try {
      if (isEdit) {
        await updateLocation(editingLocation.id, payload);
        notification.success({
          message: "Update Successful",
          description: `The location "${values.name}" has been updated successfully.`,
        });
      } else {
        await createLocation(payload);
        notification.success({
          message: "Creation Successful",
          description: `The location "${values.name}" has been added successfully.`,
        });
      }

      await refetch?.();
      onClose();
    } catch (err) {
      notification.error({
        message: "Operation Failed",
        description:
          "Something went wrong while saving this location. Please try again later.",
      });
      console.error(err);
    }
  };

  return (
    <>
      <Modal
        title={isEdit ? "Update Location" : "Add New Location"}
        open={open}
        onCancel={onClose}
        onOk={() => form.submit()}
        okText={isEdit ? "Update" : "Create"}
        confirmLoading={creating || updating}
        centered
        destroyOnClose
      >
        <Spin spinning={creating || updating}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ name: "" }}
          >
            <Form.Item
              name="name"
              label="Location Name"
              rules={[
                { required: true, message: "Please enter a location name!" },
              ]}
            >
              <Input placeholder="Enter location name..." />
            </Form.Item>

            <Form.Item
              label="Image"
              required
              tooltip="Please upload an image for the location."
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleUploadChange}
                onPreview={handlePreview}
                accept="image/*"
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </div>
                )}
              </Upload>
              {fileList.length === 0 && (
                <div className="text-red-500 text-sm mt-1">
                  * Please upload an image.
                </div>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
      >
        <img
          alt="preview"
          style={{ width: "100%", borderRadius: "8px" }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}
