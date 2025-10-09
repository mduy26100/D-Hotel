"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Slide1 from "../../assets/images/Banner1.jpg"
import Slide2 from "../../assets/images/Banner2.jpg"

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      image: Slide1,
      title: "Experience Royal Luxury",
      subtitle: "Discover elegance at D-Hotel",
      description: "Where every moment becomes a memorable experience",
    },
    {
      id: 2,
      image: Slide2,
      title: "Premium Suite Rooms",
      subtitle: "Enjoy ultimate privacy and comfort",
      description: "Sophisticated design with breathtaking panoramic views",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h1>
            <h2 className="text-lg md:text-2xl text-gray-200 mt-2 font-medium">
              {slide.subtitle}
            </h2>
            <p className="text-sm md:text-base text-gray-300 mt-4 max-w-2xl">
              {slide.description}
            </p>
            <button className="mt-6 px-6 py-3 bg-white text-[#233E8F] font-semibold rounded-full shadow-lg hover:bg-[#233E8F] hover:text-white transition-all duration-300">
              Discover Now
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default BannerCarousel
