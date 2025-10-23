"use client";
import React, { useRef } from "react";
import { Spin, Empty } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react"; // ✅ Dùng icon từ lucide-react
import { Link, useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels, loading, error }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const featuredHotels = hotels?.slice(0, 8) || []; // 👉 Lấy 8 khách sạn nổi bật

  // ⚙️ Xử lý cuộn trái/phải
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount =
        direction === "left"
          ? -scrollRef.current.offsetWidth / 1.2
          : scrollRef.current.offsetWidth / 1.2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* 🏨 Tiêu đề */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🌟 Khách sạn nổi bật
        </h2>

        {/* ⏳ Trạng thái Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Spin size="large" />
            <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* ❌ Lỗi hoặc không có dữ liệu */}
        {!loading && error && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {!loading && !error && featuredHotels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Empty description="Không có khách sạn nào" />
          </div>
        )}

        {/* ✅ Danh sách khách sạn ngang */}
        {!loading && !error && featuredHotels.length > 0 && (
          <div className="relative">
            {/* Nút trái */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft className="text-icon-xxl w-7 h-7 text-gray-700" />
            </button>

            {/* Container cuộn ngang */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 scroll-smooth px-2"
            >
              {featuredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex-shrink-0 w-80 transform hover:scale-105 transition-transform duration-300"
                >
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>

            {/* Nút phải */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronRight className="text-icon-xxl w-7 h-7 text-gray-700" />
            </button>
          </div>
        )}

        {/* 👇 Nút xem tất cả */}
        {!loading && !error && featuredHotels.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/hotels">
              <button className="bg-[#233E8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1d3272] transition">
                Xem tất cả khách sạn →
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelList;
