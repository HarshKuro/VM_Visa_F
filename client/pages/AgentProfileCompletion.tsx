import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import {
  User,
  Phone,
  Shield,
  Star,
  Globe,
  Upload,
  CheckCircle,
  X,
  Camera,
  FileText,
} from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  yearsOfExperience: string;
  areasOfExpertise: string[];
  region: string;
  licenseFile: File | null;
  profilePhoto: File | null;
}

export default function AgentProfileCompletion() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    yearsOfExperience: "",
    areasOfExpertise: [],
    region: "",
    licenseFile: null,
    profilePhoto: null,
  });
  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);

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

  // Load basic info from previous signup
  useEffect(() => {
    const basicInfo = localStorage.getItem("agentBasicInfo");
    if (basicInfo) {
      const { fullName, email } = JSON.parse(basicInfo);
      setProfileData((prev) => ({ ...prev, fullName, email }));
    }
  }, []);

  // Calculate completion progress
  useEffect(() => {
    const requiredFields = [
      profileData.phone,
      profileData.password,
      profileData.confirmPassword,
      profileData.yearsOfExperience,
      profileData.region,
    ];
    const filledFields = requiredFields.filter((field) => field).length;
    const expertiseSelected = profileData.areasOfExpertise.length > 0 ? 1 : 0;
    const totalRequired = requiredFields.length + expertiseSelected;
    const completed = filledFields + expertiseSelected;
    setCompletionProgress((completed / totalRequired) * 100);
  }, [profileData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!profileData.password) {
      newErrors.password = "Password is required";
    } else if (profileData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!profileData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (profileData.password !== profileData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!profileData.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
    }

    if (profileData.areasOfExpertise.length === 0) {
      newErrors.areasOfExpertise =
        "Please select at least one area of expertise";
    }

    if (!profileData.region) {
      newErrors.region = "Please select your service region";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear stored basic info
      localStorage.removeItem("agentBasicInfo");

      // Show success and redirect
      alert("Welcome! Your profile is now active.");
      navigate("/agent-dashboard");
    } catch (error) {
      console.error("Profile completion failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ProfileData, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleExpertise = (expertise: string) => {
    setProfileData((prev) => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.includes(expertise)
        ? prev.areasOfExpertise.filter((e) => e !== expertise)
        : [...prev.areasOfExpertise, expertise],
    }));
  };

  const handleFileUpload = (file: File, type: "license" | "photo") => {
    if (type === "license") {
      updateField("licenseFile", file);
    } else {
      updateField("profilePhoto", file);
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Profile Completion Required
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Complete Your Agent Profile
          </h1>
          <p className="text-vm-gray-600">
            Please complete your profile to proceed to your dashboard
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Completion
            </span>
            <span className="text-sm text-vm-gray-500">
              {Math.round(completionProgress)}% Complete
            </span>
          </div>
          <Progress value={completionProgress} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-8"
        >
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-vm-green" />
              <h2 className="text-xl font-semibold text-vm-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  readOnly
                  className="bg-vm-gray-50 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={profileData.email}
                  readOnly
                  className="bg-vm-gray-50 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="Enter your contact number"
                  className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-vm-green" />
              <h2 className="text-xl font-semibold text-vm-gray-900">
                Account Security
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={profileData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Create a secure password"
                  className={`h-12 ${errors.password ? "border-red-500" : ""}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm your password"
                  className={`h-12 ${errors.confirmPassword ? "border-red-500" : ""}`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-vm-green" />
              <h2 className="text-xl font-semibold text-vm-gray-900">
                Professional Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Select
                  value={profileData.yearsOfExperience}
                  onValueChange={(value) =>
                    updateField("yearsOfExperience", value)
                  }
                >
                  <SelectTrigger
                    className={`h-12 ${errors.yearsOfExperience ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-5">4-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16+">16+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-sm">
                    {errors.yearsOfExperience}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Service Region *</Label>
                <Select
                  value={profileData.region}
                  onValueChange={(value) => updateField("region", value)}
                >
                  <SelectTrigger
                    className={`h-12 ${errors.region ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select your service region" />
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
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="space-y-4">
              <Label>Areas of Expertise *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {expertiseOptions.map((expertise) => (
                  <div
                    key={expertise}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      profileData.areasOfExpertise.includes(expertise)
                        ? "border-vm-green bg-vm-green/5 text-vm-green"
                        : "border-vm-gray-200 hover:border-vm-green/50"
                    }`}
                    onClick={() => toggleExpertise(expertise)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{expertise}</span>
                      {profileData.areasOfExpertise.includes(expertise) && (
                        <CheckCircle className="w-4 h-4 text-vm-green" />
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
              <p className="text-sm text-vm-gray-500">
                Selected: {profileData.areasOfExpertise.length} area(s)
              </p>
            </div>
          </div>

          {/* Optional Documents */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="w-5 h-5 text-vm-green" />
              <h2 className="text-xl font-semibold text-vm-gray-900">
                Optional Documents
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* License Upload */}
              <div className="space-y-2">
                <Label>Professional License</Label>
                <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-vm-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-vm-gray-600 mb-2">
                    Upload your professional license
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "license");
                    }}
                    className="hidden"
                    id="license-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("license-upload")?.click()
                    }
                  >
                    Choose File
                  </Button>
                  {profileData.licenseFile && (
                    <p className="text-sm text-vm-green mt-2">
                      {profileData.licenseFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Photo */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-vm-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-vm-gray-600 mb-2">
                    Upload your profile photo
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "photo");
                    }}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    Choose Photo
                  </Button>
                  {profileData.profilePhoto && (
                    <p className="text-sm text-vm-green mt-2">
                      {profileData.profilePhoto.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-vm-gray-200">
            <Button
              type="submit"
              disabled={isSubmitting || completionProgress < 100}
              className="w-full h-12 bg-vm-green hover:bg-vm-green-600 text-white"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving Profile...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Save & Enter Dashboard
                </>
              )}
            </Button>
            {completionProgress < 100 && (
              <p className="text-sm text-vm-gray-500 mt-2 text-center">
                Please complete all required fields to continue
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
