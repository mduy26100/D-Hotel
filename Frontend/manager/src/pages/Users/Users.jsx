// src/pages/Users/Users.jsx
import React, { useState } from "react";
import { useGetAllUsers } from "../../hooks/manager/useGetAllUsers";
import UserList from "../../components/users/managerUsers/UserList";
import { Plus } from "lucide-react";
import UpsertUser from "../../components/users/managerUsers/UpsertUser";

export default function Users() {
  const { users, loading, error, refetch } = useGetAllUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">
            Hotel user information management
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add user
        </button>
      </div>
      <UpsertUser
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        onSuccess={() => {
          handleCloseModal();
          refetch();
        }}
      />
      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={() => {}}
      />
    </div>
  );
}
