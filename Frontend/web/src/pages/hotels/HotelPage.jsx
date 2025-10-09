import { useState } from "react";
import HotelCard from "../../components/hotels/HotelCard";
import { useHotels } from "../../hooks/hotels/hotels/useHotels";

function HotelsPage() {
  const { hotels, loading, error } = useHotels();

  const [filter, setFilter] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
    location: "",
    isActive: "",
    utilities: [], // multi-select
    rating: 0,
  });

  // Filter logic
  const filteredHotels = hotels.filter((hotel) => {
    let pass = true;
    if (filter.category) pass = pass && hotel.category.name === filter.category;
    if (filter.minPrice) pass = pass && hotel.price >= filter.minPrice;
    if (filter.maxPrice) pass = pass && hotel.price <= filter.maxPrice;
    if (filter.location) pass = pass && hotel.location.name === filter.location;
    if (filter.isActive)
      pass =
        pass &&
        ((filter.isActive === "active" && hotel.isActive) ||
          (filter.isActive === "inactive" && !hotel.isActive));
    if (filter.utilities.length > 0)
      pass =
        pass &&
        filter.utilities.every((u) =>
          hotel.utilities.some((util) => util.name === u)
        );
    if (filter.rating) pass = pass && hotel.rating >= filter.rating;
    return pass;
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md h-fit space-y-6">
          <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              className="w-full border rounded p-2"
              value={filter.category}
              onChange={(e) =>
                setFilter({ ...filter, category: e.target.value })
              }
            >
              <option value="">Tất cả</option>
              <option value="Luxury">Luxury</option>
              <option value="Budget">Budget</option>
              <option value="Resort">Resort</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Vị trí</label>
            <select
              className="w-full border rounded p-2"
              value={filter.location}
              onChange={(e) =>
                setFilter({ ...filter, location: e.target.value })
              }
            >
              <option value="">Tất cả</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Giá</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded p-2"
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter({ ...filter, minPrice: parseInt(e.target.value) || 0 })
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded p-2"
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter({ ...filter, maxPrice: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              className="w-full border rounded p-2"
              value={filter.isActive}
              onChange={(e) =>
                setFilter({ ...filter, isActive: e.target.value })
              }
            >
              <option value="">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Tạm ngưng</option>
            </select>
          </div>

          {/* Utilities */}
          <div>
            <label className="block text-sm font-medium mb-1">Tiện ích</label>
            <div className="flex flex-col space-y-1 max-h-32 overflow-y-auto">
              {["Wifi", "Bể bơi", "Gym", "Spa"].map((u) => (
                <label key={u} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filter.utilities.includes(u)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...filter.utilities, u]
                        : filter.utilities.filter((x) => x !== u);
                      setFilter({ ...filter, utilities: updated });
                    }}
                  />
                  {u}
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Đánh giá tối thiểu</label>
            <select
              className="w-full border rounded p-2"
              value={filter.rating}
              onChange={(e) =>
                setFilter({ ...filter, rating: parseInt(e.target.value) || 0 })
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
        </aside>

        {/* Middle - Hotel List */}
        <main className="lg:col-span-2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            🏨 Khách sạn
          </h1>

          {filteredHotels.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              Không có khách sạn nào.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} vertical />
              ))}
            </div>
          )}
        </main>

        {/* Right Sidebar - Map or Recommendations */}
        <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Bản đồ</h2>
          <div className="h-96 bg-gray-200 rounded">[Map or Top Hotels Here]</div>
        </aside>
      </div>
    </div>
  );
}

export default HotelsPage;
