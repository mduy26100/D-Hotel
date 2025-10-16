import React, { useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateTravelPurpose } from "../../../hooks/purposes/travelPurposes/useCreateTravelPurpose";
import { useUpdateTravelPurpose } from "../../../hooks/purposes/travelPurposes/useUpdateTravelPurpose";

const UpsertTravelPurpose = ({
  isModalOpen,
  handleCloseModal,
  selectedTravelPurpose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { createTravelPurpose, loading: creating } = useCreateTravelPurpose();
  const { updateTravelPurpose, loading: updating } = useUpdateTravelPurpose();

  useEffect(() => {
    if (selectedTravelPurpose) {
      form.setFieldsValue({
        name: selectedTravelPurpose.name,
      });
    } else {
      form.resetFields();
    }
  }, [selectedTravelPurpose, form]);

  const handleSubmit = async (values) => {
    try {
      if (selectedTravelPurpose) {
        await updateTravelPurpose({
          id: selectedTravelPurpose.id,
          name: values.name,
        });
        notification.success({
          message: "Update Successful",
          description: `Travel Purpose "${values.name}" has been updated successfully.`,
          placement: "topRight",
        });
      } else {
        await createTravelPurpose({
          name: values.name,
        });
        notification.success({
          message: "Create Successful",
          description: `Travel Purpose "${values.name}" has been created successfully.`,
          placement: "topRight",
        });
      }

      form.resetFields();
      onSuccess?.();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving travel purpose:", error);
      notification.error({
        message: "Operation Failed",
        description:
          "An error occurred while saving the travel purpose. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      title={
        selectedTravelPurpose ? "Edit Travel Purpose" : "Add Travel Purpose"
      }
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
          label="Travel Purpose Name"
          name="name"
          rules={[
            { required: true, message: "Please enter travel purpose name!" },
          ]}
        >
          <Input placeholder="Enter travel purpose name" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
              className="flex-1"
            >
              {selectedTravelPurpose ? "Update" : "Create"}
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

export default UpsertTravelPurpose;
