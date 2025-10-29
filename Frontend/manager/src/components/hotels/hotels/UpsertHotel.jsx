"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  Upload,
  Button,
  notification,
  Image,
  Select,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateHotel } from "../../../hooks/hotels/hotels/useCreateHotel";
import { useUpdateHotel } from "../../../hooks/hotels/hotels/useUpdateHotel";
import { useGetHotelCategories } from "../../../hooks/hotels/hotelCategories/useGetHotelCategories";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // theme
import { useGetHotelManagers } from "../../../hooks/auth/managers/useGetHotelManagers";

const UpsertHotel = ({ isOpen, onClose, hotel, refetch }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const { createHotel, loading: creating } = useCreateHotel();
  const { updateHotel, loading: updating } = useUpdateHotel();
  const { categories, loading: loadingCategories } = useGetHotelCategories();
  const { managers, loading: loadingManagers } = useGetHotelManagers();

  const { Option } = Select;

  const isEdit = !!hotel;

  // ✨ Load data khi edit
  useEffect(() => {
    if (isEdit && hotel) {
      form.setFieldsValue({
        name: hotel.name || "",
        categoryId: hotel.categoryId || 1,
        hotelManagerId: hotel.hotelManagerId || "",
        address: hotel.address || "",
        description: hotel.description || "",
        isActive: hotel.isActive ?? true,
      });

      if (hotel.imgUrl) {
        setFileList([
          {
            uid: "-1",
            name: "current_image",
            status: "done",
            url: hotel.imgUrl,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else if (isOpen) {
      form.resetFields();
      setFileList([]);
    }
  }, [hotel, isEdit, isOpen, form]);

  // ✨ Convert file to base64 để preview
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // ✨ Submit create/update
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: values.name,
        categoryId: values.categoryId,
        hotelManagerId: values.hotelManagerId, // đây là id của manager
        address: values.address,
        description: values.description,
        isActive: values.isActive,
        image: fileList[0]?.originFileObj || null,
      };

      if (isEdit) {
        await updateHotel({ id: hotel.id, ...payload });
        notification.success({
          message: "Hotel Updated",
          description: `Hotel "${values.name}" updated successfully.`,
        });
      } else {
        await createHotel(payload);
        notification.success({
          message: "Hotel Created",
          description: `Hotel "${values.name}" created successfully.`,
        });
      }

      refetch?.();
      onClose();
      form.resetFields();
      setFileList([]);
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Operation Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <Modal
        title={isEdit ? "Edit Hotel" : "Add New Hotel"}
        open={isOpen}
        maskClosable={false}
        onOk={handleSubmit}
        onCancel={() => {
          onClose();
          form.resetFields();
          setFileList([]);
        }}
        confirmLoading={creating || updating}
        okText={isEdit ? "Update" : "Add"}
        destroyOnClose
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Hotel Name"
            name="name"
            rules={[{ required: true, message: "Please enter hotel name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            {loadingCategories ? (
              <Spin />
            ) : (
              <Select
                placeholder="Select a category"
                dropdownStyle={{ maxHeight: 120, overflow: "auto" }}
              >
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label="Hotel Manager"
            name="hotelManagerId"
            rules={[
              { required: true, message: "Please select a hotel manager!" },
            ]}
          >
            {loadingManagers ? (
              <Spin />
            ) : (
              <Select
                placeholder="Select a manager"
                value={form.getFieldValue("hotelManagerId")} // đảm bảo controlled
                onChange={(value) =>
                  form.setFieldsValue({ hotelManagerId: value })
                }
              >
                {managers.map((mgr) => (
                  <Option key={mgr.id} value={mgr.id}>
                    {mgr.lastName} {mgr.firstName} {/* hiển thị full name */}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
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
            />
          </Form.Item>

          <Form.Item label="Active" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {fileList.length < 1 && (
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
          centered
        >
          <Image
            alt="Preview"
            src={previewImage}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Modal>
      )}
    </>
  );
};

export default UpsertHotel;
