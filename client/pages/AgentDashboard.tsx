<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import AgentProfile from "@/components/AgentProfile";
import RequestsBrowser from "@/components/RequestsBrowser";
import ProposalForm from "@/components/ProposalForm";
import ProjectTracker from "@/components/ProjectTracker";
import {
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
  Globe,
  FileText,
  Award,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Target,
  Zap,
} from "lucide-react";

interface AgentStats {
  totalEarnings: string;
  activeProjects: number;
  completedProjects: number;
  successRate: string;
  avgRating: number;
  responseTime: string;
}

interface Project {
  id: string;
  title: string;
  client: string;
  status: "proposal_sent" | "in_progress" | "review" | "completed";
  progress: number;
  deadline: string;
  amount: string;
  priority: "low" | "medium" | "high" | "urgent";
}

interface Request {
  id: string;
  title: string;
  client: string;
  type: string;
  country: string;
  budget: string;
  description: string;
  postedTime: string;
  urgency: "low" | "medium" | "high" | "urgent";
  proposals: number;
  isMatched: boolean;
}

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  // Listen for navigation events from header
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    window.addEventListener(
      "dashboardTabChange",
      handleTabChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "dashboardTabChange",
        handleTabChange as EventListener,
      );
    };
  }, []);

  // Mock agent stats
  const agentStats: AgentStats = {
    totalEarnings: "$24,750",
    activeProjects: 5,
    completedProjects: 47,
    successRate: "94%",
    avgRating: 4.9,
    responseTime: "< 2 hours",
  };

  // Mock projects data
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "H1-B Visa Application - Software Engineer",
      client: "Sarah Chen",
      status: "in_progress",
      progress: 65,
      deadline: "2024-03-15",
      amount: "$2,500",
      priority: "high",
    },
    {
      id: "2",
      title: "Canada Express Entry Application",
      client: "Michael Rodriguez",
      status: "review",
      progress: 90,
      deadline: "2024-02-28",
      amount: "$3,200",
      priority: "urgent",
    },
    {
      id: "3",
      title: "UK Skilled Worker Visa",
      client: "Emma Thompson",
      status: "proposal_sent",
      progress: 10,
      deadline: "2024-04-10",
      amount: "$1,800",
      priority: "medium",
    },
  ]);

  // Mock available requests
  const [availableRequests] = useState<Request[]>([
    {
      id: "1",
      title: "Investment Visa for Tech Startup Founder",
      client: "David Kim",
      type: "Investment Visa",
      country: "United States",
      budget: "$3,000 - $5,000",
      description:
        "Need expert guidance for EB-5 investment visa application. Have startup valued at $2M+.",
      postedTime: "2 hours ago",
      urgency: "high",
      proposals: 3,
      isMatched: true,
    },
    {
      id: "2",
      title: "Family Sponsorship Application",
      client: "Maria Lopez",
      type: "Family Immigration",
      country: "Canada",
      budget: "$1,500 - $2,500",
      description:
        "Looking to sponsor my spouse for permanent residency in Canada.",
      postedTime: "5 hours ago",
      urgency: "medium",
      proposals: 7,
      isMatched: false,
    },
    {
      id: "3",
      title: "Student Visa for Graduate Program",
      client: "Ahmed Hassan",
      type: "Student Visa",
      country: "Australia",
      budget: "$800 - $1,200",
      description:
        "Need help with student visa application for PhD program in Melbourne.",
      postedTime: "1 day ago",
      urgency: "low",
      proposals: 12,
      isMatched: true,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "proposal_sent":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendProposal = (request: Request) => {
    setSelectedRequest(request);
    setShowProposalModal(true);
  };
>>>>>>> dcd898d37c0e132aa1b8acce6962c38f570c2d93

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

<<<<<<< HEAD
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
=======
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Layout with Sidebar */}
        <div className="flex gap-8">
          {/* Left Sidebar - Agent Profile */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="relative mx-auto w-24 h-24 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150"
                      alt="Sarah Johnson"
                      className="w-24 h-24 rounded-full object-cover border-4 border-vm-green/20"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                      <Award className="w-3 h-3 text-yellow-800" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-vm-gray-900">
                    Sarah Johnson
                  </h2>
                  <p className="text-sm text-vm-gray-600 mb-2">
                    Immigration Attorney
                  </p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-vm-gray-900 ml-1">
                        {agentStats.avgRating}
                      </span>
                    </div>
                    <span className="text-sm text-vm-gray-500">•</span>
                    <span className="text-sm text-vm-gray-600">
                      247 reviews
                    </span>
                  </div>
                  <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Top Rated Agent
                  </div>
                </div>

                {/* Earnings & Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-vm-green">
                      {agentStats.totalEarnings}
                    </div>
                    <div className="text-xs text-vm-gray-600">Total Earned</div>
                  </div>
                  <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-vm-blue">
                      {agentStats.activeProjects}
                    </div>
                    <div className="text-xs text-vm-gray-600">
                      Active Projects
                    </div>
                  </div>
                  <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-vm-gray-900">
                      {agentStats.completedProjects}
                    </div>
                    <div className="text-xs text-vm-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">
                      {agentStats.successRate}
                    </div>
                    <div className="text-xs text-vm-gray-600">Success Rate</div>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">
                      sarah.johnson@lawfirm.com
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">New York, USA</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Briefcase className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">8 years experience</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">
                      Response: {agentStats.responseTime}
                    </span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "H1-B Visa",
                      "Work Permits",
                      "Family Immigration",
                      "EB-5 Investment",
                    ].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setActiveTab("profile")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => setActiveTab("requests")}
                    className="w-full bg-vm-green hover:bg-vm-green-600"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Browse Requests
                  </Button>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6 pt-6 border-t border-vm-gray-200">
                  <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                    This Month
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-vm-gray-600">Proposals Sent</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-vm-gray-600">Acceptance Rate</span>
                      <span className="font-medium text-vm-green">75%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-vm-gray-600">Earnings</span>
                      <span className="font-medium text-vm-blue">$4,200</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Main Content Header */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-vm-gray-200 p-6">
                <h1 className="text-2xl font-bold text-vm-gray-900 mb-2">
                  Agent Dashboard
                </h1>
                <p className="text-vm-gray-600">
                  Manage your immigration consulting business and help clients
                  worldwide
                </p>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="bg-white rounded-lg shadow-sm border border-vm-gray-200 p-6 min-h-[600px]">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Performance Overview */}
                  <div>
                    <h2 className="text-xl font-semibold text-vm-gray-900 mb-6">
                      Performance Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-vm-gray-600">
                                Monthly Earnings
                              </p>
                              <p className="text-2xl font-bold text-vm-green">
                                $4,200
                              </p>
                              <p className="text-sm text-vm-gray-500">
                                +15% from last month
                              </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                              <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-vm-gray-600">
                                Success Rate
                              </p>
                              <p className="text-2xl font-bold text-vm-blue">
                                94%
                              </p>
                              <p className="text-sm text-vm-gray-500">
                                Above average
                              </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                              <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-vm-gray-600">
                                Client Satisfaction
                              </p>
                              <p className="text-2xl font-bold text-yellow-600">
                                4.9/5
                              </p>
                              <p className="text-sm text-vm-gray-500">
                                247 reviews
                              </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                              <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <div className="flex items-center space-x-2 mb-6">
                      <Zap className="w-5 h-5 text-vm-green" />
                      <h2 className="text-xl font-semibold text-vm-gray-900">
                        AI Recommendations
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      {availableRequests
                        .filter((req) => req.isMatched)
                        .slice(0, 3)
                        .map((request, index) => (
                          <Card
                            key={request.id}
                            className="hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="font-semibold text-vm-gray-900">
                                      {request.title}
                                    </h3>
                                    <Badge className="bg-vm-green text-white text-xs">
                                      Top Match
                                    </Badge>
                                    {index === 0 && (
                                      <Badge className="bg-red-100 text-red-800 text-xs">
                                        🔥 Hot
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-vm-gray-600 mb-2">
                                    {request.description}
                                  </p>
                                  <div className="flex items-center space-x-4 text-xs text-vm-gray-500">
                                    <span>{request.type}</span>
                                    <span>•</span>
                                    <span>{request.country}</span>
                                    <span>•</span>
                                    <span>{request.budget}</span>
                                    <span>•</span>
                                    <span>{request.proposals} proposals</span>
                                  </div>
                                </div>
                                <Button
                                  onClick={() => handleSendProposal(request)}
                                  size="sm"
                                  className="bg-vm-green hover:bg-vm-green-600 ml-4"
                                >
                                  Send Proposal
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h2 className="text-xl font-semibold text-vm-gray-900 mb-6">
                      Recent Activity
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-vm-gray-900">
                            Project completed successfully
                          </p>
                          <p className="text-sm text-vm-gray-500">
                            Canada Express Entry for Michael Rodriguez
                          </p>
                          <p className="text-xs text-vm-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-vm-gray-900">
                            New message from client
                          </p>
                          <p className="text-sm text-vm-gray-500">
                            Sarah Chen has a question about document
                            requirements
                          </p>
                          <p className="text-xs text-vm-gray-400">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-vm-gray-900">
                            Proposal accepted
                          </p>
                          <p className="text-sm text-vm-gray-500">
                            Investment visa project for David Kim
                          </p>
                          <p className="text-xs text-vm-gray-400">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "requests" && (
                <RequestsBrowser onSendProposal={handleSendProposal} />
              )}
              {activeTab === "proposals" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-vm-gray-900">
                    My Proposals
                  </h2>
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
                      Proposals will appear here
                    </h3>
                    <p className="text-vm-gray-600">
                      Send proposals to client requests to see them here
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "applications" && (
                <ProjectTracker projects={projects} />
              )}
              {activeTab === "documents" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-vm-gray-900">
                    Document Management
                  </h2>
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
                      Document templates and uploads
                    </h3>
                    <p className="text-vm-gray-600">
                      Manage your professional documents and templates
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "agents" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-vm-gray-900">
                    Network & Referrals
                  </h2>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
                      Professional Network
                    </h3>
                    <p className="text-vm-gray-600">
                      Connect with other immigration professionals
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "profile" && <AgentProfile />}
>>>>>>> dcd898d37c0e132aa1b8acce6962c38f570c2d93
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* Modals */}
      {showProposalModal && selectedRequest && (
        <ProposalForm
          isOpen={showProposalModal}
          onClose={() => setShowProposalModal(false)}
          request={selectedRequest}
        />
      )}

      {/* AI Chat Assistant */}
>>>>>>> dcd898d37c0e132aa1b8acce6962c38f570c2d93
      <AIChatAssistant />
    </div>
  );
}
