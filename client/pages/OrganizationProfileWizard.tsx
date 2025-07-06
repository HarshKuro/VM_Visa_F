import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import {
  FileText,
  Palette,
  Upload,
  Camera,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";

interface FormData {
  // Step 1: Organization Details
  organizationName: string;
  countryOfOperation: string;
  officialEmail: string;
  contactPhone: string;
  industryType: string;

  // Step 2: Contact & Address
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  websiteUrl: string;

  // Step 3: Legal & Verification
  panNumber: string;
  registrationNumber: string;
  verificationDocument: File | null;

  // Step 4: Branding & Bio
  organizationLogo: File | null;
  companyBio: string;
  servicesOffered: string[];
}

export default function OrganizationProfileWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    countryOfOperation: "",
    officialEmail: "",
    contactPhone: "",
    industryType: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    websiteUrl: "",
    panNumber: "",
    registrationNumber: "",
    verificationDocument: null,
    organizationLogo: null,
    companyBio: "",
    servicesOffered: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const totalSteps = 4;

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

  const servicesOptions = [
    "Work Visa Consulting",
    "Student Visa Assistance",
    "Family Immigration",
    "Business Immigration",
    "Citizenship Applications",
    "Appeals & Renewals",
    "Document Translation",
    "Legal Representation",
  ];

  // Load existing data
  useEffect(() => {
    const savedProfile = localStorage.getItem("organizationProfileData");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setFormData({ ...formData, ...profileData });
    }

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

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!formData.organizationName.trim()) {
          newErrors.organizationName = "Organization name is required";
        }
        if (!formData.countryOfOperation) {
          newErrors.countryOfOperation = "Country is required";
        }
        if (!formData.officialEmail.trim()) {
          newErrors.officialEmail = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.officialEmail)) {
          newErrors.officialEmail = "Invalid email format";
        }
        if (!formData.contactPhone.trim()) {
          newErrors.contactPhone = "Phone number is required";
        }
        if (!formData.industryType) {
          newErrors.industryType = "Industry type is required";
        }
        break;

      case 2:
        if (!formData.streetAddress.trim()) {
          newErrors.streetAddress = "Street address is required";
        }
        if (!formData.city.trim()) {
          newErrors.city = "City is required";
        }
        if (!formData.stateProvince.trim()) {
          newErrors.stateProvince = "State/Province is required";
        }
        if (!formData.postalCode.trim()) {
          newErrors.postalCode = "Postal code is required";
        }
        break;

      case 3:
        if (!formData.panNumber.trim()) {
          newErrors.panNumber = "PAN/Government ID is required";
        }
        if (!formData.registrationNumber.trim()) {
          newErrors.registrationNumber = "Registration number is required";
        }
        if (!formData.verificationDocument) {
          newErrors.verificationDocument = "Verification document is required";
        }
        break;

      case 4:
        if (!formData.companyBio.trim()) {
          newErrors.companyBio = "Company bio is required";
        } else if (formData.companyBio.trim().length < 50) {
          newErrors.companyBio = "Company bio must be at least 50 characters";
        }
        if (formData.servicesOffered.length === 0) {
          newErrors.servicesOffered = "Please select at least one service";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      saveData();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    saveData();
  };

  const saveData = () => {
    localStorage.setItem("organizationProfileData", JSON.stringify(formData));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      localStorage.removeItem("organizationProfileData");
      localStorage.removeItem("organizationSignupData");

      navigate("/organization-dashboard");
    } catch (error) {
      console.error("Profile completion failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (file: File, type: "verification" | "logo") => {
    if (type === "verification") {
      updateField("verificationDocument", file);
    } else {
      updateField("organizationLogo", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleService = (service: string) => {
    const current = formData.servicesOffered;
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    updateField("servicesOffered", updated);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-vm-gray-900 mb-2">
          Organization Details
        </h2>
        <p className="text-vm-gray-600">Tell us about your organization</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization Name *</Label>
          <Input
            id="organizationName"
            value={formData.organizationName}
            onChange={(e) => updateField("organizationName", e.target.value)}
            placeholder="Your organization's legal name"
            className={`h-12 ${errors.organizationName ? "border-red-500" : ""}`}
          />
          {errors.organizationName && (
            <p className="text-red-500 text-sm">{errors.organizationName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="countryOfOperation">Country of Operation *</Label>
          <Select
            value={formData.countryOfOperation}
            onValueChange={(value) => updateField("countryOfOperation", value)}
          >
            <SelectTrigger
              className={`h-12 ${errors.countryOfOperation ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select country" />
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
            <p className="text-red-500 text-sm">{errors.countryOfOperation}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="officialEmail">Official Email *</Label>
          <Input
            id="officialEmail"
            type="email"
            value={formData.officialEmail}
            onChange={(e) => updateField("officialEmail", e.target.value)}
            placeholder="contact@yourorg.com"
            className={`h-12 ${errors.officialEmail ? "border-red-500" : ""}`}
          />
          {errors.officialEmail && (
            <p className="text-red-500 text-sm">{errors.officialEmail}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone *</Label>
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
            <SelectValue placeholder="Select your industry" />
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
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-vm-gray-900 mb-2">
          Contact & Address
        </h2>
        <p className="text-vm-gray-600">
          Provide your organization's address and contact details
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address *</Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => updateField("streetAddress", e.target.value)}
            placeholder="123 Business Street, Suite 100"
            className={`h-12 ${errors.streetAddress ? "border-red-500" : ""}`}
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm">{errors.streetAddress}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="New York"
              className={`h-12 ${errors.city ? "border-red-500" : ""}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateProvince">State/Province *</Label>
            <Input
              id="stateProvince"
              value={formData.stateProvince}
              onChange={(e) => updateField("stateProvince", e.target.value)}
              placeholder="NY"
              className={`h-12 ${errors.stateProvince ? "border-red-500" : ""}`}
            />
            {errors.stateProvince && (
              <p className="text-red-500 text-sm">{errors.stateProvince}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
              placeholder="10001"
              className={`h-12 ${errors.postalCode ? "border-red-500" : ""}`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
          <Input
            id="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={(e) => updateField("websiteUrl", e.target.value)}
            placeholder="https://www.yourorganization.com"
            className="h-12"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-vm-gray-900 mb-2">
          Legal & Verification
        </h2>
        <p className="text-vm-gray-600">
          Provide legal documents for verification
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN/Government ID *</Label>
            <Input
              id="panNumber"
              value={formData.panNumber}
              onChange={(e) => updateField("panNumber", e.target.value)}
              placeholder="Government issued ID"
              className={`h-12 ${errors.panNumber ? "border-red-500" : ""}`}
            />
            {errors.panNumber && (
              <p className="text-red-500 text-sm">{errors.panNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number *</Label>
            <Input
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) =>
                updateField("registrationNumber", e.target.value)
              }
              placeholder="Company registration number"
              className={`h-12 ${errors.registrationNumber ? "border-red-500" : ""}`}
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-sm">
                {errors.registrationNumber}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Verification Document *</Label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              errors.verificationDocument
                ? "border-red-300 bg-red-50"
                : "border-vm-gray-300 hover:border-vm-green/50"
            }`}
          >
            <FileText className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
            {formData.verificationDocument ? (
              <div className="space-y-2">
                <CheckCircle className="w-8 h-8 text-vm-green mx-auto" />
                <p className="text-sm font-medium text-vm-green">
                  {formData.verificationDocument.name}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateField("verificationDocument", null)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-vm-gray-600 mb-4">
                  Upload company verification document (Certificate of
                  Incorporation, Business License, etc.)
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "verification");
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
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-vm-gray-900 mb-2">
          Branding & Services
        </h2>
        <p className="text-vm-gray-600">Complete your organization profile</p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Label>Organization Logo (Optional)</Label>
            <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center hover:border-vm-green/50 transition-colors">
              <Camera className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
              {formData.organizationLogo ? (
                <div className="space-y-2">
                  <CheckCircle className="w-6 h-6 text-vm-green mx-auto" />
                  <p className="text-sm font-medium text-vm-green">
                    {formData.organizationLogo.name}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateField("organizationLogo", null);
                      setLogoPreview(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-vm-gray-600 mb-4">
                    JPG, PNG, SVG (Max 5MB)
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "logo");
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

          <div className="space-y-4">
            <Label>Preview</Label>
            <div className="border border-vm-gray-200 rounded-lg p-6 bg-white h-48 flex items-center justify-center">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-w-32 max-h-32 rounded-lg"
                />
              ) : (
                <div className="text-center text-vm-gray-400">
                  <Palette className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Logo preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Bio */}
        <div className="space-y-4">
          <Label htmlFor="companyBio">Company Bio *</Label>
          <Textarea
            id="companyBio"
            value={formData.companyBio}
            onChange={(e) => updateField("companyBio", e.target.value)}
            placeholder="Describe your organization's mission, expertise, and what sets you apart..."
            rows={6}
            className={`resize-none ${errors.companyBio ? "border-red-500" : ""}`}
          />
          {errors.companyBio && (
            <p className="text-red-500 text-sm">{errors.companyBio}</p>
          )}
          <div className="flex justify-between text-xs text-vm-gray-500">
            <span>Minimum 50 characters</span>
            <span>{formData.companyBio.length} characters</span>
          </div>
        </div>

        {/* Services Offered */}
        <div className="space-y-4">
          <Label>Services Offered *</Label>
          <div className="grid grid-cols-2 gap-3">
            {servicesOptions.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                  formData.servicesOffered.includes(service)
                    ? "border-vm-green bg-vm-green/5 text-vm-green"
                    : "border-vm-gray-200 hover:border-vm-green/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{service}</span>
                  {formData.servicesOffered.includes(service) && (
                    <CheckCircle className="w-4 h-4 text-vm-green" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {errors.servicesOffered && (
            <p className="text-red-500 text-sm">{errors.servicesOffered}</p>
          )}
          <p className="text-sm text-vm-gray-500">
            Selected: {formData.servicesOffered.length} service(s)
          </p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
            Organization Profile Setup
          </h1>
          <p className="text-vm-gray-600">
            Complete your organization profile to get started
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8">
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-vm-gray-200 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={
                currentStep === 1 ? () => navigate("/login") : handlePrevious
              }
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? "Back to Login" : "Previous"}
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Setup
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
