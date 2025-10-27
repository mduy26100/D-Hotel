import React from "react";
import { Table, Tag } from "antd";

// Màu cho trạng thái
const statusColors = {
  confirmed: "green",
  pending: "orange",
  cancelled: "red",
};

const BookingTable = ({ bookings = [], onRowClick, setSelectedBookingId }) => {
  const columns = [
    {
      title: "Hotel",
      dataIndex: "hotelName",
      key: "hotelName",
      sorter: (a, b) => a.hotelName.localeCompare(b.hotelName),
    },
    {
      title: "Room Type",
      dataIndex: "roomTypeName",
      key: "roomTypeName",
      sorter: (a, b) => a.roomTypeName.localeCompare(b.roomTypeName),
    },
    {
      title: "Check-In",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
      sorter: (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate),
    },
    {
      title: "Check-Out",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (date) => new Date(date).toLocaleDateString("en-GB"),
      sorter: (a, b) => new Date(a.checkOutDate) - new Date(b.checkOutDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status?.toLowerCase()] || "blue"}>
          {status}
        </Tag>
      ),
      filters: [
        { text: "Confirmed", value: "confirmed" },
        { text: "Pending", value: "pending" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) =>
        record.status?.toLowerCase() === value.toLowerCase(),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
      <Table
        columns={columns}
        dataSource={bookings.map((b) => ({
          ...b,
          key: b.id,
          bookingId: b.id,
        }))}
        pagination={{ pageSize: 5 }}
        bordered
        onRow={(record) => ({
          onClick: () => {
            setSelectedBookingId(record.bookingId);
            onRowClick(record.bookingId);
          },
          style: { cursor: "pointer" },
        })}
        className="min-w-[600px]"
      />
    </div>
  );
};

export default BookingTable;
