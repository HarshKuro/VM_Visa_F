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
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  Sparkles,
  Loader2,
  Send,
  DollarSign,
  Clock,
  FileText,
  Star,
} from "lucide-react";

interface Request {
  id: string;
  title: string;
  client: string;
  type: string;
  country: string;
  budget: string;
  description: string;
  urgency: string;
}

interface ProposalFormProps {
  isOpen: boolean;
  onClose: () => void;
  request: Request;
}

export default function ProposalForm({
  isOpen,
  onClose,
  request,
}: ProposalFormProps) {
  const [formData, setFormData] = useState({
    price: "",
    timeline: "",
    coverLetter: "",
    additionalServices: "",
    milestones: [
      { title: "Initial Consultation & Document Review", duration: "3-5 days" },
      { title: "Application Preparation", duration: "1-2 weeks" },
      { title: "Submission & Follow-up", duration: "2-3 weeks" },
    ],
  });
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const generateAICoverLetter = async () => {
    setIsAIGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const aiCoverLetter = `Dear ${request.client},

I am writing to express my strong interest in your ${request.type} project for ${request.country}. With 8+ years of specialized experience in immigration law and a 94% success rate, I am confident I can provide the expert guidance you need.

**Why I'm the Right Fit:**
• Extensive experience with ${request.type} applications for ${request.country}
• Deep understanding of current immigration policies and requirements
• Proven track record with similar cases and client situations
• Comprehensive approach covering all aspects of the application process

**My Approach:**
I will personally handle your case from start to finish, ensuring:
- Thorough review of your specific situation and eligibility
- Complete preparation of all required documentation
- Strategic guidance on interview preparation (if applicable)
- Ongoing communication and status updates throughout the process

**What You Can Expect:**
✓ Initial consultation within 24 hours of acceptance
✓ Detailed case strategy and timeline
✓ Regular progress updates and milestone tracking
✓ Direct access to me for questions and concerns
✓ Post-approval support and guidance

I understand the importance of this immigration journey for you and your family. My commitment is to provide professional, efficient, and personalized service that maximizes your chances of success.

I look forward to the opportunity to discuss your specific needs and how I can help achieve your immigration goals.

Best regards,
Sarah Johnson
Licensed Immigration Attorney`;

    setFormData((prev) => ({ ...prev, coverLetter: aiCoverLetter }));
    setIsAIGenerating(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }
    if (!formData.timeline.trim()) {
      newErrors.timeline = "Timeline is required";
    }
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Handle proposal submission
    console.log("Submitting proposal:", formData);
    onClose();

    // Show success message (in real app, this would be a toast notification)
    alert("Proposal sent successfully!");
  };

  const suggestedPrices = [
    "$1,500",
    "$2,000",
    "$2,500",
    "$3,000",
    "$3,500",
    "$4,000",
  ];

  const suggestedTimelines = [
    "1-2 weeks",
    "2-3 weeks",
    "3-4 weeks",
    "1-2 months",
    "2-3 months",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-vm-gray-900">
            Send Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-vm-gray-900 mb-4">
                  Request Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-vm-gray-900 mb-1">
                      {request.title}
                    </h4>
                    <p className="text-sm text-vm-gray-600">
                      by {request.client}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-vm-gray-600">Type:</span>
                      <span className="text-sm font-medium">
                        {request.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-vm-gray-600">Country:</span>
                      <span className="text-sm font-medium">
                        {request.country}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-vm-gray-600">Budget:</span>
                      <span className="text-sm font-medium">
                        {request.budget}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-vm-gray-600">Urgency:</span>
                      <Badge
                        className={
                          request.urgency === "urgent"
                            ? "bg-red-100 text-red-800"
                            : request.urgency === "high"
                              ? "bg-orange-100 text-orange-800"
                              : request.urgency === "medium"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-vm-gray-900 mb-2">
                      Description
                    </h5>
                    <p className="text-sm text-vm-gray-600">
                      {request.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Profile Summary */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-vm-gray-900 mb-4">
                  Your Profile
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">4.9/5 rating (247 reviews)</span>
                  </div>
                  <div className="text-sm text-vm-gray-600">
                    <div>94% success rate</div>
                    <div>8+ years experience</div>
                    <div>Specializes in {request.type}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Proposal Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pricing and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Your Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="2,500"
                      className={`pl-10 ${errors.price ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedPrices.map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() =>
                          handleInputChange("price", price.replace("$", ""))
                        }
                        className="text-xs px-2 py-1 bg-vm-gray-100 hover:bg-vm-gray-200 rounded transition-colors"
                      >
                        {price}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Delivery Time *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        handleInputChange("timeline", e.target.value)
                      }
                      placeholder="2-3 weeks"
                      className={`pl-10 ${errors.timeline ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.timeline && (
                    <p className="text-red-500 text-sm">{errors.timeline}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedTimelines.map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        onClick={() => handleInputChange("timeline", timeline)}
                        className="text-xs px-2 py-1 bg-vm-gray-100 hover:bg-vm-gray-200 rounded transition-colors"
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="coverLetter">Cover Letter *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAICoverLetter}
                    disabled={isAIGenerating}
                    className="text-sm"
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
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) =>
                    handleInputChange("coverLetter", e.target.value)
                  }
                  placeholder="Write a compelling cover letter explaining why you're the best fit for this project..."
                  className={`min-h-[200px] resize-none ${errors.coverLetter ? "border-red-500" : ""}`}
                />
                {errors.coverLetter && (
                  <p className="text-red-500 text-sm">{errors.coverLetter}</p>
                )}
                <p className="text-sm text-vm-gray-500">
                  Tip: Mention your relevant experience, approach, and what
                  makes you unique.
                </p>
              </div>

              {/* Project Milestones */}
              <div className="space-y-2">
                <Label>Project Milestones</Label>
                <div className="space-y-3">
                  {formData.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-vm-gray-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-vm-green rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-vm-gray-900">
                          {milestone.title}
                        </div>
                        <div className="text-sm text-vm-gray-600">
                          {milestone.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="space-y-2">
                <Label htmlFor="additionalServices">
                  Additional Services (Optional)
                </Label>
                <Textarea
                  id="additionalServices"
                  value={formData.additionalServices}
                  onChange={(e) =>
                    handleInputChange("additionalServices", e.target.value)
                  }
                  placeholder="Any additional services you can provide (e.g., post-approval support, document translation, etc.)"
                  className="min-h-[80px] resize-none"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">
                  Proposal Terms
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• This proposal is valid for 30 days</li>
                  <li>• Payment terms: 50% upfront, 50% upon completion</li>
                  <li>• Includes unlimited revisions during the project</li>
                  <li>• Direct communication throughout the process</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-vm-green hover:bg-vm-green-600 text-white h-12"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Proposal
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
