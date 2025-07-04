import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  Palette,
  ArrowLeft,
  Upload,
  Camera,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function OrganizationProfileStep3() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationLogo: null as File | null,
    companyBio: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("organizationProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData({
        organizationLogo: null, // Files can't be stored in localStorage
        companyBio: profileData.companyBio || "",
      });
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyBio.trim()) {
      newErrors.companyBio = "Company bio is required";
    } else if (formData.companyBio.trim().length < 50) {
      newErrors.companyBio = "Company bio must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    // Save current data before going back
    const existingData = localStorage.getItem("organizationProfileData");
    const profileData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "organizationProfileData",
      JSON.stringify({
        ...profileData,
        companyBio: formData.companyBio,
      }),
    );

    navigate("/organization-profile-step2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get all profile data
      const savedProfile = localStorage.getItem("organizationProfileData");
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};

      const completeProfileData = {
        ...profileData,
        companyBio: formData.companyBio,
        organizationLogoName: formData.organizationLogo?.name || null,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear stored data
      localStorage.removeItem("organizationProfileData");
      localStorage.removeItem("organizationSignupData");

      // Success - redirect to organization dashboard
      navigate("/organization-dashboard");
    } catch (error) {
      console.error("Profile completion failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoUpload = (file: File) => {
    if (file) {
      setFormData((prev) => ({ ...prev, organizationLogo: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, organizationLogo: null }));
    setLogoPreview(null);
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Step 3 of 3 - Branding & Logo
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Organization Branding
          </h1>
          <p className="text-vm-gray-600">
            Complete your profile with your organization's branding and
            description
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
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-8"
        >
          {/* Logo Upload Section */}
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">
                Organization Logo (Optional)
              </Label>
              <p className="text-sm text-vm-gray-500 mt-1">
                Upload your organization's logo to personalize your profile
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Area */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center hover:border-vm-green/50 transition-colors bg-vm-gray-50">
                  <Camera className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
                  {formData.organizationLogo ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-vm-green" />
                        <p className="text-sm font-medium text-vm-green">
                          {formData.organizationLogo.name}
                        </p>
                      </div>
                      <p className="text-xs text-vm-gray-500">
                        Logo uploaded successfully
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                      >
                        Remove Logo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-vm-gray-600 mb-2">
                        Upload organization logo
                      </p>
                      <p className="text-xs text-vm-gray-500 mb-4">
                        JPG, PNG, SVG (Max 5MB, Recommended: 200x200px)
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoUpload(file);
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("logo-upload")?.click()
                        }
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Logo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Logo Preview */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="border border-vm-gray-200 rounded-lg p-6 bg-white">
                  {logoPreview ? (
                    <div className="text-center">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="max-w-32 max-h-32 mx-auto rounded-lg shadow-sm"
                      />
                      <p className="text-xs text-vm-gray-500 mt-2">
                        Logo preview
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-vm-gray-400">
                      <div className="w-20 h-20 bg-vm-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Palette className="w-8 h-8" />
                      </div>
                      <p className="text-sm">Logo preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Company Bio */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyBio" className="text-lg font-semibold">
                Company Bio *
              </Label>
              <p className="text-sm text-vm-gray-500 mt-1">
                Tell us about your organization, services, and expertise
              </p>
            </div>
            <Textarea
              id="companyBio"
              value={formData.companyBio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, companyBio: e.target.value }))
              }
              placeholder="Describe your organization's mission, services, expertise, and what sets you apart in the immigration industry..."
              rows={6}
              className={`resize-none ${errors.companyBio ? "border-red-500" : ""}`}
            />
            {errors.companyBio && (
              <p className="text-red-500 text-sm">{errors.companyBio}</p>
            )}
            <div className="flex justify-between text-xs text-vm-gray-500">
              <span>Minimum 50 characters required</span>
              <span>{formData.companyBio.length} characters</span>
            </div>
          </div>

          {/* Benefits Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-medium text-blue-900 mb-3">
              Complete Your Organization Profile
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Get verified organization badge
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Access to agent management tools
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Advanced analytics and reporting
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Priority customer support
              </li>
            </ul>
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
                  Finish Profile
                </>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
