import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { User, Phone, Shield, ArrowRight, ArrowLeft } from "lucide-react";

export default function AgentProfileStep1() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load basic info from previous signup
  useEffect(() => {
    const basicInfo = localStorage.getItem("agentBasicInfo");
    const savedProfile = localStorage.getItem("agentProfileData");

    if (basicInfo) {
      const { fullName, email } = JSON.parse(basicInfo);
      setFormData((prev) => ({ ...prev, fullName, email }));
    }

    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      if (profileData.phone) {
        setFormData((prev) => ({ ...prev, phone: profileData.phone }));
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[-\s\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
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
    const existingData = localStorage.getItem("agentProfileData");
    const profileData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "agentProfileData",
      JSON.stringify({
        ...profileData,
        ...formData,
      }),
    );

    navigate("/agent-profile-step2");
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <User className="w-4 h-4 mr-2" />
            Step 1 of 4
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Contact Information
          </h1>
          <p className="text-vm-gray-600">
            Let's start with your basic contact details
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Setup Progress
            </span>
            <span className="text-sm text-vm-gray-500">25% Complete</span>
          </div>
          <Progress value={25} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleNext}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                readOnly
                className="bg-vm-gray-50 h-12"
              />
              <p className="text-sm text-vm-gray-500">
                This was provided during signup and cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                readOnly
                className="bg-vm-gray-50 h-12"
              />
              <p className="text-sm text-vm-gray-500">
                This was provided during signup and cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Enter your contact number"
                className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
              <p className="text-sm text-vm-gray-500">
                This will be visible to clients who want to contact you
              </p>
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
            <div className="w-8 h-8 bg-vm-gray-300 rounded-full flex items-center justify-center text-vm-gray-600 text-sm font-medium">
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
