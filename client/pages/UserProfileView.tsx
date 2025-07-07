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
  CheckCircle,
  Globe,
  Users,
  FileText,
  Clock,
  Settings,
  CreditCard,
  Shield,
  BookOpen,
} from "lucide-react";

export default function UserProfileView() {
  // Mock user data - in real app, this would come from API/context
  const userProfile = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "New York, NY",
    verified: true,
    memberSince: "2024",
    dateOfBirth: "March 15, 1985",
    nationality: "United States",
    passportNumber: "123456789",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },

    // Application Status
    activeApplications: [
      {
        id: "1",
        type: "H1-B Visa",
        status: "In Review",
        agent: "Sarah Johnson",
        submittedDate: "2024-01-15",
        expectedDecision: "2024-03-15",
        progress: 65,
      },
      {
        id: "2",
        type: "Green Card",
        status: "Documents Required",
        agent: "Michael Chen",
        submittedDate: "2024-02-01",
        expectedDecision: "2024-06-01",
        progress: 30,
      },
    ],

    // Consultation History
    consultations: [
      {
        id: "1",
        agent: "Sarah Johnson",
        date: "2024-01-10",
        type: "Initial Consultation",
        duration: "60 minutes",
        status: "Completed",
        rating: 5,
      },
      {
        id: "2",
        agent: "Robert Taylor",
        date: "2024-02-15",
        type: "Document Review",
        duration: "30 minutes",
        status: "Completed",
        rating: 4,
      },
    ],

    // Saved Agents
    savedAgents: [
      {
        id: "1",
        name: "Sarah Johnson",
        specialization: "H1-B Visa",
        rating: 4.9,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      },
      {
        id: "2",
        name: "Michael Chen",
        specialization: "Green Card",
        rating: 4.8,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in review":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "documents required":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
                to="/client-dashboard"
                className="flex items-center space-x-2 text-vm-gray-600 hover:text-vm-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              <div className="h-4 w-px bg-vm-gray-300"></div>
              <span className="text-sm text-vm-gray-500">
                Dashboard / My Profile
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Link to="/user-profile-edit">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <img
                      src={userProfile.profilePhoto}
                      alt={`${userProfile.firstName} ${userProfile.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-vm-green/20"
                    />
                    {userProfile.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-vm-green rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl font-bold text-vm-gray-900">
                        {userProfile.firstName} {userProfile.lastName}
                      </h1>
                      {userProfile.verified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-vm-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{userProfile.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {userProfile.memberSince}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>{userProfile.nationality}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>
                          Passport: ****{userProfile.passportNumber.slice(-3)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Active Applications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.activeApplications.map((application) => (
                    <div
                      key={application.id}
                      className="border border-vm-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-vm-gray-900">
                            {application.type}
                          </h3>
                          <p className="text-sm text-vm-gray-600">
                            Agent: {application.agent}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-vm-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Submitted:</span>{" "}
                          {application.submittedDate}
                        </div>
                        <div>
                          <span className="font-medium">
                            Expected Decision:
                          </span>{" "}
                          {application.expectedDecision}
                        </div>
                      </div>
                      <div className="w-full bg-vm-gray-200 rounded-full h-2">
                        <div
                          className="bg-vm-green h-2 rounded-full transition-all duration-300"
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-vm-gray-500 mt-1">
                        <span>Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Consultation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Consultation History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.consultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="border border-vm-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-vm-gray-900">
                            {consultation.type}
                          </h3>
                          <p className="text-sm text-vm-gray-600">
                            with {consultation.agent}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-vm-gray-600">
                            <span>{consultation.date}</span>
                            <span>{consultation.duration}</span>
                            <Badge variant="outline">
                              {consultation.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < consultation.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-vm-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-vm-gray-600">
                      Active Applications
                    </span>
                    <span className="font-semibold">
                      {userProfile.activeApplications.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-vm-gray-600">
                      Consultations
                    </span>
                    <span className="font-semibold">
                      {userProfile.consultations.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-vm-gray-600">
                      Saved Agents
                    </span>
                    <span className="font-semibold">
                      {userProfile.savedAgents.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-vm-gray-600">
                      Account Status
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Agents */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.savedAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center space-x-3 p-3 border border-vm-gray-200 rounded-lg hover:bg-vm-gray-50 transition-colors"
                    >
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-vm-gray-900">
                          {agent.name}
                        </h4>
                        <p className="text-xs text-vm-gray-600">
                          {agent.specialization}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-vm-gray-600">
                            {agent.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-vm-gray-900">
                      {userProfile.emergencyContact.name}
                    </span>
                    <p className="text-sm text-vm-gray-600">
                      {userProfile.emergencyContact.relationship}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-vm-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{userProfile.emergencyContact.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
