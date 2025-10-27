import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

const BookingTable = ({ bookings, onView, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    if (amount == null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
            Confirmed
          </span>
        );
      case "CheckedIn":
        return (
          <span className="px-2 py-1 text-xs bg-green-200 text-green-900 rounded">
            Checked In
          </span>
        );
      case "CheckedOut":
        return (
          <span className="px-2 py-1 text-xs bg-green-300 text-green-900 rounded">
            Checked Out
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
            Cancelled
          </span>
        );
      case "NoShow":
        return (
          <span className="px-2 py-1 text-xs bg-red-200 text-red-900 rounded">
            No Show
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rental Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
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
                      onClick={() => onView && onView(booking)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit && onEdit(booking)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(booking)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
