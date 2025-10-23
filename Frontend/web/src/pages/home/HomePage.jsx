"use client";

import HotelCard from "../../components/hotels/HotelCard";
import BannerCarousel from "../../components/ui/BannerCarousel";
import HeroSearchBar from "../../components/ui/HeroSearchBar";
import HomeFeatures from "../../components/ui/HomeFeatures";
import FeaturedDeals from "../../components/ui/FeaturedDeals";
import ExploreDestinations from "../../components/ui/ExploreDestinations";
import BlogSection from "../../components/ui/BlogSection";
import { useHotels } from "../../hooks/hotels/hotels/useHotels";
import HotelList from "../../components/hotels/HotelList";
import { hotelDetailsAPI } from "../../api/hotels/hotels";

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

      <HotelList hotels={hotels} loading={loading} />

      {/* Blog Sections */}
      <BlogSection />

      {/* Home Features */}
      <HomeFeatures />
    </div>
  );
};

export default HomePage;
