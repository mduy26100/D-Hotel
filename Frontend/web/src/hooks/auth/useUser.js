import { useState } from "react";
import { getUserInfoAPI } from "../../api/auth/account";

export function useUser() {
  const [user, setUser] = useState(null);

  const fetchUser = async (token) => {
    const userInfo = await getUserInfoAPI(token);
    setUser(userInfo);
    return userInfo;
  };

  return { user, fetchUser, setUser };
}
