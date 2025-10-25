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

    setAvatarPreview([]);
    setLoading(false);
  }, [user]);

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
      setAvatarPreview([]);
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
    alert("Password changed (demo)");
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
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-3xl shadow-xl">
      {/* Header */}
      <div className="space-y-2 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#003B95] drop-shadow-lg">
          Profile
        </h2>
        <p className="text-gray-600 md:text-lg">
          Manage your account information with royal elegance
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center space-y-6 border border-[#003B95]/30 hover:shadow-[#003B95]/40 transition-all duration-500">
          <h3 className="text-2xl font-semibold text-[#003B95]">
            Personal Information
          </h3>
          <img
            src={user.avatarUrl || "/placeholder.svg"}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-[#003B95] object-cover shadow-lg"
          />
          <div className="w-full space-y-3 mt-4">
            {[
              ["First Name", user.firstName],
              ["Last Name", user.lastName],
              ["Username", user.userName],
              ["Email", user.email],
              ["Phone", user.phoneNumber || "Not updated"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="font-medium text-gray-600">{label}:</span>
                <span className="text-gray-800 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Update Forms */}
        <div className="space-y-6">
          {/* Update Profile Form */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-[#003B95]/30 hover:shadow-[#003B95]/40 transition-all duration-500">
            <h3 className="text-2xl font-semibold text-[#003B95]">
              Update Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-4">
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
                <span className="block mb-2 font-medium text-gray-600">
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
                  beforeUpload={() => false}
                  className="hover:border-[#003B95]"
                >
                  {avatarPreview.length >= 1 ? null : (
                    <div className="flex flex-col items-center justify-center text-[#003B95]">
                      <PlusOutlined />
                      <span className="mt-1 text-sm">Upload</span>
                    </div>
                  )}
                </Upload>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[#003B95] hover:bg-[#002a70] text-white font-semibold shadow-lg"
                loading={updateLoading}
              >
                Save Changes
              </Button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-[#003B95]/30 hover:shadow-[#003B95]/40 transition-all duration-500">
            <h3 className="text-2xl font-semibold text-[#003B95]">
              Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
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
              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[#003B95] hover:bg-[#002a70] text-white font-semibold shadow-lg"
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="text-[#003B95] hover:underline font-semibold text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
