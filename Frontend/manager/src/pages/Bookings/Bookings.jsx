"use client";

import { useState } from "react";
import { Plus, DollarSign, Calendar, CreditCard } from "lucide-react";
import BookingList from "../../components/bookings/BookingList";
import { useBookings } from "../../hooks/bookings/useBookings";
import UpsertBooking from "../../components/bookings/UpsertBooking";
import ExportRevenue from "../../components/bookings/ExportRevenue";

export default function Bookings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const { bookings, loading, error, refetch } = useBookings();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Invoice Management
          </h1>
          <p className="text-gray-600 mt-1">Manage invoices and payments</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Create Invoice
        </button>
      </div>

      <div className="mb-6">
        <ExportRevenue bookings={bookings} />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(() => {
          const validBookings = bookings.filter(
            (b) => b.status !== "Cancelled" && b.status !== "NoShow"
          );

          const totalRevenue = validBookings.reduce(
            (sum, b) => sum + (b.rentalPrice || 0),
            0
          );

          const paid = validBookings
            .filter((b) =>
              ["Confirmed", "CheckedIn", "CheckedOut"].includes(b.status)
            )
            .reduce((sum, b) => sum + (b.rentalPrice || 0), 0);

          const unpaid = validBookings
            .filter((b) => b.status === "Pending")
            .reduce((sum, b) => sum + (b.rentalPrice || 0), 0);

          const formatCurrency = (amount) =>
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(amount);

          return (
            <>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(totalRevenue)}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Collected</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(paid)}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CreditCard className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(unpaid)}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <UpsertBooking
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        refetch={refetch}
        bookingData={selectedBooking} // Truyền booking data vào
      />

      <BookingList
        bookings={bookings}
        loading={loading}
        error={error}
        onEdit={handleEditBooking} // Truyền callback
      />
    </div>
  );
}
