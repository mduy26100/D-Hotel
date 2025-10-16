import React, { useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateRoomPurpose } from "../../../hooks/purposes/roomPurposes/useCreateRoomPurpose";
import { useUpdateRoomPurpose } from "../../../hooks/purposes/roomPurposes/useUpdateRoomPurpose";

const UpsertRoomPurpose = ({
  isModalOpen,
  handleCloseModal,
  selectedRoomPurpose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const { createRoomPurpose, loading: creating } = useCreateRoomPurpose();
  const { updateRoomPurpose, loading: updating } = useUpdateRoomPurpose();

  useEffect(() => {
    if (selectedRoomPurpose) {
      form.setFieldsValue({
        name: selectedRoomPurpose.name,
      });
    } else {
      form.resetFields();
    }
  }, [selectedRoomPurpose, form]);

  const handleSubmit = async (values) => {
    try {
      if (selectedRoomPurpose) {
        await updateRoomPurpose({
          id: selectedRoomPurpose.id,
          name: values.name,
        });
        notification.success({
          message: "Update Successful",
          description: `Room Purpose "${values.name}" has been updated successfully.`,
          placement: "topRight",
        });
      } else {
        await createRoomPurpose({
          name: values.name,
        });
        notification.success({
          message: "Create Successful",
          description: `Room Purpose "${values.name}" has been created successfully.`,
          placement: "topRight",
        });
      }

      form.resetFields();
      onSuccess?.();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving room purpose:", error);
      notification.error({
        message: "Operation Failed",
        description:
          "An error occurred while saving the room purpose. Please try again.",
        placement: "topRight",
      });
    }
  };

  return (
    <Modal
      title={selectedRoomPurpose ? "Edit Room Purpose" : "Add Room Purpose"}
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
          label="Room Purpose Name"
          name="name"
          rules={[
            { required: true, message: "Please enter room purpose name!" },
          ]}
        >
          <Input placeholder="Enter room purpose name" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={creating || updating}
              className="flex-1"
            >
              {selectedRoomPurpose ? "Update" : "Create"}
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

export default UpsertRoomPurpose;
