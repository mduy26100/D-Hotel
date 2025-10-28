"use client";
import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { useHotelCategories } from "../../hooks/hotels/hotelCategories/useHotelCategories";

const HeroSearchBar = () => {
  const { categories, loading, error } = useHotelCategories();

  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: todayStr,
    checkOut: "",
    guests: "2 adults · 0 children · 1 room",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchData.destination) return;

    // Chỉ submit category thôi
    const query = new URLSearchParams();
    query.set("category", searchData.destination);
    window.location.href = `/hotels?${query.toString()}`;
  };

  const handleQuickFilter = (categoryName) => {
    const query = new URLSearchParams();
    query.set("category", categoryName);
    window.location.href = `/hotels?${query.toString()}`;
  };

  // Helper để validate ngày
  const handleCheckInChange = (e) => {
    const value = e.target.value;
    if (value < todayStr) return; // ko cho chọn ngày trước hôm nay
    setSearchData((prev) => {
      let newCheckOut = prev.checkOut;
      // nếu check-out <= checkIn thì reset check-out
      if (prev.checkOut && prev.checkOut <= value) newCheckOut = "";
      return { ...prev, checkIn: value, checkOut: newCheckOut };
    });
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    if (!searchData.checkIn) return; // chưa chọn check-in
    if (value <= searchData.checkIn) return; // check-out phải > check-in
    setSearchData((prev) => ({ ...prev, checkOut: value }));
  };

  return (
    <section className="relative bg-[#233E8F] text-white py-16 px-4 overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Find Your Next Stay in Hanoi
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Discover top-rated accommodations and exclusive experiences across
          Hanoi's iconic destinations.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row md:items-end gap-4 text-gray-800"
        >
          {/* Destination */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-semibold mb-1 text-gray-600">
              Destination
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#233E8F]">
              <MapPin className="w-5 h-5 mr-2 text-gray-500" />
              <input
                list="categories"
                placeholder="Select a category"
                value={searchData.destination}
                onChange={(e) =>
                  setSearchData({ ...searchData, destination: e.target.value })
                }
                className="w-full outline-none bg-transparent text-sm"
              />
              <datalist id="categories">
                {categories.map((c) => (
                  <option key={c.id} value={c.name} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Check-in */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-600">
              Check-in
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#233E8F]">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="date"
                value={searchData.checkIn}
                min={todayStr}
                onChange={handleCheckInChange}
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-600">
              Check-out
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#233E8F]">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="date"
                value={searchData.checkOut}
                min={
                  searchData.checkIn
                    ? new Date(
                        new Date(searchData.checkIn).getTime() + 86400000
                      )
                        .toISOString()
                        .split("T")[0]
                    : todayStr
                }
                onChange={handleCheckOutChange}
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#233E8F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1b2f70] transition"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Quick Filters */}
        <div className="mt-8">
          <p className="text-white/90 font-medium mb-3">Popular Categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {loading && <p className="text-white">Loading...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading &&
              !error &&
              categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleQuickFilter(c.name)}
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-sm hover:bg-white/20 transition"
                >
                  {c.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearchBar;
