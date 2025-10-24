import { ArrowRight } from "lucide-react";

const featuredDeals = [
  {
    id: 1,
    title: "Giảm 30% tại Vinpearl Resort",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "2.500.000đ/đêm",
  },
  {
    id: 2,
    title: "Combo 3N2Đ Đà Lạt chỉ từ",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: "1.800.000đ",
  },
  {
    id: 3,
    title: "Ưu đãi cuối tuần - Flamingo",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: "2.200.000đ/đêm",
  },
];

export default function FeaturedDeals() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#233E8F]">
            🌟 Ưu đãi nổi bật
          </h2>
          <button className="flex items-center text-[#233E8F] font-medium hover:underline">
            Xem tất cả
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <div
              key={deal.id}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {deal.title}
                </h3>
                <p className="text-[#233E8F] font-bold">{deal.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
