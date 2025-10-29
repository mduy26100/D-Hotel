"use client";
import React, { useRef } from "react";
import { Spin, Empty } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels = [], loading = false, error = null }) => {
  const scrollRef = useRef(null);

  // ✅ Đảm bảo hotels luôn là array
  const safeHotels = Array.isArray(hotels) ? hotels : [];
  const featuredHotels = safeHotels.slice(0, 4);

  // ⚙️ Handle horizontal scroll
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
        {/* 🏨 Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🌟 Featured Hotels
        </h2>

        {/* ⏳ Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Spin size="large" />
            <p className="text-gray-600 font-medium">Loading data...</p>
          </div>
        )}

        {/* ❌ Error */}
        {!loading && error && (
          <div className="text-center text-red-500 py-10">{error}</div>
        )}

        {/* ❌ No data */}
        {!loading && !error && featuredHotels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Empty description="No hotels available" />
          </div>
        )}

        {/* ✅ Horizontal hotel list */}
        {!loading && !error && featuredHotels.length > 0 && (
          <div className="relative">
            {/* Left button */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-7 h-7 text-gray-700" />
            </button>

            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide gap-6 scroll-smooth px-2 py-2"
            >
              {featuredHotels.map((hotel) => (
                <div key={hotel.id} className="flex-shrink-0 w-80 h-full">
                  <div className="h-full flex">
                    <HotelCard hotel={hotel} />
                  </div>
                </div>
              ))}
            </div>

            {/* Right button */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-7 h-7 text-gray-700" />
            </button>
          </div>
        )}

        {/* 👇 View All button */}
        {!loading && !error && featuredHotels.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/hotels">
              <button className="bg-[#233E8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1d3272] transition">
                View All Hotels →
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotelList;
