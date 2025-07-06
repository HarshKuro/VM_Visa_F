import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import { CheckCircle, User, Mail, Briefcase } from "lucide-react";

interface AgentFormData {
  fullName: string;
  email: string;
  agreeToTerms: boolean;
}

export default function AgentSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AgentFormData>({
    fullName: "",
    email: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<AgentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<AgentFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
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
      // Simulate API call to create basic agent account
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store basic info for profile completion
      localStorage.setItem(
        "agentBasicInfo",
        JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
        }),
      );

      // Redirect directly to profile completion
      navigate("/agent-profile-step1");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (
    field: keyof AgentFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-vm-green/10 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-vm-green" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-vm-gray-900 mb-2">
              Join as Immigration Expert
            </h1>
            <p className="text-vm-gray-600">
              Start your journey as a verified immigration agent on VM Visa
            </p>
          </div>

          {/* Simple Signup Form */}
          <div className="bg-white rounded-lg shadow-lg border border-vm-gray-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="Enter your full professional name"
                    className={`h-12 ${errors.fullName ? "border-red-500" : ""}`}
                    autoFocus
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Professional Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="Enter your professional email"
                    className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        updateFormData("agreeToTerms", checked as boolean)
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-vm-green hover:bg-vm-green-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Create Agent Account
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Next Steps Info */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              What happens next?
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Your basic agent account will be created
              </li>
              <li className="flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Log in and complete your professional profile
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-600" />
                Get verified and start receiving client requests
              </li>
            </ul>
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
