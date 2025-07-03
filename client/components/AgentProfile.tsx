import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Save,
  Star,
  Award,
  MapPin,
  Calendar,
  DollarSign,
  Languages,
  CheckCircle,
  Plus,
  X,
} from "lucide-react";

export default function AgentProfile() {
  const [profileData, setProfileData] = useState({
    fullName: "Sarah Johnson",
    title: "Immigration Attorney",
    email: "sarah.johnson@lawfirm.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    hourlyRate: "150",
    experience: "8",
    bio: "Experienced immigration attorney with 8+ years of expertise in employment-based visas, family immigration, and business immigration. Specialized in H1-B, L1, EB-5, and permanent residency applications with a 94% success rate.",
    languages: ["English", "Spanish"],
    specializations: [
      "H1-B Visa",
      "Work Permits",
      "Family Immigration",
      "EB-5 Investment",
    ],
    education: [
      {
        degree: "J.D. Immigration Law",
        institution: "Harvard Law School",
        year: "2015",
      },
      {
        degree: "B.A. International Relations",
        institution: "Columbia University",
        year: "2012",
      },
    ],
    certifications: [
      { name: "Licensed Attorney - New York Bar", year: "2015" },
      { name: "Immigration Law Specialist", year: "2017" },
    ],
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newSpecialization, setNewSpecialization] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !profileData.languages.includes(newLanguage.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  const addSpecialization = () => {
    if (
      newSpecialization.trim() &&
      !profileData.specializations.includes(newSpecialization.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()],
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (specialization: string) => {
    setProfileData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((s) => s !== specialization),
    }));
  };

  const handleSave = () => {
    // Handle profile save
    console.log("Saving profile:", profileData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-vm-gray-900">
            Agent Profile
          </h2>
          <p className="text-sm text-vm-gray-600">
            Manage your professional profile and credentials
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-vm-green hover:bg-vm-green-600"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
                    <Input
                      id="hourlyRate"
                      value={profileData.hourlyRate}
                      onChange={(e) =>
                        handleInputChange("hourlyRate", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profileData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Describe your experience, expertise, and what makes you unique..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.languages.map((language) => (
                  <Badge
                    key={language}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{language}</span>
                    <button
                      onClick={() => removeLanguage(language)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language"
                  onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                />
                <Button onClick={addLanguage} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card>
            <CardHeader>
              <CardTitle>Areas of Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profileData.specializations.map((spec) => (
                  <Badge
                    key={spec}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{spec}</span>
                    <button
                      onClick={() => removeSpecialization(spec)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Add a specialization"
                  onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                />
                <Button onClick={addSpecialization} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-vm-gray-50 rounded-lg"
                >
                  <Calendar className="w-5 h-5 text-vm-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium text-vm-gray-900">
                      {edu.degree}
                    </div>
                    <div className="text-sm text-vm-gray-600">
                      {edu.institution} • {edu.year}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-vm-gray-50 rounded-lg"
                >
                  <Award className="w-5 h-5 text-vm-green" />
                  <div className="flex-1">
                    <div className="font-medium text-vm-gray-900">
                      {cert.name}
                    </div>
                    <div className="text-sm text-vm-gray-600">
                      Obtained in {cert.year}
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-vm-green" />
                </div>
              ))}
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Summary */}
        <div className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative mx-auto w-32 h-32">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-vm-green/20"
                />
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Profile Views</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Profile Rating</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium ml-1">4.9/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Response Rate</span>
                <span className="font-medium text-vm-green">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">
                  Projects Completed
                </span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Success Rate</span>
                <span className="font-medium text-vm-green">94%</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Email Verified</span>
                <CheckCircle className="w-5 h-5 text-vm-green" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">Phone Verified</span>
                <CheckCircle className="w-5 h-5 text-vm-green" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">
                  Identity Verified
                </span>
                <CheckCircle className="w-5 h-5 text-vm-green" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-vm-gray-600">
                  License Verified
                </span>
                <CheckCircle className="w-5 h-5 text-vm-green" />
              </div>
              <div className="pt-2">
                <Badge className="w-full justify-center bg-vm-green text-white">
                  <Award className="w-3 h-3 mr-1" />
                  Top Rated Agent
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload License Document
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Update Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
