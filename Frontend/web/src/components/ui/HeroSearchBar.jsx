"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Users } from "lucide-react"

const HeroSearchBar = () => {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2 adults · 0 children · 1 room",
  })

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Searching:", searchData)
  }

  return (
    <section className="relative bg-[#233E8F] text-white py-16 px-4 overflow-hidden">
      {/* 🌟 Background decorative gradient circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* 📝 Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Find Your Next Stay in Hanoi
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Discover top-rated accommodations and exclusive experiences across
          Hanoi's iconic destinations.
        </p>

        {/* 🔍 Search Form */}
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
                type="text"
                placeholder="Your destination?"
                value={searchData.destination}
                onChange={(e) =>
                  setSearchData({ ...searchData, destination: e.target.value })
                }
                className="w-full outline-none bg-transparent text-sm"
              />
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
                onChange={(e) =>
                  setSearchData({ ...searchData, checkIn: e.target.value })
                }
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
                onChange={(e) =>
                  setSearchData({ ...searchData, checkOut: e.target.value })
                }
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-600">
              Guests
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#233E8F]">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <select
                value={searchData.guests}
                onChange={(e) =>
                  setSearchData({ ...searchData, guests: e.target.value })
                }
                className="w-full bg-transparent outline-none text-sm"
              >
                <option>1 adult · 0 children · 1 room</option>
                <option>2 adults · 0 children · 1 room</option>
                <option>2 adults · 1 child · 1 room</option>
                <option>2 adults · 2 children · 1 room</option>
                <option>3 adults · 0 children · 2 rooms</option>
                <option>4 adults · 0 children · 2 rooms</option>
              </select>
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

        {/* 🏙️ Quick Filters */}
        <div className="mt-8">
          <p className="text-white/90 font-medium mb-3">
            Popular in Hanoi:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Hoan Kiem Lake",
              "Old Quarter",
              "West Lake",
              "Temple of Literature",
              "Ho Chi Minh Mausoleum",
              "Hanoi Opera House",
            ].map((place) => (
              <button
                key={place}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-sm hover:bg-white/20 transition"
              >
                {place}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSearchBar
