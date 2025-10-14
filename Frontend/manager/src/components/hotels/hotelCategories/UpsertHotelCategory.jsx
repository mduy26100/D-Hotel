import React, { useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateHotelCategory } from "../../../hooks/hotels/hotelCategories/useCreateHotelCategory";
import { useUpdateHotelCategory } from "../../../hooks/hotels/hotelCategories/useUpdateHotelCategory";

const UpsertHotelCategory = ({
  isModalOpen,
  handleCloseModal,
  selectedCategory,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { createCategory, loading: creating } = useCreateHotelCategory();
  const { updateCategory, loading: updating } = useUpdateHotelCategory();

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        name: selectedCategory.name,
      });
    } else {
      form.resetFields();
    }
  }, [selectedCategory, form]);

  const handleSubmit = async (values) => {
    try {
      if (selectedCategory) {
        await updateCategory({
          id: selectedCategory.id,
          name: values.name,
        });
        notification.success({
          message: "Update Successful",
          description: `Category "${values.name}" has been updated successfully.`,
          placement: "topRight",
        });
      } else {
        await createCategory({
          name: values.name,
        });
        notification.success({
          message: "Create Successful",
          description: `Category "${values.name}" has been created successfully.`,
          placement: "topRight",
        });
      }

      form.resetFields();
      onSuccess?.();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving category:", error);
      notification.error({
        message: "Operation Failed",
        description:
          "An error occurred while saving the category. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      title={selectedCategory ? "Edit Category" : "Add Category"}
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
              className="flex-1"
            >
              {selectedCategory ? "Update" : "Create"}
            </Button>
            <Button onClick={handleCloseModal} className="flex-1">
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpsertHotelCategory;
