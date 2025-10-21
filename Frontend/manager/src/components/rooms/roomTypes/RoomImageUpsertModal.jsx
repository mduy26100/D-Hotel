"use client";

import React, { useState } from "react";
import { Modal, Upload, Image, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateRoomTypeImages } from "../../../hooks/rooms/roomTypeImages/useCreateRoomTypeImages";
import { useUpdateRoomTypeImage } from "../../../hooks/rooms/roomTypeImages/useUpdateRoomTypeImage";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const RoomImageUpsertModal = ({
  open,
  onClose,
  mode = "create",
  roomTypeId,
  imageToUpdate = null,
  onSuccess,
}) => {
  const { createImages, loading: creating } = useCreateRoomTypeImages();
  const { updateImage, loading: updating } = useUpdateRoomTypeImage();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(
    mode === "update" && imageToUpdate
      ? [
          {
            uid: imageToUpdate.id.toString(),
            name: "current_image",
            status: "done",
            url: imageToUpdate.imgUrl,
          },
        ]
      : []
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview)
      file.preview = await getBase64(file.originFileObj);
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async () => {
    try {
      const files = fileList
        .map((file) => file.originFileObj || file)
        .filter(Boolean);

      if (files.length === 0) {
        notification.warning({
          message: "Missing Images!",
          description: "Please select at least one image to upload.",
          placement: "topRight",
        });
        return;
      }

      if (mode === "create") {
        await createImages({ roomTypeId, files });
        notification.success({
          message: "Upload Successful 🎉",
          description: `${files.length} image(s) have been uploaded for room type.`,
          placement: "topRight",
        });
      } else if (mode === "update" && imageToUpdate) {
        await updateImage({
          id: imageToUpdate.id,
          roomTypeId,
          image: files[0],
        });
        notification.success({
          message: "Update Successful ✅",
          description: `The image for room type has been updated successfully.`,
          placement: "topRight",
        });
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("Error uploading room type images:", err);
      notification.error({
        message: "Upload Failed ❌",
        description:
          "An error occurred while uploading the image(s). Please try again.",
        placement: "topRight",
      });
    }
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      className="flex flex-col items-center text-gray-500"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal
      title={mode === "create" ? "Upload Room Images" : "Update Room Image"}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={creating || updating}
      okText={mode === "create" ? "Upload" : "Update"}
      cancelText="Cancel"
      width={700}
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Không upload tự động
        multiple={mode === "create"}
      >
        {mode === "create"
          ? fileList.length >= 8
            ? null
            : uploadButton
          : fileList.length >= 1
          ? null
          : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Modal>
  );
};

export default RoomImageUpsertModal;
