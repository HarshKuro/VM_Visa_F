import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  FileText,
  MessageSquare,
  Clock,
  Upload,
  Users,
  BarChart3,
  User,
  Settings,
  LogOut,
  Eye,
  Edit,
} from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const location = useLocation();

  // Check if user is on dashboard pages (logged in)
  const isLoggedIn =
    location.pathname.includes("-dashboard") ||
    location.pathname.includes("/dashboard");

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
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 transition-all duration-300 transform hover:scale-105 hover:shadow-sm">
                <Globe className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm font-medium relative">
                  {selectedCountry}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vm-green transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-vm-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {countries.map((country, index) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className="block w-full px-4 py-2 text-left text-sm text-vm-gray-700 hover:bg-vm-green/10 hover:text-vm-green transition-all duration-200 hover:pl-6 transform"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {isLoggedIn ? (
                // Dashboard Navigation for logged-in users
                <>
                  {[
                    { path: "#overview", label: "Overview", icon: BarChart3 },
                    { path: "#requests", label: "My Requests", icon: FileText },
                    {
                      path: "#proposals",
                      label: "Proposals",
                      icon: MessageSquare,
                    },
                    {
                      path: "#applications",
                      label: "Applications",
                      icon: Clock,
                    },
                    { path: "#documents", label: "Documents", icon: Upload },
                    { path: "#agents", label: "Browse Agents", icon: Users },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          // Trigger tab change in dashboard
                          const event = new CustomEvent("dashboardTabChange", {
                            detail: { tab: item.path.replace("#", "") },
                          });
                          window.dispatchEvent(event);
                        }}
                        className="group flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 transition-all duration-200 transform hover:scale-105"
                      >
                        <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                        <span className="relative">
                          {item.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vm-green transition-all duration-200 group-hover:w-full"></span>
                        </span>
                      </button>
                    );
                  })}
                </>
              ) : (
                // Public Navigation for non-logged-in users
                <>
                  <Link
                    to="/services"
                    className="group px-3 py-2 text-sm font-medium text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-sm"
                  >
                    <span className="relative">
                      Services
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vm-green transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link
                    to="/about"
                    className="group px-3 py-2 text-sm font-medium text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-sm"
                  >
                    <span className="relative">
                      About
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vm-green transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="group px-3 py-2 text-sm font-medium text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-sm"
                  >
                    <span className="relative">
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vm-green transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                // User Profile & Logout for logged-in users
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-vm-gray-50 transition-all duration-200">
                      <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          JD
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-vm-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-lg border border-vm-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        <Link
                          to="/agent-profile-view"
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-vm-gray-700 hover:bg-vm-gray-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                        <Link
                          to="/agent-profile-edit"
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-vm-gray-700 hover:bg-vm-gray-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </Link>
                        <button className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-vm-gray-700 hover:bg-vm-gray-50 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                        <hr className="my-1 border-vm-gray-200" />
                        <Link
                          to="/"
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Login/Signup buttons for non-logged-in users
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-vm-gray-700 hover:text-vm-green hover:bg-vm-green/5 transition-all duration-300 transform hover:scale-105 hover:shadow-sm"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="bg-vm-green hover:bg-vm-green-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
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
                {isLoggedIn ? (
                  // Dashboard Navigation for mobile
                  <>
                    {[
                      { path: "#overview", label: "Overview", icon: BarChart3 },
                      {
                        path: "#requests",
                        label: "My Requests",
                        icon: FileText,
                      },
                      {
                        path: "#proposals",
                        label: "Proposals",
                        icon: MessageSquare,
                      },
                      {
                        path: "#applications",
                        label: "Applications",
                        icon: Clock,
                      },
                      { path: "#documents", label: "Documents", icon: Upload },
                      { path: "#agents", label: "Browse Agents", icon: Users },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            const event = new CustomEvent(
                              "dashboardTabChange",
                              {
                                detail: { tab: item.path.replace("#", "") },
                              },
                            );
                            window.dispatchEvent(event);
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 text-sm font-medium text-vm-gray-700 hover:text-vm-green py-3 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </>
                ) : (
                  // Public Navigation for mobile
                  <>
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
                  </>
                )}
              </div>

              {/* Auth Buttons Mobile */}
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-vm-gray-200">
                {isLoggedIn ? (
                  <>
                    <button className="flex items-center space-x-3 text-sm font-medium text-vm-gray-700 hover:text-vm-gray-900 py-2 transition-colors">
                      <div className="w-6 h-6 bg-vm-green rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">JD</span>
                      </div>
                      <span>Profile Settings</span>
                    </button>
                    <Link
                      to="/"
                      className="text-sm font-medium text-red-600 hover:text-red-700 py-2 transition-colors"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
