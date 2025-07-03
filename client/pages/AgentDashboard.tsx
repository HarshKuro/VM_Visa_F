import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import {
  Users,
  MessageSquare,
  DollarSign,
  Star,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Settings,
  Edit,
  Award,
} from "lucide-react";

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock agent data
  const agentProfile = {
    name: "Sarah Johnson",
    title: "Senior Immigration Consultant",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    verified: true,
    rating: 4.9,
    experience: "8 years",
    email: "sarah.johnson@vmvisa.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    specializations: ["H1-B Visas", "Green Cards", "Family Immigration"],
    memberSince: "2019",
    successRate: "96%",
    completedCases: 287,
    activeClients: 12,
  };

  // Mock data for agent stats
  const agentStats = [
    {
      icon: Users,
      label: "Active Clients",
      value: "12",
      change: "+3",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MessageSquare,
      label: "Pending Proposals",
      value: "8",
      change: "+2",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: DollarSign,
      label: "Monthly Revenue",
      value: "$4,280",
      change: "+15%",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Star,
      label: "Rating",
      value: "4.9",
      change: "+0.1",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="flex">
        {/* Left Sidebar - Agent Profile */}
        <div className="w-80 bg-white border-r border-vm-gray-200 min-h-screen">
          <div className="p-6">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img
                  src={agentProfile.avatar}
                  alt={agentProfile.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                />
                {agentProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-vm-green rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-vm-gray-900 mb-1">
                {agentProfile.name}
              </h2>
              <p className="text-sm text-vm-gray-600 mb-2">
                {agentProfile.title}
              </p>
              <div className="flex items-center justify-center space-x-1 mb-3">
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
                  {agentProfile.rating}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {agentProfile.experience} Experience
              </Badge>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-vm-gray-500" />
                  <span className="text-sm text-vm-gray-700">
                    {agentProfile.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-vm-gray-500" />
                  <span className="text-sm text-vm-gray-700">
                    {agentProfile.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-vm-gray-500" />
                  <span className="text-sm text-vm-gray-700">
                    {agentProfile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {agentProfile.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                Performance Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-vm-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-vm-gray-900">
                    {agentProfile.completedCases}
                  </div>
                  <div className="text-xs text-vm-gray-600">
                    Cases Completed
                  </div>
                </div>
                <div className="bg-vm-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-vm-green">
                    {agentProfile.successRate}
                  </div>
                  <div className="text-xs text-vm-gray-600">Success Rate</div>
                </div>
                <div className="bg-vm-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-vm-blue">
                    {agentProfile.activeClients}
                  </div>
                  <div className="text-xs text-vm-gray-600">Active Clients</div>
                </div>
                <div className="bg-vm-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-vm-gray-900">
                    {agentProfile.memberSince}
                  </div>
                  <div className="text-xs text-vm-gray-600">Member Since</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-vm-green hover:bg-vm-green-600">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full">
                <Award className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
            </div>

            {/* Recent Activity Preview */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                Recent Activity
              </h3>
              <div className="space-y-2">
                <div className="text-xs text-vm-gray-600">
                  • New proposal submitted
                </div>
                <div className="text-xs text-vm-gray-600">
                  • Client consultation completed
                </div>
                <div className="text-xs text-vm-gray-600">
                  • Document review finished
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-vm-green to-vm-green-600 rounded-lg p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Agent!</h1>
              <p className="text-white/90">
                Your agent dashboard is ready. Manage your clients, proposals,
                and grow your immigration practice.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {agentStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-vm-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-vm-gray-900">
                          {stat.value}
                        </p>
                        <p className="text-sm text-green-600">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Client Requests */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Recent Client Requests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        title: "H1-B Visa Application for Software Engineer",
                        client: "John Smith",
                        budget: "$2,500",
                        time: "2 hours ago",
                        urgent: true,
                      },
                      {
                        id: 2,
                        title: "Canada Express Entry Application",
                        client: "Maria Garcia",
                        budget: "$3,200",
                        time: "5 hours ago",
                        urgent: false,
                      },
                      {
                        id: 3,
                        title: "Family Sponsorship Consultation",
                        client: "Ahmed Hassan",
                        budget: "$800",
                        time: "1 day ago",
                        urgent: false,
                      },
                    ].map((request) => (
                      <div
                        key={request.id}
                        className="p-4 border border-vm-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-vm-gray-900">
                                {request.title}
                              </h3>
                              {request.urgent && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                  Urgent
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-vm-gray-600 mb-2">
                              Client: {request.client}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-vm-gray-500">
                              <span className="flex items-center">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {request.budget}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {request.time}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      View All Requests
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-vm-green hover:bg-vm-green-600">
                    Submit Proposal
                  </Button>
                  <Button variant="outline" className="w-full">
                    Update Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>This Month</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-vm-gray-600">
                        Proposals Sent
                      </span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-vm-gray-600">
                        Success Rate
                      </span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-vm-gray-600">
                        Avg Response Time
                      </span>
                      <span className="font-semibold">2.3 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-vm-gray-600">
                        Client Satisfaction
                      </span>
                      <span className="font-semibold text-yellow-600">
                        4.9/5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          H1-B Filing Deadline
                        </p>
                        <p className="text-xs text-vm-gray-500">Tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Client Meeting</p>
                        <p className="text-xs text-vm-gray-500">Dec 28, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Document Review</p>
                        <p className="text-xs text-vm-gray-500">Dec 30, 2024</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AIChatAssistant />
    </div>
  );
}
