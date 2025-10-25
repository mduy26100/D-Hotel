import { ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "5 Tips to Book Hotels Economically During Peak Season",
    date: "05/10/2025",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
  },
  {
    id: 2,
    title: "Top 10 Family-Friendly Resorts",
    date: "02/10/2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 3,
    title: "Green Travel – Trend of 2025",
    date: "28/09/2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#233E8F]">
            📝 Travel Blog
          </h2>
          <button className="flex items-center text-[#233E8F] font-medium hover:underline">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
