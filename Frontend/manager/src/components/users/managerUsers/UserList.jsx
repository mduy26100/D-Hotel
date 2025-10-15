import React, { useState, useMemo } from "react";
import UserTable from "./UserTable";
import { Select } from "antd";
import SearchBox from "../../ui/SearchBox";

const { Option } = Select;

const UserList = ({ users, loading, error, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const filteredUsers = useMemo(() => {
    let filtered = users || [];

    // 🔍 Lọc theo từ khóa
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          u.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🎯 Lọc theo role
    if (filterRole) {
      filtered = filtered.filter((u) => u.roles?.includes(filterRole));
    }

    return filtered;
  }, [users, searchTerm, filterRole]);

  if (loading)
    return (
      <p className="text-gray-500 text-center py-6">Loading user list...</p>
    );

  if (error)
    return (
      <p className="text-red-500 text-center py-6">
        Failed to load data: {error.message}
      </p>
    );

  return (
    <div className="space-y-4">
      {/* 🔹 Thanh tìm kiếm và bộ lọc */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Ô tìm kiếm */}
        <div className="w-full sm:flex-1">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, username, or email..."
            className="shadow-none border border-gray-200 hover:border-gray-300 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Bộ lọc Role */}
        <div className="flex items-center gap-3">
          <label className="text-gray-600 text-sm font-medium">Role:</label>
          <Select
            value={filterRole || "All"}
            onChange={(value) => setFilterRole(value === "All" ? "" : value)}
            className="min-w-[200px]"
            style={{
              borderRadius: "12px",
              borderColor: "#e5e7eb",
            }}
            dropdownStyle={{
              borderRadius: "12px",
            }}
          >
            <Option value="All">All Users</Option>
            <Option value="User">User</Option>
            <Option value="Hotel_Manager">Hotel Manager</Option>
            <Option value="Hotel_Staff">Hotel Staff</Option>
          </Select>
        </div>
      </div>

      {/* 🔹 Bảng hiển thị */}
      {filteredUsers.length ? (
        <UserTable users={filteredUsers} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <p className="text-gray-500 text-center py-6">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
