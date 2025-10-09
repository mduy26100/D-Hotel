import { Crown, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold">D-Hotel</h3>
              <p className="text-sm text-gray-400">Royal Experience</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Experience royal-class hotel services with luxury and elegance in every detail.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-blue-500"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-500"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-600"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "Hotels", "Services", "Offers", "About Us", "Contact"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-white">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-md font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            {["Booking", "Spa & Wellness", "Restaurant", "Conference", "Airport Transfer", "Tour"].map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-white">{service}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Hanoi, Vietnam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>info@d-hotel.com</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-6">
            <h5 className="font-semibold mb-2">Subscribe to our newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l bg-gray-800 text-gray-200 focus:outline-none"
              />
              <button className="bg-blue-800 px-4 py-2 rounded-r hover:bg-blue-900">
                <Mail className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-gray-500 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
          <p>© {new Date().getFullYear()} D-Hotel. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
