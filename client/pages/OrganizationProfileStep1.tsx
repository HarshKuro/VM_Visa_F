import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { Building, ArrowRight, ArrowLeft, Globe } from "lucide-react";

export default function OrganizationProfileStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    countryOfOperation: "",
    officialEmail: "",
    contactPhone: "",
    industryType: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Singapore",
    "UAE",
    "India",
    "Other",
  ];

  const industries = [
    "Immigration",
    "Legal Services",
    "Consulting",
    "Educational Services",
    "Corporate Services",
    "Government",
    "Other",
  ];

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("organizationProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData({
        organizationName: profileData.organizationName || "",
        countryOfOperation: profileData.countryOfOperation || "",
        officialEmail: profileData.officialEmail || "",
        contactPhone: profileData.contactPhone || "",
        industryType: profileData.industryType || "",
      });
    }

    // Load from organization signup if available
    const orgSignupData = localStorage.getItem("organizationSignupData");
    if (orgSignupData) {
      const signupData = JSON.parse(orgSignupData);
      setFormData((prev) => ({
        ...prev,
        organizationName: signupData.organizationName || prev.organizationName,
        officialEmail: signupData.businessEmail || prev.officialEmail,
      }));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    if (!formData.countryOfOperation) {
      newErrors.countryOfOperation = "Country of operation is required";
    }

    if (!formData.officialEmail.trim()) {
      newErrors.officialEmail = "Official email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.officialEmail)) {
      newErrors.officialEmail = "Please enter a valid email address";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone is required";
    }

    if (!formData.industryType) {
      newErrors.industryType = "Industry type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save to localStorage
    const existingData = localStorage.getItem("organizationProfileData");
    const profileData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "organizationProfileData",
      JSON.stringify({
        ...profileData,
        ...formData,
      }),
    );

    navigate("/organization-profile-step2");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Building className="w-4 h-4 mr-2" />
            Step 1 of 3 - Basic Details
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Organization Profile Setup
          </h1>
          <p className="text-vm-gray-600">
            Let's start with your organization's basic information
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Setup Progress
            </span>
            <span className="text-sm text-vm-gray-500">33% Complete</span>
          </div>
          <Progress value={33} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleNext}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) =>
                  updateField("organizationName", e.target.value)
                }
                placeholder="Enter your organization's legal name"
                className={`h-12 ${errors.organizationName ? "border-red-500" : ""}`}
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm">
                  {errors.organizationName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryOfOperation">Country of Operation *</Label>
              <Select
                value={formData.countryOfOperation}
                onValueChange={(value) =>
                  updateField("countryOfOperation", value)
                }
              >
                <SelectTrigger
                  className={`h-12 ${errors.countryOfOperation ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your primary country of operation" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.countryOfOperation && (
                <p className="text-red-500 text-sm">
                  {errors.countryOfOperation}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="officialEmail">Official Email Address *</Label>
              <Input
                id="officialEmail"
                type="email"
                value={formData.officialEmail}
                onChange={(e) => updateField("officialEmail", e.target.value)}
                placeholder="contact@yourorganization.com"
                className={`h-12 ${errors.officialEmail ? "border-red-500" : ""}`}
              />
              {errors.officialEmail && (
                <p className="text-red-500 text-sm">{errors.officialEmail}</p>
              )}
              <p className="text-sm text-vm-gray-500">
                This will be used for official communications
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone Number *</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateField("contactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={`h-12 ${errors.contactPhone ? "border-red-500" : ""}`}
              />
              {errors.contactPhone && (
                <p className="text-red-500 text-sm">{errors.contactPhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industryType">Industry Type *</Label>
              <Select
                value={formData.industryType}
                onValueChange={(value) => updateField("industryType", value)}
              >
                <SelectTrigger
                  className={`h-12 ${errors.industryType ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your industry type" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industryType && (
                <p className="text-red-500 text-sm">{errors.industryType}</p>
              )}
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">
                  Global Compliance
                </h4>
                <p className="text-blue-800 text-sm">
                  Your organization information helps us ensure compliance with
                  local immigration laws and regulations in your operating
                  country.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-vm-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/login")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>

            <Button
              type="submit"
              className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        {/* Step Indicators */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center text-white text-sm font-medium">
              1
            </div>
            <div className="w-8 h-8 bg-vm-gray-300 rounded-full flex items-center justify-center text-vm-gray-600 text-sm font-medium">
              2
            </div>
            <div className="w-8 h-8 bg-vm-gray-300 rounded-full flex items-center justify-center text-vm-gray-600 text-sm font-medium">
              3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
