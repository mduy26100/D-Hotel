"use client";
import { useEffect, useState } from "react";
import HotelCard from "../../components/hotels/HotelCard";
import { useHotels } from "../../hooks/hotels/hotels/useHotels";

// Helper parse query string
const parseQuery = () => {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  for (const [key, value] of params.entries()) {
    if (value.includes(",")) obj[key] = value.split(",");
    else obj[key] = value;
  }
  return obj;
};

// Helper update query string
const updateQuery = (filter) => {
  const query = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value && (!Array.isArray(value) || value.length > 0)) {
      query.set(key, Array.isArray(value) ? value.join(",") : value);
    }
  });
  window.history.replaceState(null, "", `?${query.toString()}`);
};

function HotelsPage() {
  const { hotels = [], loading, error } = useHotels();

  const defaultFilter = {
    category: "",
    location: "",
    utilities: [],
    minPrice: 0,
    maxPrice: 0,
    isActive: "",
    rating: 0,
  };

  // Filter thực sự dùng để lọc
  const [filter, setFilter] = useState(defaultFilter);

  // Filter tạm dùng trong form
  const [tempFilter, setTempFilter] = useState(defaultFilter);

  const [showFilter, setShowFilter] = useState(false);

  // Load filter từ URL khi mount
  useEffect(() => {
    const queryFilter = parseQuery();
    const newFilter = { ...defaultFilter, ...queryFilter };
    // Chuyển param utilities về mảng nếu là string
    if (typeof newFilter.utilities === "string") {
      newFilter.utilities = newFilter.utilities.split(",");
    }
    setFilter(newFilter);
    setTempFilter(newFilter);
  }, []);

  // Update body overflow khi mở filter
  useEffect(() => {
    document.body.style.overflow = showFilter ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilter]);

  // Danh sách duy nhất
  const categoryList = Array.from(
    new Set(hotels.map((h) => h.category?.name).filter(Boolean))
  );
  const locationList = Array.from(
    new Set(hotels.map((h) => h.location?.name).filter(Boolean))
  );
  const utilitiesList = Array.from(
    new Set(hotels.flatMap((h) => h.utilities?.map((u) => u.name) || []))
  );

  // Lọc hotels dựa trên filter thực sự
  const filteredHotels = hotels.filter((hotel) => {
    let pass = true;
    if (filter.category)
      pass = pass && hotel.category?.name === filter.category;
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
    if (filter.minPrice) pass = pass && hotel.price >= filter.minPrice;
    if (filter.maxPrice) pass = pass && hotel.price <= filter.maxPrice;
    if (filter.rating) pass = pass && hotel.rating >= filter.rating;
    return pass;
  });

  // Apply filter
  const handleApply = () => {
    setFilter(tempFilter);
    updateQuery(tempFilter);
    setShowFilter(false);
  };

  // Reset filter
  const handleReset = () => {
    setTempFilter(defaultFilter);
    setFilter(defaultFilter);
    // Xóa query string trên URL, redirect về /hotels
    window.history.replaceState(null, "", "/hotels");
  };

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

        {/* Layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          {/* Filter section */}
          <aside className="hidden md:block md:col-span-3 sticky top-24 h-fit">
            <FilterPanel
              filter={tempFilter}
              setFilter={setTempFilter}
              showClose={false}
              onApply={handleApply}
              onReset={handleReset}
              categoryList={categoryList}
              locationList={locationList}
              utilitiesList={utilitiesList}
            />
          </aside>

          {/* Hotel cards */}
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
            filter={tempFilter}
            setFilter={setTempFilter}
            showClose={true}
            onApply={handleApply}
            onReset={handleReset}
            onClose={() => setShowFilter(false)}
            categoryList={categoryList}
            locationList={locationList}
            utilitiesList={utilitiesList}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------- FilterPanel ----------------
function FilterPanel({
  filter,
  setFilter,
  showClose = false,
  onApply = () => {},
  onReset = () => {},
  onClose = () => {},
  categoryList = [],
  locationList = [],
  utilitiesList = [],
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
        style={{ maxHeight: "calc(100vh - 120px)", scrollbarGutter: "stable" }}
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
            {categoryList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
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
            {locationList.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Utilities */}
        <div>
          <label className="block text-sm font-semibold text-[#003B95] mb-3">
            Utilities
          </label>
          <div className="space-y-2">
            {utilitiesList.length === 0 ? (
              <p className="text-gray-400 italic">No utilities available</p>
            ) : (
              utilitiesList.map((u) => (
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
              ))
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 pb-8 flex gap-3">
          <button
            onClick={onReset}
            className="flex-1 border-2 border-blue-200 text-[#003B95] rounded-lg px-4 py-3 font-medium hover:bg-blue-50 transition"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="flex-1 bg-[#003B95] text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-800 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelsPage;
