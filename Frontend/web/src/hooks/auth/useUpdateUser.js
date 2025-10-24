import { useState } from "react";
import { notification } from "antd";
import { updateUserAPI } from "../../api/auth/account";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);

  const updateUser = async (data, onSuccess) => {
    setLoading(true);
    try {
      const res = await updateUserAPI(data);
      notification.success({
        message: "Profile Updated",
        description: "Your account information has been successfully updated.",
      });
      if (onSuccess) onSuccess(res);
      return res;
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description:
          error.response?.data?.message ||
          "An error occurred while updating your profile.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading };
};
