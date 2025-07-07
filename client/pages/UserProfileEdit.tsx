import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import {
  ArrowLeft,
  Eye,
  Settings,
  User,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Shield,
  Users,
  Save,
  AlertCircle,
  Camera,
  Upload,
} from "lucide-react";

export default function UserProfileEdit() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    nationality: "United States",
    passportNumber: "123456789",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
      email: "jane.doe@email.com",
    },
    preferences: {
      language: "English",
      timezone: "America/New_York",
      notifications: {
        email: true,
        sms: false,
        applicationUpdates: true,
        appointmentReminders: true,
      },
    },
  });

  const profileSections = [
    {
      id: "personal",
      label: "Personal Information",
      icon: User,
      description: "Basic personal details",
    },
    {
      id: "contact",
      label: "Contact Information",
      icon: Phone,
      description: "Phone, email, and address",
    },
    {
      id: "documents",
      label: "Document Information",
      icon: Shield,
      description: "Passport and ID details",
    },
    {
      id: "emergency",
      label: "Emergency Contact",
      icon: Users,
      description: "Emergency contact details",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Settings,
      description: "Account and notification settings",
    },
  ];

  const handleInputChange = (section: string, field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleDirectInputChange = (field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasUnsavedChanges(false);
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-vm-gray-900">
          Personal Information
        </h2>
        <p className="text-vm-gray-600 mt-1">
          Update your basic personal details
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name *</Label>
              <Input
                value={userProfile.firstName}
                onChange={(e) =>
                  handleDirectInputChange("firstName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name *</Label>
              <Input
                value={userProfile.lastName}
                onChange={(e) =>
                  handleDirectInputChange("lastName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Input
                type="date"
                value={userProfile.dateOfBirth}
                onChange={(e) =>
                  handleDirectInputChange("dateOfBirth", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Nationality *</Label>
              <Select
                value={userProfile.nationality}
                onValueChange={(value) =>
                  handleDirectInputChange("nationality", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-vm-gray-900">
          Contact Information
        </h2>
        <p className="text-vm-gray-600 mt-1">
          Update your contact details and address
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Email Address *</Label>
              <Input
                type="email"
                value={userProfile.email}
                onChange={(e) =>
                  handleDirectInputChange("email", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                value={userProfile.phone}
                onChange={(e) =>
                  handleDirectInputChange("phone", e.target.value)
                }
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Street Address *</Label>
              <Input
                value={userProfile.address.street}
                onChange={(e) =>
                  handleInputChange("address", "street", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                value={userProfile.address.city}
                onChange={(e) =>
                  handleInputChange("address", "city", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>State/Province *</Label>
              <Input
                value={userProfile.address.state}
                onChange={(e) =>
                  handleInputChange("address", "state", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>ZIP/Postal Code *</Label>
              <Input
                value={userProfile.address.zipCode}
                onChange={(e) =>
                  handleInputChange("address", "zipCode", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Country *</Label>
              <Select
                value={userProfile.address.country}
                onValueChange={(value) =>
                  handleInputChange("address", "country", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalSection();
      case "contact":
        return renderContactSection();
      case "documents":
        return (
          <div className="text-center py-8">
            <Shield className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Document Information
            </h3>
            <p className="text-vm-gray-600">
              Passport and ID management coming soon
            </p>
          </div>
        );
      case "emergency":
        return (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Emergency Contact
            </h3>
            <p className="text-vm-gray-600">
              Emergency contact management coming soon
            </p>
          </div>
        );
      case "preferences":
        return (
          <div className="text-center py-8">
            <Settings className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Preferences
            </h3>
            <p className="text-vm-gray-600">Account preferences coming soon</p>
          </div>
        );
      default:
        return renderPersonalSection();
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-vm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/user-profile-view"
                className="flex items-center space-x-2 text-vm-gray-600 hover:text-vm-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Profile</span>
              </Link>
              <div className="h-4 w-px bg-vm-gray-300"></div>
              <span className="text-sm text-vm-gray-500">
                Profile / Edit Profile
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Link to="/user-profile-view">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </Link>
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Unsaved Changes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Left Sidebar */}
          <div className="w-80 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative mx-auto w-20 h-20 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-vm-green/20"
                    />
                    <button className="absolute bottom-0 right-0 bg-vm-green rounded-full p-2 hover:bg-vm-green-600 transition-colors">
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-vm-gray-900">
                    {userProfile.firstName} {userProfile.lastName}
                  </h3>
                  <p className="text-sm text-vm-gray-600">Client Profile</p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {profileSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-start space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-vm-green/10 text-vm-green border-l-2 border-vm-green"
                            : "text-vm-gray-600 hover:bg-vm-gray-50 hover:text-vm-gray-900"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 mt-0.5 ${
                            activeSection === section.id
                              ? "text-vm-green"
                              : "text-vm-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {section.label}
                          </div>
                          <div className="text-xs text-vm-gray-500 mt-0.5">
                            {section.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderCurrentSection()}

            {/* Save Button */}
            {hasUnsavedChanges && (
              <div className="mt-8 pt-6 border-t border-vm-gray-200">
                <div className="flex justify-end">
                  <Button
                    onClick={saveChanges}
                    className="bg-vm-green hover:bg-vm-green-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
