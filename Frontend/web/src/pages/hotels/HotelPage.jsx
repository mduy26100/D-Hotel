"use client";

import { useEffect, useState } from "react";
import HotelCard from "../../components/hotels/HotelCard";
import { useHotels } from "../../hooks/hotels/hotels/useHotels";

function HotelsPage() {
  const { hotels = [], loading, error } = useHotels();

  const [filter, setFilter] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
    location: "",
    isActive: "",
    utilities: [],
    rating: 0,
  });

  const [showFilter, setShowFilter] = useState(false); // điều khiển off-canvas trên mobile

  // khóa body scroll khi filter mở (ngăn layout bị dịch chuyển)
  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter]);

  const filteredHotels = (hotels || []).filter((hotel) => {
    let pass = true;
    if (filter.category)
      pass = pass && hotel.category?.name === filter.category;
    if (filter.minPrice) pass = pass && hotel.price >= filter.minPrice;
    if (filter.maxPrice) pass = pass && hotel.price <= filter.maxPrice;
    if (filter.location)
      pass = pass && hotel.location?.name === filter.location;
    if (filter.isActive)
      pass =
        pass &&
        ((filter.isActive === "active" && hotel.isActive) ||
          (filter.isActive === "inactive" && !hotel.isActive));
    if (filter.utilities.length > 0)
      pass =
        pass &&
        filter.utilities.every((u) =>
          hotel.utilities?.some((util) => util.name === u)
        );
    if (filter.rating) pass = pass && hotel.rating >= filter.rating;
    return pass;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#003B95]"></div>
          <p className="mt-4 text-[#003B95] font-semibold">Đang tải...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center text-red-600 font-semibold">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24 pb-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#003B95] mb-2">
              🏨 Khách sạn
            </h1>
            <p className="text-gray-600 text-lg">
              Khám phá những khách sạn tuyệt vời
            </p>
          </div>

          {/* Nút mở bộ lọc - chỉ hiện trên mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden bg-[#003B95] text-white px-4 py-2 rounded-xl shadow hover:bg-blue-800 transition flex items-center gap-2"
              aria-expanded={showFilter}
              aria-controls="mobile-filter-panel"
            >
              <span>🔍</span> Bộ lọc
            </button>

            {/* (Optional) bạn có thể thêm nút sắp xếp / view toggle ở đây */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - hiển thị trên desktop (md+) */}
          <aside className="hidden md:block md:col-span-1 sticky top-24 h-fit">
            <FilterPanel
              filter={filter}
              setFilter={setFilter}
              showClose={false}
              onClose={() => {}}
            />
          </aside>

          {/* Main content */}
          <main className="md:col-span-2 lg:col-span-2">
            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-12 text-center">
                <p className="text-gray-500 text-lg font-medium">
                  Không có khách sạn nào phù hợp với bộ lọc của bạn.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} vertical />
                ))}
              </div>
            )}
          </main>

          {/* Right sidebar / map - ẩn trên mobile */}
          <aside className="hidden md:block md:col-span-1 lg:col-span-1 sticky top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#003B95] to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🗺️</span> Bản đồ
                </h2>
              </div>

              <div className="p-6">
                <div className="h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
                  <div className="text-center">
                    <p className="text-gray-600 font-semibold">
                      Bản đồ khách sạn
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Sắp có cập nhật
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Off-canvas Filter Panel + Overlay */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          showFilter
            ? "opacity-60 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black`}
        aria-hidden={!showFilter}
        onClick={() => setShowFilter(false)}
      />

      {/* Panel */}
      <div
        id="mobile-filter-panel"
        className={`fixed top-0 left-0 z-50 h-full w-full md:hidden transform transition-transform duration-300 ${
          showFilter ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full max-w-[92%] w-full sm:max-w-sm bg-white shadow-2xl rounded-r-2xl overflow-hidden">
          <FilterPanel
            filter={filter}
            setFilter={setFilter}
            showClose={true}
            onClose={() => setShowFilter(false)}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * FilterPanel component - chứa toàn bộ nội dung filter của bạn
 * Props:
 *  - filter, setFilter
 *  - showClose: nếu true thì hiện nút đóng (dùng cho mobile)
 *  - onClose: callback đóng panel (mobile)
 */
function FilterPanel({
  filter,
  setFilter,
  showClose = false,
  onClose = () => {},
}) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-blue-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003B95] to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-2xl shadow-sm">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 tracking-wide">
          <span>🔍</span> Bộ lọc
        </h2>
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Đóng bộ lọc"
            className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg hover:bg-opacity-30 transition-all duration-200 shadow-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div
        className="flex-1 px-6 py-6 space-y-6 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 120px)", // trừ thêm phần header và footer
          scrollbarGutter: "stable", // tránh layout shift khi có thanh cuộn
        }}
      >
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Danh mục
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Resort">Resort</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Vị trí
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.location}
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Giá (VNĐ)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Tối thiểu"
              className="w-1/2 border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
              value={filter.minPrice}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  minPrice: Number.parseInt(e.target.value) || 0,
                })
              }
            />
            <input
              type="number"
              placeholder="Tối đa"
              className="w-1/2 border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
              value={filter.maxPrice}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  maxPrice: Number.parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Trạng thái
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.isActive}
            onChange={(e) => setFilter({ ...filter, isActive: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Tạm ngưng</option>
          </select>
        </div>

        {/* Utilities */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-3">
            Tiện ích
          </label>
          <div className="space-y-2">
            {["Wifi", "Bể bơi", "Gym", "Spa"].map((u) => (
              <label
                key={u}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={filter.utilities.includes(u)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...filter.utilities, u]
                      : filter.utilities.filter((x) => x !== u);
                    setFilter({ ...filter, utilities: updated });
                  }}
                  className="w-4 h-4 accent-[#003B95] cursor-pointer"
                />
                <span className="text-gray-700 font-medium">{u}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Đánh giá tối thiểu
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.rating}
            onChange={(e) =>
              setFilter({
                ...filter,
                rating: Number.parseInt(e.target.value) || 0,
              })
            }
          >
            <option value={0}>Tất cả</option>
            <option value={1}>⭐ trở lên</option>
            <option value={2}>⭐⭐ trở lên</option>
            <option value={3}>⭐⭐⭐ trở lên</option>
            <option value={4}>⭐⭐⭐⭐ trở lên</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        {/* Footer buttons: Reset / Áp dụng (nếu muốn) */}
        <div className="pt-2 pb-8">
          <div className="flex gap-3">
            <button
              onClick={() =>
                setFilter({
                  category: "",
                  minPrice: 0,
                  maxPrice: 0,
                  location: "",
                  isActive: "",
                  utilities: [],
                  rating: 0,
                })
              }
              className="flex-1 border-2 border-blue-200 text-[#003B95] rounded-lg px-4 py-3 font-medium hover:bg-blue-50 transition"
            >
              Đặt lại
            </button>

            {/* Nếu muốn có nút Áp dụng (apply) để đóng panel trên mobile */}
            <button
              onClick={() => {
                // chỉ cần đóng panel, filter đã áp dụng realtime
                if (typeof window !== "undefined") {
                  // nếu panel đang được dùng trong mobile, gọi onClose nếu truyền
                }
              }}
              className="flex-1 bg-[#003B95] text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;
