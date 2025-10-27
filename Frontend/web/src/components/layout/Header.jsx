import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Globe, ChevronDown, Menu, X, User } from "lucide-react";
import LogoImage from "../../assets/images/LogoHotel.png";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

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
    <header className="bg-[#003B95] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={LogoImage}
            alt="D-Hotel Logo"
            className="w-10 h-10 object-contain transform group-hover:scale-110 transition"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">
              D-Hotel
            </h1>
            <p className="text-xs text-gray-200">Royal Experience</p>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
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
                  className="text-white font-medium hover:text-gray-200 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <div className="flex items-center space-x-1 text-white font-medium cursor-pointer group-hover:text-gray-200 transition">
                    <span>{item.label}</span>
                    <ChevronDown size={14} />
                  </div>
                  <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#003B95] transition"
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
                className="text-white font-medium hover:text-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-[#003B95] px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <User size={20} className="text-white" />
                <span className="font-medium text-white">
                  {user.firstName + " " + user.lastName}
                </span>
                <ChevronDown size={14} className="text-white" />
              </div>
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Bookings
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
        <div className="md:hidden bg-[#002B70] shadow-inner border-t border-[#00215D]">
          <nav className="flex flex-col space-y-3 px-4 py-3">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {!item.dropdown ? (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white font-medium hover:text-gray-200 transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <details className="group">
                    <summary className="cursor-pointer list-none flex justify-between text-white font-medium hover:text-gray-200">
                      {item.label}
                      <ChevronDown size={14} />
                    </summary>
                    <div className="mt-1 ml-4 flex flex-col space-y-1">
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-gray-200 hover:text-white text-sm"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}

            <div className="flex flex-col space-y-2 pt-2 border-t border-[#00215D]">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white font-medium hover:text-gray-200 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-white text-[#003B95] text-center px-4 py-2 rounded-full hover:bg-gray-100 transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white font-medium hover:text-gray-200 transition"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white font-medium hover:text-gray-200 transition"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-300 text-left hover:text-red-500"
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
  );
};

export default Header;
