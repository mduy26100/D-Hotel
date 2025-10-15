"use client";

import React, { useState } from "react";
import { Modal, Tag, Spin, Divider, Button } from "antd";
import {
  MapPin,
  Info,
  CheckCircle2,
  XCircle,
  Layers,
  User,
  Sparkles,
} from "lucide-react";
import { useHotelDetails } from "../../../hooks/hotels/hotels/useHotelDetails";
import UpsertHotelUtilitiesModal from "./UpsertHotelUtilitiesModal";

const HotelDetailsModal = ({ id, isOpen, onClose }) => {
  const { hotel, loading, error, refetch } = useHotelDetails(id);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={900}
        centered
        destroyOnClose
        bodyStyle={{
          background: "#fafafa",
          padding: "2rem 2.5rem",
          borderRadius: "1rem",
        }}
        title={
          hotel && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={hotel?.imgUrl}
                  alt={hotel?.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {hotel?.name}
                    </h2>
                    {hotel?.isActive ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-full">
                        <XCircle size={12} /> Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {hotel?.address || "No address"}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      >
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8 font-medium">
            Failed to load hotel details.
          </div>
        ) : (
          hotel && (
            <div className="space-y-8">
              {/* Description */}
              <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <Info size={18} /> Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {hotel?.description || "No description available."}
                </p>
              </section>

              {/* Info grid */}
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Category */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                  <div className="mx-auto mb-2 p-2 bg-blue-50 rounded-lg">
                    <Layers size={20} className="text-blue-600" />
                  </div>
                  <h4 className="text-sm text-gray-500 mb-1 font-medium">
                    Category
                  </h4>
                  <span className="text-base font-semibold text-gray-700">
                    {hotel?.category?.name || "Unknown"}
                  </span>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                  <div className="mx-auto mb-2 p-2 bg-pink-50 rounded-lg">
                    <MapPin size={20} className="text-pink-600" />
                  </div>
                  <h4 className="text-sm text-gray-500 mb-1 font-medium">
                    Location
                  </h4>
                  <span className="text-base font-semibold text-gray-700">
                    {hotel?.location?.name || "Unknown"}
                  </span>
                </div>

                {/* Manager */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-center text-center">
                  <div className="mx-auto mb-2 p-2 bg-purple-50 rounded-lg">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <h4 className="text-sm text-gray-500 mb-1 font-medium">
                    Manager ID
                  </h4>
                  <span className="text-sm font-medium text-gray-700 break-all">
                    {hotel?.hotelManagerId}
                  </span>
                </div>
              </section>

              <Divider className="!my-2" />

              {/* Utilities */}
              <section>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                  <Sparkles size={18} className="text-yellow-500" /> Utilities
                </h3>

                {hotel?.utilities?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {hotel.utilities.map((utility) => (
                      <div
                        key={utility.id}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {utility.iconUrl && (
                            <img
                              src={utility.iconUrl}
                              alt={utility.name}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                            />
                          )}
                          <h4 className="text-gray-800 font-semibold text-base">
                            {utility.name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {utility.utilityItems?.map((item) => (
                            <Tag
                              key={item.id}
                              color="purple"
                              className="rounded-lg px-3 py-1 text-sm"
                            >
                              {item.name}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    No utilities found.
                  </div>
                )}

                {/* Button mở Add Utilities Modal */}
                <div className="mt-6 text-right">
                  <Button
                    type="primary"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    Add Utilities
                  </Button>
                </div>
              </section>
            </div>
          )
        )}
      </Modal>

      {hotel && (
        <UpsertHotelUtilitiesModal
          hotel={hotel}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default HotelDetailsModal;
