import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  Briefcase,
  Star,
  Upload,
} from "lucide-react";

interface AgentFormData {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  yearsOfExperience: string;
  areasOfExpertise: string[];
  licenseBio: string;
  licenseFile: File | null;
  agreeToTerms: boolean;
}

const expertiseOptions = [
  "Canada PR",
  "Study Visa",
  "Business Immigration",
  "Work Permits",
  "Family Sponsorship",
  "Express Entry",
  "Provincial Nominee Program",
  "Temporary Residence",
  "Citizenship Applications",
  "Appeals & Reviews",
];

export default function AgentSignup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    yearsOfExperience: "",
    areasOfExpertise: [],
    licenseBio: "",
    licenseFile: null,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<AgentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("agentSignupData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData((prev) => ({ ...prev, ...parsed.formData }));
      setCurrentStep(parsed.currentStep || 1);
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = { ...formData };
    delete dataToSave.licenseFile; // Don't save file to localStorage
    localStorage.setItem(
      "agentSignupData",
      JSON.stringify({ formData: dataToSave, currentStep }),
    );
  }, [formData, currentStep]);

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<AgentFormData> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required";
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
        }
        break;
      case 4:
        if (!formData.yearsOfExperience.trim()) {
          newErrors.yearsOfExperience = "Years of experience is required";
        } else if (
          isNaN(Number(formData.yearsOfExperience)) ||
          Number(formData.yearsOfExperience) < 0
        ) {
          newErrors.yearsOfExperience = "Please enter a valid number";
        }
        break;
      case 5:
        if (formData.areasOfExpertise.length === 0) {
          newErrors.areasOfExpertise =
            "Please select at least one area of expertise";
        }
        break;
      case 6:
        // Optional step - no validation required
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
    if (!formData.agreeToTerms) {
      setErrors((prev) => ({
        ...prev,
        agreeToTerms: "You must agree to the terms",
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      localStorage.removeItem("agentSignupData");
      alert("Agent account created successfully! Redirecting to dashboard...");
      navigate("/agent-dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof AgentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleExpertise = (expertise: string) => {
    setFormData((prev) => ({
      ...prev,
      areasOfExpertise: prev.areasOfExpertise.includes(expertise)
        ? prev.areasOfExpertise.filter((e) => e !== expertise)
        : [...prev.areasOfExpertise, expertise],
    }));
  };

  const stepIcons = [User, Mail, Phone, Briefcase, Star, Upload];
  const stepTitles = [
    "Personal",
    "Account",
    "Contact",
    "Experience",
    "Expertise",
    "License",
  ];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
              Create Your Agent Account
            </h1>
            <p className="text-vm-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 overflow-x-auto">
              {Array.from({ length: totalSteps }, (_, index) => {
                const step = index + 1;
                const Icon = stepIcons[index];
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;

                return (
                  <div
                    key={step}
                    className="flex flex-col items-center min-w-0 flex-shrink-0"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-vm-green text-white"
                          : isCurrent
                            ? "bg-vm-green text-white"
                            : "bg-vm-gray-200 text-vm-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs mt-1 text-vm-gray-600 text-center">
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
                {/* Step 1-3: Same as Client */}
                {currentStep === 1 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          What's your full name?
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          This will appear on your agent profile
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
                          className={`h-12 text-lg ${errors.fullName ? "border-red-500" : ""}`}
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

                {currentStep === 2 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Create your account
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Set up your professional login credentials
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
                            placeholder="Enter your professional email"
                            className={`h-12 ${errors.email ? "border-red-500" : ""}`}
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
                            className={`h-12 ${errors.password ? "border-red-500" : ""}`}
                          />
                          {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Contact Information
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Clients will use this to reach you
                        </p>
                      </div>

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
                          className={`h-12 ${errors.contactNumber ? "border-red-500" : ""}`}
                          autoFocus
                        />
                        {errors.contactNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.contactNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Years of Experience */}
                {currentStep === 4 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Professional Experience
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          How many years have you been practicing immigration
                          law?
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                          id="experience"
                          type="number"
                          min="0"
                          max="50"
                          value={formData.yearsOfExperience}
                          onChange={(e) =>
                            updateFormData("yearsOfExperience", e.target.value)
                          }
                          placeholder="e.g., 5"
                          className={`h-12 text-lg ${errors.yearsOfExperience ? "border-red-500" : ""}`}
                          autoFocus
                        />
                        {errors.yearsOfExperience && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.yearsOfExperience}
                          </p>
                        )}
                        <p className="text-sm text-vm-gray-500">
                          Include experience from previous firms or as an
                          independent practitioner
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Areas of Expertise */}
                {currentStep === 5 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          Areas of Expertise
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Select all immigration areas you specialize in
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {expertiseOptions.map((expertise) => (
                            <div
                              key={expertise}
                              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                                formData.areasOfExpertise.includes(expertise)
                                  ? "border-vm-green bg-vm-green/5 text-vm-green"
                                  : "border-vm-gray-200 hover:border-vm-green/50"
                              }`}
                              onClick={() => toggleExpertise(expertise)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{expertise}</span>
                                {formData.areasOfExpertise.includes(
                                  expertise,
                                ) && (
                                  <CheckCircle className="w-5 h-5 text-vm-green" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {errors.areasOfExpertise && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.areasOfExpertise}
                          </p>
                        )}
                        <p className="text-sm text-vm-gray-500">
                          Selected: {formData.areasOfExpertise.length} area(s)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: License Upload/Bio */}
                {currentStep === 6 && (
                  <div className="animate-in slide-in-from-right-5 duration-300">
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-vm-gray-900">
                          License & Bio (Optional)
                        </h2>
                        <p className="text-vm-gray-600 mt-2">
                          Upload your license and add a professional bio
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="licenseBio">Professional Bio</Label>
                          <Textarea
                            id="licenseBio"
                            value={formData.licenseBio}
                            onChange={(e) =>
                              updateFormData("licenseBio", e.target.value)
                            }
                            placeholder="Write a brief description of your experience and specializations..."
                            className="min-h-[120px]"
                          />
                          <p className="text-sm text-vm-gray-500">
                            This will be displayed on your agent profile
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="licenseFile">
                            License Document (Optional)
                          </Label>
                          <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-6 text-center">
                            <Upload className="w-8 h-8 text-vm-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-vm-gray-600 mb-2">
                              Upload your professional license or certification
                            </p>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) =>
                                updateFormData(
                                  "licenseFile",
                                  e.target.files?.[0] || null,
                                )
                              }
                              className="hidden"
                              id="licenseFile"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById("licenseFile")?.click()
                              }
                            >
                              Choose File
                            </Button>
                            {formData.licenseFile && (
                              <p className="text-sm text-vm-green mt-2">
                                {formData.licenseFile.name}
                              </p>
                            )}
                          </div>
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
                  {isSubmitting
                    ? "Creating Account..."
                    : "Create Agent Account"}
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
