import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, Loader2, CheckCircle } from "lucide-react";

interface PostRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostRequestModal({
  isOpen,
  onClose,
}: PostRequestModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    visaType: "",
    country: "",
    description: "",
    budget: "",
    timeline: "",
    urgency: "normal",
  });
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const visaTypes = [
    "Work Visa (H1-B, L1, O1)",
    "Student Visa (F1, M1, J1)",
    "Family Immigration",
    "Investment Visa (EB5, E2)",
    "Permanent Residency",
    "Tourist/Visitor Visa",
    "Business Visa",
    "Transit Visa",
    "Other",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Switzerland",
    "New Zealand",
    "Singapore",
    "Other",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Trigger AI suggestions when certain fields are filled
    if (
      (field === "visaType" || field === "country") &&
      value &&
      formData.visaType &&
      formData.country
    ) {
      generateAISuggestions();
    }
  };

  const generateAISuggestions = async () => {
    if (!formData.visaType || !formData.country) return;

    setIsAIGenerating(true);
    setShowAISuggestions(true);

    // Simulate AI API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const suggestions = [
      `Professional ${formData.visaType} application assistance for ${formData.country}`,
      `Comprehensive immigration support for ${formData.visaType} to ${formData.country} with document review`,
      `Expert guidance for ${formData.visaType} process including interview preparation and timeline optimization`,
    ];

    setAISuggestions(suggestions);
    setIsAIGenerating(false);
  };

  const useAISuggestion = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, title: suggestion }));
    setShowAISuggestions(false);
  };

  const generateAIDescription = async () => {
    if (!formData.visaType || !formData.country) {
      alert("Please select visa type and country first");
      return;
    }

    setIsAIGenerating(true);

    // Simulate AI API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const aiDescription = `I am seeking professional assistance with my ${formData.visaType} application for ${formData.country}. I need comprehensive support including:

• Document preparation and review
• Application form completion
• Interview preparation and guidance
• Timeline management and deadline tracking
• Expert advice on requirements and procedures

I am looking for an experienced immigration consultant who can guide me through the entire process and ensure my application is submitted correctly and on time. Please provide your expertise, timeline estimates, and fee structure.

I am committed to providing all necessary documentation promptly and following professional guidance throughout the process.`;

    setFormData((prev) => ({ ...prev, description: aiDescription }));
    setIsAIGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitting visa request:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-vm-gray-900">
            Post Visa Help Request
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field with AI Suggestions */}
          <div className="space-y-2">
            <Label htmlFor="title">Request Title</Label>
            <div className="space-y-2">
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., H1-B Visa Application for Software Engineer"
                className="h-12"
              />

              {showAISuggestions && (
                <div className="border border-vm-gray-200 rounded-lg p-4 bg-vm-gray-50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-vm-green" />
                    <span className="text-sm font-medium text-vm-gray-700">
                      AI Suggestions
                    </span>
                  </div>

                  {isAIGenerating ? (
                    <div className="flex items-center space-x-2 text-sm text-vm-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating suggestions...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {aiSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => useAISuggestion(suggestion)}
                          className="block w-full text-left p-2 text-sm bg-white border border-vm-gray-200 rounded hover:border-vm-green hover:bg-vm-green/5 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Visa Type and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visaType">Visa Type</Label>
              <Select
                value={formData.visaType}
                onValueChange={(value) => handleInputChange("visaType", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  {visaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Destination Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="h-12">
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
            </div>
          </div>

          {/* Description with AI Generator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAIDescription}
                disabled={
                  isAIGenerating || !formData.visaType || !formData.country
                }
                className="text-xs"
              >
                {isAIGenerating ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : (
                  <Sparkles className="w-3 h-3 mr-1" />
                )}
                {isAIGenerating ? "Generating..." : "Use AI to Write"}
              </Button>
            </div>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your immigration needs, timeline, and any specific requirements..."
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange("budget", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000+">$10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Preferred Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleInputChange("timeline", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP (Rush processing)</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <Label>Urgency Level</Label>
            <div className="flex space-x-2">
              {[
                {
                  value: "low",
                  label: "Low",
                  color: "bg-green-100 text-green-800",
                },
                {
                  value: "normal",
                  label: "Normal",
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  value: "high",
                  label: "High",
                  color: "bg-yellow-100 text-yellow-800",
                },
                {
                  value: "urgent",
                  label: "Urgent",
                  color: "bg-red-100 text-red-800",
                },
              ].map((urgency) => (
                <button
                  key={urgency.value}
                  type="button"
                  onClick={() => handleInputChange("urgency", urgency.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    formData.urgency === urgency.value
                      ? urgency.color + " ring-2 ring-offset-1"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {urgency.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-vm-green hover:bg-vm-green-600 text-white h-12"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Post Request
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 h-12"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
