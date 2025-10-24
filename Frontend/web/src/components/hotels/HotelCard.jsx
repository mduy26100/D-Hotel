import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/hotels/${hotel.id}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={hotel.imgUrl}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md shadow-lg ${
                hotel.isActive
                  ? "bg-emerald-500/95 text-white"
                  : "bg-gray-900/95 text-gray-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              {hotel.isActive ? "Còn phòng" : "Hết phòng"}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-amber-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-sm font-bold text-gray-900">
                {hotel.rating || 4.5}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <svg
              className="w-4 h-4 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm text-gray-600 line-clamp-1">
              {hotel.address}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
            {hotel.description}
          </p>

          {/* Utilities - Show only 3 */}
          {hotel.utilities && hotel.utilities.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {hotel.utilities.slice(0, 3).map((util, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                >
                  {util.name}
                </span>
              ))}
              {hotel.utilities.length > 3 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{hotel.utilities.length - 3} tiện ích
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default HotelCard;
