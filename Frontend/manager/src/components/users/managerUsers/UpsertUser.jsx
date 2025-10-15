import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  Row,
  Col,
  notification,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRegister } from "../../../hooks/auth/auth/useRegister";

const { Option } = Select;

const UpsertUser = ({ open, onClose, selectedUser, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const { register, loading } = useRegister();
  const isEdit = !!selectedUser;

  useEffect(() => {
    if (isEdit && selectedUser) {
      form.setFieldsValue({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        phoneNumber: selectedUser.phoneNumber,
        role: selectedUser.roles?.[0] || "",
      });

      if (selectedUser.avatarUrl) {
        setFileList([
          {
            uid: "-1",
            name: "current_image",
            status: "done",
            url: selectedUser.avatarUrl,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [selectedUser, form, isEdit]);

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

  const handleSubmit = async (values) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: values.role,
        avatarFile: fileList[0]?.originFileObj || null,
      };

      if (!isEdit) {
        await register(payload);
        notification.success({
          message: "User Created Successfully",
          description: `${values.firstName} ${values.lastName} has been added.`,
          placement: "topRight",
        });
        onSuccess?.();
      } else {
        console.log("Edit mode: payload (not submitting yet)", payload);
      }

      onClose();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Operation Failed",
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <>
      <Modal
        title={isEdit ? "User Details" : "Add New User"}
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ role: "Hotel_Manager" }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter first name!" },
                ]}
              >
                <Input placeholder="Enter first name" disabled={isEdit} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input placeholder="Enter last name" disabled={isEdit} />
              </Form.Item>
            </Col>
          </Row>

          {!isEdit && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Username"
                    name="userName"
                    rules={[
                      { required: true, message: "Please enter username!" },
                    ]}
                  >
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email!" },
                      { type: "email", message: "Invalid email format!" },
                    ]}
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter password!" },
                    ]}
                  >
                    <Input.Password placeholder="Enter password" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm password!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Confirm password" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter phone number!" },
                ]}
              >
                <Input placeholder="Enter phone number" disabled={isEdit} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select placeholder="Select a role" disabled={isEdit}>
                  <Option value="Hotel_Manager">Hotel Manager</Option>
                  <Option value="Hotel_Staff">Hotel Staff</Option>
                  <Option value="User">User</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Avatar" name="avatarFile">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {fileList.length < 1 && (
                    <div>
                      <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end mt-4 gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading} disabled>
              {isEdit ? "Update (Disabled)" : "Create"}
            </Button>
          </div>
        </Form>
      </Modal>

      {previewImage && (
        <Modal
          open={previewOpen}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
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

export default UpsertUser;
