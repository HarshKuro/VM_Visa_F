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
  User,
  Mail,
  Phone,
} from "lucide-react";

interface ClientFormData {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  agreeToTerms: boolean;
}

export default function ClientSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ClientFormData>({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<ClientFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("clientSignupData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed.formData || formData);
      setCurrentStep(parsed.currentStep || 1);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "clientSignupData",
      JSON.stringify({ formData, currentStep }),
    );
  }, [formData, currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ClientFormData> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
          newErrors.fullName = "Full name must be at least 2 characters";
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
        break;
      case 3:
        if (!formData.contactNumber.trim()) {
          newErrors.contactNumber = "Contact number is required";
        } else if (
          !/^[\+]?[1-9][\d]{0,15}$/.test(
            formData.contactNumber.replace(/[\s\-\(\)]/g, ""),
          )
        ) {
          newErrors.contactNumber = "Please enter a valid phone number";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear saved data
      localStorage.removeItem("clientSignupData");

      // Redirect to client dashboard (placeholder)
      alert("Account created successfully! Redirecting to dashboard...");
      navigate("/client-dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (
    field: keyof ClientFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const stepIcons = [User, Mail, Phone];
  const stepTitles = ["Personal Info", "Account Details", "Contact Info"];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
              Create Your Client Account
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
                {/* Step 1: Full Name */}
                {currentStep === 1 && (
                  <div
                    className="animate-in slide-in-from-right-5 duration-300"
                    key="step1"
                  >
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          What's your full name?
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          This will be used on your official documents
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            updateFormData("fullName", e.target.value)
                          }
                          placeholder="Enter your full name"
                          className={`h-12 text-lg ${
                            errors.fullName ? "border-red-500" : ""
                          }`}
                          autoFocus
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Email & Password */}
                {currentStep === 2 && (
                  <div
                    className="animate-in slide-in-from-right-5 duration-300"
                    key="step2"
                  >
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Create your account
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Set up your login credentials
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            placeholder="Enter your email address"
                            className={`h-12 ${
                              errors.email ? "border-red-500" : ""
                            }`}
                            autoFocus
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                              updateFormData("password", e.target.value)
                            }
                            placeholder="Create a secure password"
                            className={`h-12 ${
                              errors.password ? "border-red-500" : ""
                            }`}
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password}
                            </p>
                          )}
                          <p className="text-sm text-vm-gray-500">
                            Password must be at least 8 characters long
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Number */}
                {currentStep === 3 && (
                  <div
                    className="animate-in slide-in-from-right-5 duration-300"
                    key="step3"
                  >
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Contact Information
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          We'll use this to send important updates about your
                          application
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber">Phone Number</Label>
                          <Input
                            id="contactNumber"
                            type="tel"
                            value={formData.contactNumber}
                            onChange={(e) =>
                              updateFormData("contactNumber", e.target.value)
                            }
                            placeholder="Enter your phone number"
                            className={`h-12 ${
                              errors.contactNumber ? "border-red-500" : ""
                            }`}
                            autoFocus
                          />
                          {errors.contactNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.contactNumber}
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
                              </a>
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
                  {isSubmitting ? "Creating Account..." : "Create Account"}
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
