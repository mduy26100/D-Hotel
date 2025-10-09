"use client";

import HotelCard from "../../components/hotels/HotelCard";
import BannerCarousel from "../../components/ui/BannerCarousel";
import HeroSearchBar from "../../components/ui/HeroSearchBar";
import HomeFeatures from "../../components/ui/HomeFeatures";
import FeaturedDeals from "../../components/ui/FeaturedDeals";
import ExploreDestinations from "../../components/ui/ExploreDestinations";
import BlogSection from "../../components/ui/BlogSection";
import { useHotels } from "../../hooks/hotels/hotels/useHotels";

const HomePage = () => {
  const { hotels, loading, error } = useHotels();

  console.log(hotels);

  return (
    <div className="w-full">
      {/* 🟦 Banner Carousel */}
      <BannerCarousel />

      {/* Hero Search Bar */}
      <HeroSearchBar />

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Explore Destinations */}
      <ExploreDestinations />

      {/* 🏨 Danh sách khách sạn */}
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🏨 Danh sách khách sạn
          </h1>

          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#233E8F]"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}

          {!loading && !error && (
            <>
              {hotels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  Không có khách sạn nào.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Blog Sections */}
      <BlogSection />

      {/* Home Features */}
      <HomeFeatures />
    </div>
  );
};

export default HomePage;
