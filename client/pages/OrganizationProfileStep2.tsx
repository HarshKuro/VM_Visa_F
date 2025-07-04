import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function OrganizationProfileStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    panNumber: "",
    registrationNumber: "",
    websiteUrl: "",
    verificationDocument: null as File | null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("organizationProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData({
        panNumber: profileData.panNumber || "",
        registrationNumber: profileData.registrationNumber || "",
        websiteUrl: profileData.websiteUrl || "",
        verificationDocument: null, // Files can't be stored in localStorage
      });
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "Organization PAN/Government ID is required";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Company registration number is required";
    }

    if (formData.websiteUrl && !isValidUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = "Please enter a valid website URL";
    }

    if (!formData.verificationDocument) {
      newErrors.verificationDocument =
        "Company verification document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save to localStorage (excluding file)
    const existingData = localStorage.getItem("organizationProfileData");
    const profileData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "organizationProfileData",
      JSON.stringify({
        ...profileData,
        panNumber: formData.panNumber,
        registrationNumber: formData.registrationNumber,
        websiteUrl: formData.websiteUrl,
        verificationDocumentName: formData.verificationDocument?.name || null,
      }),
    );

    navigate("/organization-profile-step3");
  };

  const handleBack = () => {
    // Save current data before going back
    const existingData = localStorage.getItem("organizationProfileData");
    const profileData = existingData ? JSON.parse(existingData) : {};

    localStorage.setItem(
      "organizationProfileData",
      JSON.stringify({
        ...profileData,
        panNumber: formData.panNumber,
        registrationNumber: formData.registrationNumber,
        websiteUrl: formData.websiteUrl,
      }),
    );

    navigate("/organization-profile-step1");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, verificationDocument: file }));
    if (errors.verificationDocument) {
      setErrors((prev) => ({ ...prev, verificationDocument: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Step 2 of 3 - Legal & Verification
          </div>
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Legal & Verification Details
          </h1>
          <p className="text-vm-gray-600">
            Provide your organization's legal information and verification
            documents
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-vm-gray-700">
              Profile Setup Progress
            </span>
            <span className="text-sm text-vm-gray-500">67% Complete</span>
          </div>
          <Progress value={67} className="h-3" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleNext}
          className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="panNumber">
                Organization PAN Number / Government ID *
              </Label>
              <Input
                id="panNumber"
                value={formData.panNumber}
                onChange={(e) => updateField("panNumber", e.target.value)}
                placeholder="Enter PAN number or government-issued ID"
                className={`h-12 ${errors.panNumber ? "border-red-500" : ""}`}
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm">{errors.panNumber}</p>
              )}
              <p className="text-sm text-vm-gray-500">
                Tax identification number or equivalent government ID
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">
                Company Registration Number *
              </Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) =>
                  updateField("registrationNumber", e.target.value)
                }
                placeholder="Enter company registration/incorporation number"
                className={`h-12 ${errors.registrationNumber ? "border-red-500" : ""}`}
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-sm">
                  {errors.registrationNumber}
                </p>
              )}
              <p className="text-sm text-vm-gray-500">
                Official registration number from company registrar
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                placeholder="https://www.yourorganization.com"
                className={`h-12 ${errors.websiteUrl ? "border-red-500" : ""}`}
              />
              {errors.websiteUrl && (
                <p className="text-red-500 text-sm">{errors.websiteUrl}</p>
              )}
            </div>

            {/* Document Upload */}
            <div className="space-y-4">
              <Label>Company Verification Document *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  errors.verificationDocument
                    ? "border-red-300 bg-red-50"
                    : "border-vm-gray-300 hover:border-vm-green/50 bg-vm-gray-50"
                }`}
              >
                <FileText className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
                {formData.verificationDocument ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-vm-green" />
                      <p className="text-sm font-medium text-vm-green">
                        {formData.verificationDocument.name}
                      </p>
                    </div>
                    <p className="text-xs text-vm-gray-500">
                      File uploaded successfully
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          verificationDocument: null,
                        }))
                      }
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-vm-gray-600 mb-2">
                      Upload company verification document
                    </p>
                    <p className="text-xs text-vm-gray-500 mb-4">
                      Accepted formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                      className="hidden"
                      id="verification-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("verification-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
              {errors.verificationDocument && (
                <p className="text-red-500 text-sm">
                  {errors.verificationDocument}
                </p>
              )}
              <div className="text-xs text-vm-gray-500">
                <p className="font-medium mb-1">Accepted documents:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Certificate of Incorporation</li>
                  <li>Business License</li>
                  <li>Tax Registration Certificate</li>
                  <li>Professional License (for immigration firms)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">
                  Secure Verification Process
                </h4>
                <p className="text-green-800 text-sm">
                  All documents are encrypted and stored securely. Our
                  verification team will review your documents within 24-48
                  hours to activate your organization account.
                </p>
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
