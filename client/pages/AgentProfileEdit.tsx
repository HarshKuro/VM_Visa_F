import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import {
  ArrowLeft,
  Eye,
  Settings,
  User,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Camera,
  MessageSquare,
  Plus,
  X,
  Save,
  AlertCircle,
  Calendar,
  MapPin,
  Trash2,
  Upload,
  CheckCircle,
} from "lucide-react";

interface Specialization {
  id: string;
  area: string;
  yearsExperience: number;
  expertiseLevel: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  license?: string;
}

interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  verificationUrl: string;
}

interface Language {
  id: string;
  language: string;
  proficiency: string;
}

interface BasicInfo {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  countryCode: string;
  city: string;
  state: string;
  country: string;
}

interface Achievement {
  id: string;
  title: string;
}

interface ProfileBio {
  tagline: string;
  bio: string;
  achievements: Achievement[];
}

interface AccountSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  profileVisibility: string;
  availabilityStatus: string;
  hourlyRate: number;
  currency: string;
}

export default function AgentProfileEdit() {
  const [activeSection, setActiveSection] = useState("specializations");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Immigration Specializations state
  const [specializations, setSpecializations] = useState<Specialization[]>([
    {
      id: "1",
      area: "H1-B Visa",
      yearsExperience: 8,
      expertiseLevel: "Expert",
    },
    {
      id: "2",
      area: "Green Card",
      yearsExperience: 6,
      expertiseLevel: "Expert",
    },
    {
      id: "3",
      area: "Family Immigration",
      yearsExperience: 5,
      expertiseLevel: "Intermediate",
    },
  ]);

  // Profile sections
  const profileSections = [
    {
      id: "basic",
      label: "Basic Details",
      icon: User,
      description: "Personal information and basic...",
    },
    {
      id: "contact",
      label: "Contact Details",
      icon: Phone,
      description: "How clients can reach you",
    },
    {
      id: "specializations",
      label: "Immigration Specializations",
      icon: Award,
      description: "Areas of expertise and experience...",
    },
    {
      id: "experience",
      label: "Professional Experience",
      icon: Briefcase,
      description: "Work history and qualifications",
    },
    {
      id: "education",
      label: "Education & Certifications",
      icon: GraduationCap,
      description: "Academic qualifications and ce...",
    },
    {
      id: "languages",
      label: "Languages",
      icon: Globe,
      description: "Languages you speak and profi...",
    },
    {
      id: "photo",
      label: "Profile Photo",
      icon: Camera,
      description: "Professional photo for your pr...",
    },
    {
      id: "bio",
      label: "Bio & About",
      icon: MessageSquare,
      description: "Tell clients about yourself and...",
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: Settings,
      description: "Privacy and notification prefe...",
    },
  ];

  // Specialization areas
  const specializationAreas = [
    "H1-B Visa",
    "Green Card",
    "Family Immigration",
    "Student Visa (F1)",
    "Work Visa (L1)",
    "Investor Visa (EB-5)",
    "Asylum & Refugee",
    "Citizenship & Naturalization",
    "Business Immigration",
    "Temporary Worker Visa",
    "Marriage-based Immigration",
    "Employment-based Immigration",
  ];

  const expertiseLevels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Expert", label: "Expert" },
  ];

  // Profile strength calculation
  const calculateProfileStrength = () => {
    return 100; // Mock data shows 100%
  };

  // Specialization management
  const addSpecialization = () => {
    const newSpecialization: Specialization = {
      id: Date.now().toString(),
      area: "",
      yearsExperience: 1,
      expertiseLevel: "",
    };
    setSpecializations([...specializations, newSpecialization]);
    setHasUnsavedChanges(true);
  };

  const removeSpecialization = (id: string) => {
    setSpecializations(specializations.filter((spec) => spec.id !== id));
    setHasUnsavedChanges(true);
  };

  const updateSpecialization = (
    id: string,
    field: keyof Specialization,
    value: string | number,
  ) => {
    setSpecializations(
      specializations.map((spec) =>
        spec.id === id ? { ...spec, [field]: value } : spec,
      ),
    );
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasUnsavedChanges(false);
  };

  const renderSpecializationsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-vm-gray-900">
            Immigration Specializations
          </h2>
        </div>
        <Button
          onClick={addSpecialization}
          className="bg-vm-green hover:bg-vm-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Specialization
        </Button>
      </div>

      <div className="space-y-4">
        {specializations.map((spec, index) => (
          <div
            key={spec.id}
            className="bg-white rounded-lg border border-vm-gray-200 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Specialization Area */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Specialization Area *
                </Label>
                <Select
                  value={spec.area}
                  onValueChange={(value) =>
                    updateSpecialization(spec.id, "area", value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializationAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Years of Experience */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Years of Experience *
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={spec.yearsExperience}
                  onChange={(e) =>
                    updateSpecialization(
                      spec.id,
                      "yearsExperience",
                      parseInt(e.target.value) || 1,
                    )
                  }
                  className="h-10"
                />
              </div>

              {/* Expertise Level */}
              <div className="space-y-2 relative">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Expertise Level *
                </Label>
                <div className="flex items-center space-x-2">
                  <Select
                    value={spec.expertiseLevel}
                    onValueChange={(value) =>
                      updateSpecialization(spec.id, "expertiseLevel", value)
                    }
                  >
                    <SelectTrigger className="h-10 flex-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {expertiseLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecialization(spec.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add new specialization card */}
      <div className="border-2 border-dashed border-vm-gray-300 rounded-lg p-8 text-center hover:border-vm-green transition-colors">
        <Button
          onClick={addSpecialization}
          variant="ghost"
          className="text-vm-gray-600 hover:text-vm-green"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Another Specialization
        </Button>
      </div>
    </div>
  );

  const renderOtherSection = (section: string) => (
    <div className="bg-white rounded-lg border border-vm-gray-200 p-8 text-center">
      <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
        {profileSections.find((s) => s.id === section)?.label}
      </h3>
      <p className="text-vm-gray-600">
        This section is under development. Coming soon!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-vm-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/agent-dashboard"
                className="flex items-center space-x-2 text-vm-gray-600 hover:text-vm-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
              <div className="h-4 w-px bg-vm-gray-300"></div>
              <span className="text-sm text-vm-gray-600">
                Dashboard / Profile Editor
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/agent-profile-view">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Unsaved Changes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Left Sidebar */}
          <div className="w-80 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-vm-green rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  SJ
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-vm-gray-900">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-vm-gray-600">
                    Your trusted partner in immigration success
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-xs text-vm-gray-500">✓ Live</span>
                    <span className="text-xs text-vm-gray-500">✓ Skill</span>
                    <span className="text-xs text-vm-gray-500">📍 1 Lang</span>
                    <span className="text-xs text-vm-gray-500">🥇 1 Cert</span>
                  </div>
                </div>
              </div>

              {/* Profile Strength */}
              <div className="mt-4 pt-4 border-t border-vm-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-vm-gray-700">
                    Profile Strength
                  </span>
                  <span className="text-sm font-bold text-vm-green">100%</span>
                </div>
                <Progress value={100} className="h-2" />
                <div className="flex justify-between text-xs text-vm-gray-500 mt-1">
                  <span>Completed</span>
                  <span>9/9</span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-lg border border-vm-gray-200">
              <div className="p-4">
                <nav className="space-y-1">
                  {profileSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-start space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-vm-green/10 text-vm-green border-l-2 border-vm-green"
                            : "text-vm-gray-600 hover:bg-vm-gray-50 hover:text-vm-gray-900"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 mt-0.5 ${activeSection === section.id ? "text-vm-green" : "text-vm-gray-500"}`}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {section.label}
                          </div>
                          <div className="text-xs text-vm-gray-500 mt-0.5">
                            {section.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeSection === "specializations" &&
              renderSpecializationsSection()}
            {activeSection !== "specializations" &&
              renderOtherSection(activeSection)}

            {/* Save Button */}
            {hasUnsavedChanges && (
              <div className="mt-8 pt-6 border-t border-vm-gray-200">
                <div className="flex justify-end">
                  <Button
                    onClick={saveChanges}
                    className="bg-vm-green hover:bg-vm-green-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
