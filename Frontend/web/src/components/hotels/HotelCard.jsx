import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  if (!hotel) return null;

  const {
    id,
    imgUrl,
    name,
    address,
    description,
    rating = 4.5,
    isActive,
    utilities = [],
  } = hotel;

  return (
    <Link
      to={`/hotels/${id}`}
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/70 rounded-2xl"
    >
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={imgUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md shadow-lg ${
                isActive
                  ? "bg-emerald-500/95 text-white"
                  : "bg-gray-900/95 text-gray-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {isActive ? "Available" : "Fully Booked"}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
            <svg
              className="w-4 h-4 text-amber-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-bold text-gray-900">{rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Hotel Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Address */}
          {address && (
            <div className="flex items-center gap-2 mb-3 text-gray-600">
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
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm line-clamp-1">{address}</p>
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
              {description}
            </p>
          )}

          {/* Utilities */}
          {utilities.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Utilities:
              </h4>

              <div className="flex flex-wrap items-center gap-2">
                {utilities.slice(0, 3).map((util, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {util.name}
                  </span>
                ))}

                {utilities.length > 3 && (
                  <span className="text-xs text-gray-500 font-medium">
                    +{utilities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default HotelCard;
