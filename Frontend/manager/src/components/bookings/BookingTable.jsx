import React, { useState } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Pagination } from "antd";
import "antd/dist/reset.css"; // import css của antd

const BookingTable = ({ bookings, onView, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 10 bản ghi 1 trang

  // Hàm format tiền
  const formatCurrency = (amount) => {
    if (amount == null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Hàm lấy badge trạng thái
  const getStatusBadge = (status) => {
    const baseStyle = "px-2 py-1 text-xs rounded font-semibold";
    switch (status) {
      case "Pending":
        return (
          <span className={`${baseStyle} bg-yellow-100 text-yellow-800`}>
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className={`${baseStyle} bg-green-100 text-green-800`}>
            Confirmed
          </span>
        );
      case "CheckedIn":
        return (
          <span className={`${baseStyle} bg-green-200 text-green-900`}>
            Checked In
          </span>
        );
      case "CheckedOut":
        return (
          <span className={`${baseStyle} bg-green-300 text-green-900`}>
            Checked Out
          </span>
        );
      case "Cancelled":
        return (
          <span className={`${baseStyle} bg-red-100 text-red-800`}>
            Cancelled
          </span>
        );
      case "NoShow":
        return (
          <span className={`${baseStyle} bg-red-200 text-red-900`}>
            No Show
          </span>
        );
      default:
        return (
          <span className={`${baseStyle} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentBookings = bookings.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Booking ID",
                "Guest",
                "Hotel",
                "Room Type",
                "Rental Price",
                "Status",
                "Actions",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No bookings available
                </td>
              </tr>
            ) : (
              currentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.invoiceNumber || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.guestName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.hotelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.roomTypeName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(booking.rentalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit?.(booking)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-end p-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={bookings.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default BookingTable;
