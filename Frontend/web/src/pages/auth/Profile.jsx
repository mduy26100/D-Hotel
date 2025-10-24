"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/auth/useUser";
import { useUpdateUser } from "../../hooks/auth/useUpdateUser";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Upload, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { user, refetch, loading: userLoading } = useUser(token);
  const { updateUser, loading: updateLoading } = useUpdateUser();

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    avatarImage: null,
  });

  const [avatarPreview, setAvatarPreview] = useState([]);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  // Khi user được fetch xong, fill form
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setProfileForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      avatarImage: null,
    });

    setAvatarPreview([]); // preview chỉ để show file mới trong form
    setLoading(false);
  }, [user]);

  // Xử lý Upload avatar trong form
  const handleUploadChange = ({ fileList }) => {
    const latestFile = fileList.slice(-1);
    setAvatarPreview(latestFile);

    if (latestFile.length > 0 && latestFile[0].originFileObj) {
      setProfileForm((prev) => ({
        ...prev,
        avatarImage: latestFile[0].originFileObj,
      }));
    } else {
      setProfileForm((prev) => ({ ...prev, avatarImage: null }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(profileForm, () => refetch());
      setAvatarPreview([]); // xóa preview sau khi submit thành công
    } catch (error) {
      console.error("Update profile failed", error);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Password confirmation does not match");
      return;
    }
    alert("Password changed (static demo)");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (loading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-red-500">No user found. Please login.</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        <p className="text-gray-500">Manage your account information</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Personal Information
          </h3>
          <img
            src={user.avatarUrl || "/placeholder.svg"}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-2 border-gray-200 object-cover"
          />
          <div className="w-full space-y-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">First Name:</span>
              <span className="text-gray-800">{user.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Last Name:</span>
              <span className="text-gray-800">{user.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Username:</span>
              <span className="text-gray-800">{user.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">
                {user.phoneNumber || "Not updated"}
              </span>
            </div>
          </div>
        </div>

        {/* Update Forms */}
        <div className="space-y-6">
          {/* Update Profile Form */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Update Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={profileForm.firstName}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="First Name"
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Last Name"
                  required
                />
              </div>
              <Input
                label="Phone Number"
                name="phoneNumber"
                value={profileForm.phoneNumber}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="Phone Number"
              />

              {/* Antd Upload */}
              <div>
                <span className="block mb-1 font-medium text-gray-600">
                  Avatar
                </span>
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={avatarPreview}
                  onChange={handleUploadChange}
                  onRemove={() => {
                    setProfileForm((prev) => ({ ...prev, avatarImage: null }));
                    setAvatarPreview([]);
                  }}
                  beforeUpload={() => false} // prevent auto upload
                >
                  {avatarPreview.length >= 1 ? null : <PlusOutlined />}
                </Upload>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={updateLoading}
              >
                Save Changes
              </Button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <Button type="submit" variant="primary" className="w-full">
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
