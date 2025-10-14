"use client";

import { useState, useCallback } from "react";
import { PlusIcon } from "lucide-react";
import { Spin, Empty, notification } from "antd";
import { useGetHotelCategories } from "../../hooks/hotels/hotelCategories/useGetHotelCategories";
import { useDeleteHotelCategory } from "../../hooks/hotels/hotelCategories/useDeleteHotelCategory";
import HotelCategoryList from "../../components/hotels/hotelCategories/HotelCategoryList";
import UpsertHotelCategory from "../../components/hotels/hotelCategories/UpsertHotelCategory";

export default function HotelCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categories, loading, error, refetch } = useGetHotelCategories();
  const { deleteCategory } = useDeleteHotelCategory();

  const handleOpenModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (category) => {
    try {
      await deleteCategory({ id: category.id, name: category.name });
      notification.success({
        message: "Delete Successful",
        description: `Category "${category.name}" has been deleted successfully.`,
        placement: "topRight",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: "An error occurred while deleting the category.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Hotel Categories
          </h1>
          <p className="text-gray-600">
            Manage hotel category types and classifications
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">
          Failed to load categories. Please try again.
        </p>
      ) : categories?.length > 0 ? (
        <HotelCategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Empty description="No categories found" />
      )}

      <UpsertHotelCategory
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedCategory={selectedCategory}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
