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

  const [showFilter, setShowFilter] = useState(false);

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
          <p className="mt-4 text-[#003B95] font-semibold">Loading...</p>
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
              🏨 Hotels
            </h1>
            <p className="text-gray-600 text-lg">
              Explore amazing hotels worldwide
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden bg-[#003B95] text-white px-4 py-2 rounded-xl shadow hover:bg-blue-800 transition flex items-center gap-2"
              aria-expanded={showFilter}
              aria-controls="mobile-filter-panel"
            >
              <span>🔍</span> Filters
            </button>
          </div>
        </div>

        {/* Layout grid 3/7 */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          {/* Filter section (3/10) */}
          <aside className="hidden md:block md:col-span-3 sticky top-24 h-fit">
            <FilterPanel
              filter={filter}
              setFilter={setFilter}
              showClose={false}
              onClose={() => {}}
            />
          </aside>

          {/* Hotel cards (7/10) */}
          <main className="md:col-span-7">
            {filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-12 text-center">
                <p className="text-gray-500 text-lg font-medium">
                  No hotels match your current filters.
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
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          showFilter
            ? "opacity-60 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black`}
        aria-hidden={!showFilter}
        onClick={() => setShowFilter(false)}
      />

      {/* Mobile Filter Panel */}
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
          <span>🔍</span> Filters
        </h2>
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg hover:bg-opacity-30 transition-all duration-200 shadow-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 px-6 py-6 space-y-6 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 120px)",
          scrollbarGutter: "stable",
        }}
      >
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Category
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Resort">Resort</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Location
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.location}
            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
          >
            <option value="">All</option>
            <option value="Hà Nội">Hanoi</option>
            <option value="Hồ Chí Minh">Ho Chi Minh City</option>
            <option value="Đà Nẵng">Da Nang</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-2">
            Price (VND)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
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
              placeholder="Max"
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
            Status
          </label>
          <select
            className="w-full border-2 border-blue-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:border-[#003B95] focus:ring-2 focus:ring-blue-200 transition"
            value={filter.isActive}
            onChange={(e) => setFilter({ ...filter, isActive: e.target.value })}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Utilities */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-3">
            Utilities
          </label>
          <div className="space-y-2">
            {["Wifi", "Pool", "Gym", "Spa"].map((u) => (
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
            Minimum rating
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
            <option value={0}>All</option>
            <option value={1}>⭐ & up</option>
            <option value={2}>⭐⭐ & up</option>
            <option value={3}>⭐⭐⭐ & up</option>
            <option value={4}>⭐⭐⭐⭐ & up</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        {/* Buttons */}
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
              Reset
            </button>

            <button
              onClick={() => onClose()}
              className="flex-1 bg-[#003B95] text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;
