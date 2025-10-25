import { ArrowRight } from "lucide-react";

const featuredDeals = [
  {
    id: 1,
    title: "20% Off at Sofitel Legend Metropole Hanoi",
    image:
      "https://media.istockphoto.com/id/2147497907/vi/anh/n%E1%BB%AF-du-kh%C3%A1ch-tr%E1%BA%BB-th%C6%B0-gi%C3%A3n-v%C3%A0-t%E1%BA%ADn-h%C6%B0%E1%BB%9Fng-bi%E1%BB%83n-nhi%E1%BB%87t-%C4%91%E1%BB%9Bi-khi-%C4%91i-du-l%E1%BB%8Bch-cho-k%E1%BB%B3-ngh%E1%BB%89-h%C3%A8-kh%C3%A1i-ni%E1%BB%87m.jpg?b=1&s=612x612&w=0&k=20&c=NUksq1ERF9t6R24VyWXb0fvRr9yyVdJcl_bXtg1bTiE=",
    price: "4,500,000 VND/night",
  },
  {
    id: 2,
    title: "Weekend Staycation at InterContinental Hanoi Westlake",
    image: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg",
    price: "3,200,000 VND/night",
  },
  {
    id: 3,
    title: "Hanoi Old Quarter Hotel Special Combo",
    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    price: "2,000,000 VND/night",
  },
];

export default function FeaturedDeals() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#233E8F]">
            🌟 Featured Deals
          </h2>
          <button className="flex items-center text-[#233E8F] font-medium hover:underline">
            View All
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
