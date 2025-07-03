import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-vm-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-vm-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VM</span>
              </div>
              <span className="text-xl font-bold text-vm-gray-900">
                VM Visa
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Country Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-vm-gray-700 hover:text-vm-gray-900 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedCountry}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-vm-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className="block w-full px-4 py-2 text-left text-sm text-vm-gray-700 hover:bg-vm-gray-50 hover:text-vm-gray-900 transition-colors"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/services"
                className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-vm-gray-700 hover:text-vm-gray-900"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-vm-green hover:bg-vm-green-600 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-vm-gray-700 hover:text-vm-gray-900 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-vm-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Country Selector Mobile */}
              <div className="px-4">
                <button className="flex items-center space-x-2 text-vm-gray-700">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{selectedCountry}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links Mobile */}
              <div className="flex flex-col space-y-2 px-4">
                <Link
                  to="/services"
                  className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 py-2 transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 py-2 transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 py-2 transition-colors"
                >
                  Contact
                </Link>
              </div>

              {/* Auth Buttons Mobile */}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-vm-gray-200">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-vm-gray-700"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="w-full bg-vm-green hover:bg-vm-green-600 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
