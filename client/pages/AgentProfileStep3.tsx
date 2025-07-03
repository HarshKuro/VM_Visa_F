import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { Star, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function AgentProfileStep3() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    yearsOfExperience: "",
    areasOfExpertise: [] as string[],
    region: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const expertiseOptions = [
    "Work Visas (H1-B, L1, O1)",
    "Student Visas (F1, M1, J1)",
    "Family Immigration",
    "Express Entry (Canada)",
    "Provincial Nominee Program",
    "Business Immigration",
    "Investment Visas (EB5, E2)",
    "Asylum & Refugee Claims",
    "Citizenship Applications",
    "Visitor/Tourist Visas",
  ];

  const regions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "European Union",
    "Middle East",
    "Asia Pacific",
    "Latin America",
    "Africa",
    "Global",
  ];

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("agentProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData({
        yearsOfExperience: profileData.yearsOfExperience || "",
        areasOfExpertise: profileData.areasOfExpertise || [],
        region: profileData.region || "",
      });
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
    }

    if (formData.areasOfExpertise.length === 0) {
      newErrors.areasOfExpertise =
        "Please select at least one area of expertise";
    }

    if (!formData.region) {
      newErrors.region = "Please select your service region";
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

    navigate("/agent-profile-step4");
  };

  const handleBack = () => {
    // Save current data before going back
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

  const toggleExpertise = (expertise: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.includes(expertise)
        ? prev.areasOfExpertise.filter((e) => e !== expertise)
        : [...prev.areasOfExpertise, expertise],
    }));

    if (errors.areasOfExpertise) {
      setErrors((prev) => ({ ...prev, areasOfExpertise: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Step 3 of 4
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Professional Details
          </h1>
          <p className="text-vm-gray-600">
            Tell us about your experience and expertise
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Setup Progress
            </span>
            <span className="text-sm text-vm-gray-500">75% Complete</span>
          </div>
          <Progress value={75} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleNext}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
              <Select
                value={formData.yearsOfExperience}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, yearsOfExperience: value }))
                }
              >
                <SelectTrigger
                  className={`h-12 ${errors.yearsOfExperience ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years (Entry level)</SelectItem>
                  <SelectItem value="2-3">2-3 years (Junior)</SelectItem>
                  <SelectItem value="4-5">4-5 years (Mid-level)</SelectItem>
                  <SelectItem value="6-10">6-10 years (Senior)</SelectItem>
                  <SelectItem value="11-15">11-15 years (Expert)</SelectItem>
                  <SelectItem value="16+">16+ years (Master)</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">
                  {errors.yearsOfExperience}
                </p>
              )}
              <p className="text-sm text-vm-gray-500">
                This helps clients understand your level of expertise
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Service Region *</Label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, region: value }))
                }
              >
                <SelectTrigger
                  className={`h-12 ${errors.region ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select your primary service region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && (
                <p className="text-red-500 text-sm">{errors.region}</p>
              )}
              <p className="text-sm text-vm-gray-500">
                Choose the primary region where you provide services
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="space-y-4">
              <Label>Areas of Expertise *</Label>
              <p className="text-sm text-vm-gray-500 -mt-2">
                Select all areas where you have experience (minimum 1 required)
              </p>
              <div className="grid grid-cols-1 gap-3">
                {expertiseOptions.map((expertise) => (
                  <div
                    key={expertise}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      formData.areasOfExpertise.includes(expertise)
                        ? "border-vm-green bg-vm-green/5 text-vm-green"
                        : "border-vm-gray-200 hover:border-vm-green/50"
                    }`}
                    onClick={() => toggleExpertise(expertise)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{expertise}</span>
                      {formData.areasOfExpertise.includes(expertise) && (
                        <CheckCircle className="w-5 h-5 text-vm-green" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {errors.areasOfExpertise && (
                <p className="text-red-500 text-sm">
                  {errors.areasOfExpertise}
                </p>
              )}
              <div className="bg-vm-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-vm-gray-700 mb-1">
                  Selected Areas: {formData.areasOfExpertise.length}
                </p>
                {formData.areasOfExpertise.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.areasOfExpertise.map((expertise, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-vm-green text-white text-xs rounded-full"
                      >
                        {expertise}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-vm-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
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
              ✓
            </div>
            <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center text-white text-sm font-medium">
              ✓
            </div>
            <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center text-white text-sm font-medium">
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
