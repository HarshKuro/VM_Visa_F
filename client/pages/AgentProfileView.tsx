import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import {
  ArrowLeft,
  Edit,
  Star,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
  CheckCircle,
  Globe,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
  Settings,
} from "lucide-react";

export default function AgentProfileView() {
  // Mock agent data - in real app, this would come from API/context
  const agentProfile = {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@vmvisa.com",
    phone: "+1 (555) 123-4567",
    profilePhoto:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    location: "New York, NY",
    title: "Senior Immigration Consultant",
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    experience: "8 years",
    memberSince: "2019",
    bio: "Experienced immigration consultant specializing in H1-B visas, green cards, and family immigration. I have helped over 287 clients successfully navigate the complex immigration process with a 96% success rate.",

    specializations: [
      { area: "H1-B Visa", yearsExperience: 8, expertiseLevel: "Expert" },
      { area: "Green Card", yearsExperience: 6, expertiseLevel: "Expert" },
      {
        area: "Family Immigration",
        yearsExperience: 5,
        expertiseLevel: "Intermediate",
      },
    ],

    workExperience: [
      {
        position: "Senior Immigration Consultant",
        company: "VM Visa Solutions",
        duration: "2019 - Present",
        description: "Lead consultant handling complex immigration cases",
      },
      {
        position: "Immigration Specialist",
        company: "Global Immigration Partners",
        duration: "2016 - 2019",
        description: "Specialized in H1-B and employment-based visas",
      },
    ],

    education: [
      {
        degree: "Juris Doctor (J.D.)",
        institution: "Harvard Law School",
        year: "2016",
      },
      {
        degree: "Bachelor of Arts in Political Science",
        institution: "Columbia University",
        year: "2013",
      },
    ],

    languages: ["English", "Spanish", "Mandarin"],

    stats: {
      totalCases: 287,
      successRate: "96%",
      activeClients: 12,
      avgResponseTime: "2 hours",
    },
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/agent-dashboard"
              className="flex items-center space-x-2 text-vm-gray-600 hover:text-vm-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <Link to="/agent-profile-edit">
            <Button className="bg-vm-green hover:bg-vm-green-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={agentProfile.profilePhoto}
                      alt={`${agentProfile.firstName} ${agentProfile.lastName}`}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                    {agentProfile.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-vm-green rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-vm-gray-900 mb-1">
                    {agentProfile.firstName} {agentProfile.lastName}
                  </h1>
                  <p className="text-vm-gray-600 mb-3">{agentProfile.title}</p>

                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(agentProfile.rating)
                              ? "text-yellow-500 fill-current"
                              : "text-vm-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-vm-gray-700">
                      {agentProfile.rating} ({agentProfile.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-vm-gray-500" />
                      <span className="text-sm">{agentProfile.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-vm-gray-500" />
                      <span className="text-sm">{agentProfile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-vm-gray-500" />
                      <span className="text-sm">{agentProfile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-vm-gray-500" />
                      <span className="text-sm">
                        Member since {agentProfile.memberSince}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vm-gray-900">
                      {agentProfile.stats.totalCases}
                    </div>
                    <div className="text-xs text-vm-gray-600">Total Cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vm-green">
                      {agentProfile.stats.successRate}
                    </div>
                    <div className="text-xs text-vm-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vm-blue">
                      {agentProfile.stats.activeClients}
                    </div>
                    <div className="text-xs text-vm-gray-600">
                      Active Clients
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vm-gray-900">
                      {agentProfile.stats.avgResponseTime}
                    </div>
                    <div className="text-xs text-vm-gray-600">Avg Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>About Me</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-vm-gray-700 leading-relaxed">
                  {agentProfile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Immigration Specializations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Immigration Specializations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentProfile.specializations.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-vm-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-vm-gray-900">
                          {spec.area}
                        </h4>
                        <p className="text-sm text-vm-gray-600">
                          {spec.yearsExperience} years experience
                        </p>
                      </div>
                      <Badge
                        className={
                          spec.expertiseLevel === "Expert"
                            ? "bg-vm-green"
                            : spec.expertiseLevel === "Intermediate"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }
                      >
                        {spec.expertiseLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>Professional Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agentProfile.workExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-vm-green pl-4"
                    >
                      <h4 className="font-semibold text-vm-gray-900">
                        {exp.position}
                      </h4>
                      <p className="text-vm-green font-medium">{exp.company}</p>
                      <p className="text-sm text-vm-gray-600 mb-2">
                        {exp.duration}
                      </p>
                      <p className="text-vm-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>Education & Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentProfile.education.map((edu, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-vm-green rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-vm-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-vm-gray-600">{edu.institution}</p>
                        <p className="text-sm text-vm-gray-500">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agentProfile.languages.map((language, index) => (
                    <Badge key={index} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
