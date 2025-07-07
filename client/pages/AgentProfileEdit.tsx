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
  const [activeSection, setActiveSection] = useState("basic");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Basic Information state
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    fullName: "Sarah Johnson",
    gender: "Female",
    dateOfBirth: "15/03/1985",
    nationality: "United States",
  });

  // Contact Information state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "sarah.johnson@vmvisa.com",
    phone: "555-0123",
    countryCode: "+1",
    city: "New York",
    state: "NY",
    country: "USA",
  });

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

  // Professional Experience state
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      position: "Senior Immigration Attorney",
      company: "Global Immigration Partners",
      startDate: "2020-01",
      endDate: "Present",
      current: true,
      description: "Leading complex immigration cases with 95% success rate",
      license: "NY-ATT-2019-001",
    },
  ]);

  // Education & Certifications state
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "Board Certified Immigration Attorney",
      organization: "American Immigration Lawyers Association",
      issueDate: "2018-06",
      expiryDate: "",
      credentialId: "AILA-2018-001",
      verificationUrl: "URL to verify certification",
    },
  ]);

  // Languages state
  const [languages, setLanguages] = useState<Language[]>([
    { id: "1", language: "English", proficiency: "Native" },
    { id: "2", language: "Spanish", proficiency: "Advanced" },
    { id: "3", language: "Mandarin", proficiency: "Intermediate" },
  ]);

  // Bio & About state
  const [profileBio, setProfileBio] = useState<ProfileBio>({
    tagline: "Your trusted partner in immigration success",
    bio: "Experienced immigration attorney specializing in business immigration with over 8 years of practice. Committed to helping clients navigate complex immigration processes with personalized attention and expertise.",
    achievements: [
      { id: "1", title: "Successfully handled 500+ immigration cases" },
      { id: "2", title: "Featured in Immigration Law Weekly" },
      { id: "3", title: "Top-rated immigration attorney in NYC" },
    ],
  });

  // Account Settings state
  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: "Public - Visible to everyone",
    availabilityStatus: "Available - Accepting new clients",
    hourlyRate: 250,
    currency: "USD - US Dollar",
  });

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

  const proficiencyLevels = ["Native", "Advanced", "Intermediate", "Basic"];

  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
  ];

  // Profile strength calculation
  const calculateProfileStrength = () => {
    return 100; // Mock data shows 100%
  };

  // Basic Info management
  const updateBasicInfo = (field: keyof BasicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Contact Info management
  const updateContactInfo = (field: keyof ContactInfo, value: string) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
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

  // Experience management
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setExperiences([...experiences, newExperience]);
    setHasUnsavedChanges(true);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setHasUnsavedChanges(true);
  };

  // Certification management
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: "",
      organization: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      verificationUrl: "",
    };
    setCertifications([...certifications, newCertification]);
    setHasUnsavedChanges(true);
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
    setHasUnsavedChanges(true);
  };

  // Language management
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: "",
      proficiency: "",
    };
    setLanguages([...languages, newLanguage]);
    setHasUnsavedChanges(true);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
    setHasUnsavedChanges(true);
  };

  // Achievement management
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "",
    };
    setProfileBio((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement],
    }));
    setHasUnsavedChanges(true);
  };

  const removeAchievement = (id: string) => {
    setProfileBio((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }));
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasUnsavedChanges(false);
  };

  const renderBasicSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-vm-gray-900">
          Basic Information
        </h2>
        <p className="text-vm-gray-600 mt-1">
          Let's start with your basic details to create your professional
          profile
        </p>
      </div>

      <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <User className="w-5 h-5 text-vm-green" />
          <h3 className="text-lg font-semibold text-vm-gray-900">
            Personal Information
          </h3>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Full Name *
            </Label>
            <Input
              value={basicInfo.fullName}
              onChange={(e) => updateBasicInfo("fullName", e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Gender *
            </Label>
            <Select
              value={basicInfo.gender}
              onValueChange={(value) => updateBasicInfo("gender", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Date of Birth *
            </Label>
            <div className="relative">
              <Input
                value={basicInfo.dateOfBirth}
                onChange={(e) => updateBasicInfo("dateOfBirth", e.target.value)}
                className="h-10 pr-10"
                placeholder="DD/MM/YYYY"
              />
              <Calendar className="w-4 h-4 text-vm-gray-400 absolute right-3 top-3" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Nationality *
            </Label>
            <Select
              value={basicInfo.nationality}
              onValueChange={(value) => updateBasicInfo("nationality", value)}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
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

        <div className="mt-8 pt-6 border-t border-vm-gray-200">
          <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
            Save Basic Information
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Email Address *
            </Label>
            <Input
              type="email"
              value={contactInfo.email}
              onChange={(e) => updateContactInfo("email", e.target.value)}
              className="h-10"
            />
            <p className="text-xs text-vm-gray-500">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Phone Number *
            </Label>
            <div className="flex space-x-2">
              <Select
                value={contactInfo.countryCode}
                onValueChange={(value) =>
                  updateContactInfo("countryCode", value)
                }
              >
                <SelectTrigger className="w-20 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={contactInfo.phone}
                onChange={(e) => updateContactInfo("phone", e.target.value)}
                className="flex-1 h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              City *
            </Label>
            <Input
              value={contactInfo.city}
              onChange={(e) => updateContactInfo("city", e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              State/Province *
            </Label>
            <Input
              value={contactInfo.state}
              onChange={(e) => updateContactInfo("state", e.target.value)}
              className="h-10"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Country *
            </Label>
            <Input
              value={contactInfo.country}
              onChange={(e) => updateContactInfo("country", e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-vm-gray-200">
          <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
            Save Contact Details
          </Button>
        </div>
      </div>
    </div>
  );

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

      <div className="mt-8 pt-6 border-t border-vm-gray-200">
        <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
          Save Specializations
        </Button>
      </div>
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-vm-gray-900">
          Professional Experience
        </h2>
        <p className="text-vm-gray-600 mt-1">
          Share your work experience to build credibility with clients
        </p>
      </div>

      <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
        <h3 className="text-lg font-semibold text-vm-gray-900 mb-4">
          Your Experiences
        </h3>

        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-vm-gray-200 rounded-lg p-6 mb-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-vm-gray-900">
                    {exp.position}
                  </h4>
                  <p className="text-vm-gray-600">{exp.company}</p>
                  <p className="text-sm text-vm-gray-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-vm-gray-700 mb-2">{exp.description}</p>
              {exp.license && (
                <p className="text-sm text-vm-gray-600">
                  📄 License: {exp.license}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-vm-gray-900 mb-2">
              Add Your First Experience
            </h4>
            <p className="text-vm-gray-600 mb-4">
              Share your professional background to build trust with clients
            </p>
            <Button
              onClick={addExperience}
              className="bg-vm-green hover:bg-vm-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-vm-gray-200">
          <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Experience
          </Button>
        </div>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-vm-gray-900">
            Certifications
          </h2>
        </div>
        <Button
          onClick={addCertification}
          className="bg-vm-green hover:bg-vm-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-white rounded-lg border border-vm-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-vm-gray-900">
                Certification {index + 1}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
                className="text-red-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Certification Name *
                </Label>
                <Input value={cert.name} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Issuing Organization *
                </Label>
                <Input value={cert.organization} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Issue Date *
                </Label>
                <Input value={cert.issueDate} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Expiry Date
                </Label>
                <Input value={cert.expiryDate} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Credential ID
                </Label>
                <Input value={cert.credentialId} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Verification URL
                </Label>
                <Input value={cert.verificationUrl} className="h-10" readOnly />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-vm-gray-200">
        <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
          Save Education & Certifications
        </Button>
      </div>
    </div>
  );

  const renderLanguagesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-vm-gray-900">Languages</h2>
        </div>
        <Button
          onClick={addLanguage}
          className="bg-vm-green hover:bg-vm-green-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </Button>
      </div>

      <div className="space-y-4">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="bg-white rounded-lg border border-vm-gray-200 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Language *
                </Label>
                <Input value={lang.language} className="h-10" readOnly />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Proficiency Level *
                </Label>
                <div className="flex items-center space-x-2">
                  <Select value={lang.proficiency}>
                    <SelectTrigger className="h-10 flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(lang.id)}
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

      <div className="mt-8 pt-6 border-t border-vm-gray-200">
        <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
          Save Languages
        </Button>
      </div>
    </div>
  );

  const renderPhotoSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-vm-gray-200 p-8 text-center">
        <div className="w-24 h-24 bg-vm-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-vm-gray-600">SJ</span>
        </div>
        <div className="w-6 h-6 bg-vm-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Upload className="w-4 h-4 text-vm-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
          Upload a professional photo that clearly shows your face
        </h3>
        <p className="text-vm-gray-600 mb-4">
          Recommended: 400x400px or larger. JPG or PNG format
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-vm-green mb-6">
          <CheckCircle className="w-4 h-4" />
          <span>Professional photos get 40% more client inquiries</span>
        </div>
        <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
          Save Profile Photo
        </Button>
      </div>
    </div>
  );

  const renderBioSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Professional Tagline
            </Label>
            <Input
              value={profileBio.tagline}
              onChange={(e) =>
                setProfileBio((prev) => ({ ...prev, tagline: e.target.value }))
              }
              className="h-10"
            />
            <p className="text-xs text-vm-gray-500">43/100 characters</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-vm-gray-900">
              Professional Bio
            </Label>
            <Textarea
              value={profileBio.bio}
              onChange={(e) =>
                setProfileBio((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="min-h-24 resize-none"
            />
            <p className="text-xs text-vm-gray-500">211/1000 characters</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-vm-gray-900">
                Key Achievements
              </Label>
              <Button
                onClick={addAchievement}
                variant="outline"
                size="sm"
                className="text-vm-green border-vm-green hover:bg-vm-green hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>

            {profileBio.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-2 p-3 bg-vm-gray-50 rounded-lg"
              >
                <Award className="w-4 h-4 text-orange-500" />
                <Input
                  value={achievement.title}
                  className="border-0 bg-transparent flex-1"
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAchievement(achievement.id)}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-vm-gray-200">
          <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
            Save Bio & About
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-vm-gray-200 p-6">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-vm-gray-900 mb-4">
              Notification Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-vm-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-vm-gray-600">
                    Receive notifications about new client inquiries and updates
                  </p>
                </div>
                <Switch
                  checked={accountSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-vm-gray-900">
                    SMS Notifications
                  </h4>
                  <p className="text-sm text-vm-gray-600">
                    Receive urgent notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={accountSettings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      smsNotifications: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-vm-gray-900 mb-4">
              Privacy Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Profile Visibility
                </Label>
                <Select value={accountSettings.profileVisibility}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public - Visible to everyone">
                      Public - Visible to everyone
                    </SelectItem>
                    <SelectItem value="Private - Visible to clients only">
                      Private - Visible to clients only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Availability Status
                </Label>
                <Select value={accountSettings.availabilityStatus}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available - Accepting new clients">
                      Available - Accepting new clients
                    </SelectItem>
                    <SelectItem value="Busy - Not accepting new clients">
                      Busy - Not accepting new clients
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-vm-gray-900 mb-4">
              Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Hourly Rate
                </Label>
                <Input
                  type="number"
                  value={accountSettings.hourlyRate}
                  onChange={(e) =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      hourlyRate: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-vm-gray-900">
                  Currency
                </Label>
                <Select value={accountSettings.currency}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD - US Dollar">
                      USD - US Dollar
                    </SelectItem>
                    <SelectItem value="EUR - Euro">EUR - Euro</SelectItem>
                    <SelectItem value="GBP - British Pound">
                      GBP - British Pound
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-vm-gray-200">
          <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
            Save Account Settings
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "basic":
        return renderBasicSection();
      case "contact":
        return renderContactSection();
      case "specializations":
        return renderSpecializationsSection();
      case "experience":
        return renderExperienceSection();
      case "education":
        return renderEducationSection();
      case "languages":
        return renderLanguagesSection();
      case "photo":
        return renderPhotoSection();
      case "bio":
        return renderBioSection();
      case "settings":
        return renderSettingsSection();
      default:
        return renderBasicSection();
    }
  };

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
            {renderCurrentSection()}

            {/* Global Save Button */}
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
