import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building,
  User,
  Mail,
  Globe,
} from "lucide-react";

interface OrganizationFormData {
  organizationName: string;
  adminName: string;
  orgEmail: string;
  phone: string;
  website: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function OrganizationSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: "",
    adminName: "",
    orgEmail: "",
    phone: "",
    website: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<OrganizationFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("organizationSignupData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData((prev) => ({ ...prev, ...parsed.formData }));
      setCurrentStep(parsed.currentStep || 1);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "organizationSignupData",
      JSON.stringify({ formData, currentStep }),
    );
  }, [formData, currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<OrganizationFormData> = {};

    switch (step) {
      case 1:
        if (!formData.organizationName.trim()) {
          newErrors.organizationName = "Organization name is required";
        }
        if (!formData.adminName.trim()) {
          newErrors.adminName = "Admin name is required";
        }
        break;
      case 2:
        if (!formData.orgEmail.trim()) {
          newErrors.orgEmail = "Organization email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.orgEmail)) {
          newErrors.orgEmail = "Please enter a valid email address";
        } else if (!isBusinessEmail(formData.orgEmail)) {
          newErrors.orgEmail =
            "Please use a business domain email (not gmail, yahoo, etc.)";
        }
        if (!formData.phone.trim()) {
          newErrors.phone = "Phone number is required";
        }
        break;
      case 3:
        if (formData.website && !isValidUrl(formData.website)) {
          newErrors.website = "Please enter a valid URL";
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isBusinessEmail = (email: string): boolean => {
    const personalDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return domain && !personalDomains.includes(domain);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep) || !formData.agreeToTerms) {
      if (!formData.agreeToTerms) {
        setErrors((prev) => ({
          ...prev,
          agreeToTerms: "You must agree to the terms",
        }));
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save signup data for profile completion
      localStorage.setItem("organizationSignupData", JSON.stringify(formData));
      localStorage.removeItem("organizationSignupData");

      alert(
        "Organization account created successfully! Please complete your profile setup.",
      );
      navigate("/organization-profile-step1");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (
    field: keyof OrganizationFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const stepIcons = [Building, Mail, Globe];
  const stepTitles = ["Organization Info", "Contact Details", "Account Setup"];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
              Create Organization Account
            </h1>
            <p className="text-vm-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }, (_, index) => {
                const step = index + 1;
                const Icon = stepIcons[index];
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;

                return (
                  <div key={step} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-vm-green text-white"
                          : isCurrent
                            ? "bg-vm-green text-white"
                            : "bg-vm-gray-200 text-vm-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-xs mt-2 text-vm-gray-600 text-center">
                      {stepTitles[index]}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-vm-gray-200 rounded-full h-2">
              <div
                className="bg-vm-green h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg border border-vm-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="relative">
                {/* Step 1: Organization Name & Admin Name */}
                {currentStep === 1 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Organization Information
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Tell us about your organization
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="organizationName">
                            Organization Name *
                          </Label>
                          <Input
                            id="organizationName"
                            type="text"
                            value={formData.organizationName}
                            onChange={(e) =>
                              updateFormData("organizationName", e.target.value)
                            }
                            placeholder="Enter your company's legal name"
                            className={`h-12 ${errors.organizationName ? "border-red-500" : ""}`}
                            autoFocus
                          />
                          {errors.organizationName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.organizationName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="adminName">Admin Name *</Label>
                          <Input
                            id="adminName"
                            type="text"
                            value={formData.adminName}
                            onChange={(e) =>
                              updateFormData("adminName", e.target.value)
                            }
                            placeholder="Name of the person who will manage this account"
                            className={`h-12 ${errors.adminName ? "border-red-500" : ""}`}
                          />
                          {errors.adminName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.adminName}
                            </p>
                          )}
                          <p className="text-sm text-vm-gray-500">
                            This person will have full administrative access to
                            the organization account
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Org Email & Phone */}
                {currentStep === 2 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Contact Information
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          How can we reach your organization?
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="orgEmail">Organization Email *</Label>
                          <Input
                            id="orgEmail"
                            type="email"
                            value={formData.orgEmail}
                            onChange={(e) =>
                              updateFormData("orgEmail", e.target.value)
                            }
                            placeholder="admin@yourcompany.com"
                            className={`h-12 ${errors.orgEmail ? "border-red-500" : ""}`}
                            autoFocus
                          />
                          {errors.orgEmail && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.orgEmail}
                            </p>
                          )}
                          <p className="text-sm text-vm-gray-500">
                            Must be a business domain email (not Gmail, Yahoo,
                            etc.)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            placeholder="Enter your organization's phone number"
                            className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Website & Password */}
                {currentStep === 3 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Account Setup
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Complete your organization profile
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="website">Website (Optional)</Label>
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) =>
                              updateFormData("website", e.target.value)
                            }
                            placeholder="https://yourcompany.com"
                            className={`h-12 ${errors.website ? "border-red-500" : ""}`}
                            autoFocus
                          />
                          {errors.website && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.website}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Password *</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                              updateFormData("password", e.target.value)
                            }
                            placeholder="Create a secure password"
                            className={`h-12 ${errors.password ? "border-red-500" : ""}`}
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm Password *
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              updateFormData("confirmPassword", e.target.value)
                            }
                            placeholder="Confirm your password"
                            className={`h-12 ${errors.confirmPassword ? "border-red-500" : ""}`}
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>

                        <div className="space-y-4 pt-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onCheckedChange={(checked) =>
                                updateFormData(
                                  "agreeToTerms",
                                  checked as boolean,
                                )
                              }
                              className="mt-1"
                            />
                            <Label
                              htmlFor="agreeToTerms"
                              className="text-sm text-vm-gray-600"
                            >
                              I agree to the{" "}
                              <a
                                href="/terms"
                                className="text-vm-blue hover:text-vm-blue-600"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="/privacy"
                                className="text-vm-blue hover:text-vm-blue-600"
                              >
                                Privacy Policy
                              </a>{" "}
                              on behalf of my organization
                            </Label>
                          </div>
                          {errors.agreeToTerms && (
                            <p className="text-red-500 text-sm">
                              {errors.agreeToTerms}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="bg-vm-gray-50 px-8 py-6 flex justify-between items-center">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.agreeToTerms}
                  className="bg-vm-green hover:bg-vm-green-600 text-white flex items-center"
                >
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Organization Account"}
                  {!isSubmitting && <CheckCircle className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center mt-6">
            <p className="text-sm text-vm-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-vm-blue hover:text-vm-blue-600"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      <AIChatAssistant />
    </div>
  );
}
