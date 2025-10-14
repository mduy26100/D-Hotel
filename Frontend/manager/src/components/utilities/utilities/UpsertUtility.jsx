import { Modal, Input, Upload, Button, Form, notification, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useCreateUtility } from "../../../hooks/utilites/utilities/useCreateUtility";
import { useUpdateUtility } from "../../../hooks/utilites/utilities/useUpdateUtility";

const UpsertUtility = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedUtility,
    setSelectedUtility,
    refetch,
  } = props;

  const { createUtility, loading: creating } = useCreateUtility();
  const { updateUtility, loading: updating } = useUpdateUtility();

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen && selectedUtility) {
      form.setFieldsValue({
        name: selectedUtility.name,
      });
      if (selectedUtility.iconUrl) {
        setFileList([
          {
            uid: "-1",
            name: "current_image",
            status: "done",
            url: selectedUtility.iconUrl,
          },
        ]);
      }
    } else if (isModalOpen && !selectedUtility) {
      form.resetFields();
      setFileList([]);
    }
  }, [isModalOpen, selectedUtility, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        name: values.name,
        image: fileList[0]?.originFileObj || null,
      };

      if (selectedUtility) {
        // 🛠 Update
        await updateUtility({ id: selectedUtility.id, ...formData });
        notification.success({
          message: "Success",
          description: "Utility has been updated successfully!",
        });
        refetch();
      } else {
        // ➕ Create
        await createUtility(formData);
        notification.success({
          message: "Success",
          description: "Utility has been added successfully!",
        });
        refetch();
      }

      setIsModalOpen(false);
      setSelectedUtility(null);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to save utility. Please try again!",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUtility(null);
    form.resetFields();
    setFileList([]);
  };

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

  return (
    <>
      <Modal
        title={selectedUtility ? "Edit Utility" : "Add New Utility"}
        open={isModalOpen}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={creating || updating}
        okText={selectedUtility ? "Update" : "Add"}
        cancelText="Cancel"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Utility Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the utility name!" },
            ]}
          >
            <Input placeholder="Enter utility name..." />
          </Form.Item>

          <Form.Item label="Image" name="image">
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

export default UpsertUtility;
