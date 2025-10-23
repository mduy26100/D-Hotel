import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Globe, ChevronDown, Menu, X, User } from "lucide-react";
import LogoImage from "../../assets/images/LogoHotel.png";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthContext(); // lấy user + logout từ context

  const menuItems = [
    { label: "Home", path: "/" },
    {
      label: "Hotels",
      dropdown: [
        { label: "All Hotels", path: "/hotels" },
        { label: "Luxury Hotels", path: "/hotels/luxury" },
        { label: "Resorts", path: "/hotels/resorts" },
        { label: "Budget Stays", path: "/hotels/budget" },
      ],
    },
    {
      label: "Destinations",
      dropdown: [
        { label: "Hà Nội", path: "/destinations/ha-noi" },
        { label: "Đà Nẵng", path: "/destinations/da-nang" },
        { label: "Phú Quốc", path: "/destinations/phu-quoc" },
        { label: "Đà Lạt", path: "/destinations/da-lat" },
      ],
    },
    { label: "Deals", path: "/deals" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* 🧭 Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={LogoImage}
              alt="D-Hotel Logo"
              className="w-10 h-10 object-contain transform group-hover:scale-110 transition"
            />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#233E8F] tracking-wide">
                D-Hotel
              </h1>
              <p className="text-xs text-gray-500">Royal Experience</p>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#233E8F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:ml-8 md:flex-1 md:justify-center space-x-6">
            {menuItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {!item.dropdown ? (
                  <Link
                    to={item.path}
                    className="text-gray-700 font-medium hover:text-[#233E8F] transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="flex items-center space-x-1 text-gray-700 font-medium cursor-pointer group-hover:text-[#233E8F] transition">
                      <span>{item.label}</span>
                      <ChevronDown size={14} />
                    </div>
                    <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#233E8F] transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Account Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 font-medium hover:text-[#233E8F] transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#233E8F] text-white px-4 py-2 rounded-full hover:bg-[#1c2e6e] transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User size={20} className="text-[#233E8F]" />
                  <span className="font-medium text-gray-700">
                    {user.firstName + " " + user.lastName}
                  </span>
                  <ChevronDown size={14} />
                </div>
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-inner border-t border-gray-200">
            <nav className="flex flex-col space-y-3 px-4 py-3">
              {menuItems.map((item, idx) => (
                <div key={idx}>
                  {!item.dropdown ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-700 font-medium hover:text-[#233E8F] transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <details className="group">
                      <summary className="cursor-pointer list-none flex justify-between text-gray-700 font-medium hover:text-[#233E8F]">
                        {item.label}
                        <ChevronDown size={14} />
                      </summary>
                      <div className="mt-1 ml-4 flex flex-col space-y-1">
                        {item.dropdown.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-600 hover:text-[#233E8F] text-sm"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}

              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 font-medium hover:text-[#233E8F] transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-[#233E8F] text-white text-center px-4 py-2 rounded-full hover:bg-[#1c2e6e] transition"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 font-medium hover:text-[#233E8F] transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-red-600 text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
