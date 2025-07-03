import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  Upload,
  ArrowLeft,
  CheckCircle,
  FileText,
  Camera,
  Sparkles,
} from "lucide-react";

export default function AgentProfileStep4() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    licenseFile: null as File | null,
    profilePhoto: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("agentProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      // Note: Files can't be stored in localStorage, so these will always be null
      // In a real app, you'd handle file persistence differently
    }
  }, []);

  const handleBack = () => {
    navigate("/agent-profile-step3");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      // Get all the profile data
      const savedProfile = localStorage.getItem("agentProfileData");
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};

      // Add the files to the profile data
      const completeProfileData = {
        ...profileData,
        licenseFile: formData.licenseFile?.name || null,
        profilePhoto: formData.profilePhoto?.name || null,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear stored data
      localStorage.removeItem("agentBasicInfo");
      localStorage.removeItem("agentProfileData");

      // Show success and redirect to agent dashboard
      navigate("/agent-dashboard");
    } catch (error) {
      console.error("Profile completion failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (file: File, type: "license" | "photo") => {
    if (type === "license") {
      setFormData((prev) => ({ ...prev, licenseFile: file }));
    } else {
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleSkip = () => {
    // Skip files and complete profile
    handleSubmit(new Event("submit") as any);
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Step 4 of 4 - Final Setup
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Optional Documents
          </h1>
          <p className="text-vm-gray-600">
            Upload documents to boost your credibility (optional)
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Setup Progress
            </span>
            <span className="text-sm text-vm-gray-500">100% Complete</span>
          </div>
          <Progress value={100} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-6"
        >
          <div className="space-y-6">
            {/* Professional License Upload */}
            <div className="space-y-4">
              <div>
                <Label>Professional License</Label>
                <p className="text-sm text-vm-gray-500 mt-1">
                  Upload your professional immigration consultant license or
                  certification
                </p>
              </div>
              <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center hover:border-vm-green/50 transition-colors">
                <FileText className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
                {formData.licenseFile ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-vm-green">
                      ✓ {formData.licenseFile.name}
                    </p>
                    <p className="text-xs text-vm-gray-500">
                      File uploaded successfully
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, licenseFile: null }))
                      }
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-vm-gray-600 mb-2">
                      Upload your professional license
                    </p>
                    <p className="text-xs text-vm-gray-500 mb-4">
                      PDF, JPG, PNG (Max 5MB)
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
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="space-y-4">
              <div>
                <Label>Profile Photo</Label>
                <p className="text-sm text-vm-gray-500 mt-1">
                  A professional headshot helps build trust with clients
                </p>
              </div>
              <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center hover:border-vm-green/50 transition-colors">
                <Camera className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
                {formData.profilePhoto ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-vm-green">
                      ✓ {formData.profilePhoto.name}
                    </p>
                    <p className="text-xs text-vm-gray-500">
                      Photo uploaded successfully
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, profilePhoto: null }))
                      }
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-vm-gray-600 mb-2">
                      Upload your profile photo
                    </p>
                    <p className="text-xs text-vm-gray-500 mb-4">
                      JPG, PNG (Max 2MB)
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
                      <Camera className="w-4 h-4 mr-2" />
                      Choose Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Benefits Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">
                Why upload these documents?
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Verified badge on your profile
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Increased client trust and bookings
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Higher ranking in search results
                </li>
              </ul>
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

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="flex items-center"
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Setup
                  </>
                )}
              </Button>
            </div>
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
              ✓
            </div>
            <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center text-white text-sm font-medium">
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
