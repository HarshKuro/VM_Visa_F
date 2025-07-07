import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import PostRequestModal from "@/components/PostRequestModal";
import AgentsSection from "@/components/AgentsSection";
import DocumentUpload from "@/components/DocumentUpload";
import {
  Plus,
  Search,
  FileText,
  Upload,
  Star,
  Clock,
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
  Globe,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Calendar,
  Mail,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface VisaRequest {
  id: string;
  title: string;
  type: string;
  country: string;
  description: string;
  status: "open" | "in_progress" | "completed";
  proposalsCount: number;
  createdAt: string;
  budget?: string;
}

interface Proposal {
  id: string;
  agentName: string;
  agentRating: number;
  experience: string;
  price: string;
  timeline: string;
  description: string;
  agentAvatar: string;
  expertise: string[];
}

interface Application {
  id: string;
  title: string;
  agent: string;
  status:
    | "proposal_accepted"
    | "documents_uploaded"
    | "in_review"
    | "completed";
  progress: number;
  nextStep: string;
  deadline: string;
}

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPostModal, setShowPostModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport and load sidebar state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    const savedSidebarState = localStorage.getItem("clientSidebarCollapsed");
    if (savedSidebarState && !window.innerWidth < 768) {
      setSidebarCollapsed(JSON.parse(savedSidebarState));
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem("clientSidebarCollapsed", JSON.stringify(newState));
  };

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

  // Mock data
  const [visaRequests] = useState<VisaRequest[]>([
    {
      id: "1",
      title: "H1-B Visa Application for Software Engineer",
      type: "Work Visa",
      country: "United States",
      description:
        "Need help with H1-B application process for tech company sponsorship",
      status: "open",
      proposalsCount: 12,
      createdAt: "2024-01-15",
      budget: "$1,500 - $3,000",
    },
    {
      id: "2",
      title: "Express Entry Canada PR Application",
      type: "Permanent Residency",
      country: "Canada",
      description: "Looking for expert guidance on Express Entry process",
      status: "in_progress",
      proposalsCount: 8,
      createdAt: "2024-01-10",
      budget: "$2,000 - $4,000",
    },
  ]);

  const [proposals] = useState<Proposal[]>([
    {
      id: "1",
      agentName: "Sarah Johnson",
      agentRating: 4.9,
      experience: "8 years",
      price: "$2,500",
      timeline: "6-8 weeks",
      description:
        "I specialize in H1-B applications with 95% success rate. I'll handle your entire process from documentation to interview prep.",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150",
      expertise: ["H1-B Visa", "Work Permits", "Tech Visas"],
    },
    {
      id: "2",
      agentName: "Michael Chen",
      agentRating: 4.8,
      experience: "12 years",
      price: "$3,000",
      timeline: "4-6 weeks",
      description:
        "Immigration lawyer with extensive H1-B experience. Providing end-to-end legal support with guaranteed application review.",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      expertise: ["Immigration Law", "H1-B Visa", "Corporate Immigration"],
    },
  ]);

  const [applications] = useState<Application[]>([
    {
      id: "1",
      title: "H1-B Visa Application",
      agent: "Sarah Johnson",
      status: "documents_uploaded",
      progress: 65,
      nextStep: "USCIS Review",
      deadline: "2024-03-15",
    },
    {
      id: "2",
      title: "Canada Express Entry",
      agent: "Robert Taylor",
      status: "in_review",
      progress: 85,
      nextStep: "Background Check",
      deadline: "2024-02-28",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "proposal_accepted":
        return "bg-blue-100 text-blue-800";
      case "documents_uploaded":
        return "bg-purple-100 text-purple-800";
      case "in_review":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Layout with Sidebar */}
        <div className="flex gap-8">
          {/* Mobile Overlay */}
          {isMobile && !sidebarCollapsed && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarCollapsed(true)}
            />
          )}

          {/* Left Sidebar - User Profile */}
          <div
            className={`${
              sidebarCollapsed ? "w-16" : "w-80"
            } flex-shrink-0 transition-all duration-300 ease-in-out ${
              isMobile ? "fixed z-50" : "relative"
            }`}
          >
            <Card className="sticky top-24 h-fit">
              <CardContent
                className={`${sidebarCollapsed ? "p-3" : "p-6"} transition-all duration-300`}
              >
                {/* Sidebar Header with Toggle */}
                <div className="flex items-center justify-between mb-6">
                  {!sidebarCollapsed && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-vm-green to-vm-green-600 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-vm-gray-900 text-sm">
                          Client
                        </h3>
                        <p className="text-xs text-vm-gray-500">Dashboard</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={toggleSidebar}
                    className={`p-2 rounded-lg bg-vm-gray-100 hover:bg-vm-gray-200 text-vm-gray-600 hover:text-vm-gray-900 transition-all duration-200 ${
                      sidebarCollapsed ? "mx-auto" : ""
                    }`}
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Profile Header */}
                {!sidebarCollapsed ? (
                  <div className="text-center mb-6">
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                        alt="John Doe"
                        className="w-24 h-24 rounded-full object-cover border-4 border-vm-green/20"
                      />
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h2 className="text-xl font-bold text-vm-gray-900">
                      John Doe
                    </h2>
                    <p className="text-sm text-vm-gray-600 mb-2">
                      Client ID: #VM2024001
                    </p>
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Member
                    </div>
                  </div>
                ) : (
                  <div className="text-center mb-6">
                    <div className="relative mx-auto w-10 h-10 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                        alt="John Doe"
                        className="w-10 h-10 rounded-full object-cover border-2 border-vm-green/20"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                {!sidebarCollapsed ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-gray-900">
                        2
                      </div>
                      <div className="text-xs text-vm-gray-600">
                        Active Requests
                      </div>
                    </div>
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-green">20</div>
                      <div className="text-xs text-vm-gray-600">Proposals</div>
                    </div>
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-blue">2</div>
                      <div className="text-xs text-vm-gray-600">
                        In Progress
                      </div>
                    </div>
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">1</div>
                      <div className="text-xs text-vm-gray-600">Completed</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="group relative">
                      <div className="w-8 h-8 bg-vm-gray-50 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-xs font-bold text-vm-gray-900">
                          2
                        </span>
                      </div>
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-vm-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                          2 Active Requests
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-vm-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    <div className="group relative">
                      <div className="w-8 h-8 bg-vm-green/10 rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-xs font-bold text-vm-green">
                          20
                        </span>
                      </div>
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-vm-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                          20 Proposals
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-vm-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">john.doe@email.com</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">United States</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 text-vm-gray-400 mr-3" />
                    <span className="text-vm-gray-600">
                      Member since Jan 2024
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setActiveTab("documents")}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                  <Button
                    onClick={() => setShowPostModal(true)}
                    className="w-full bg-vm-green hover:bg-vm-green-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Request
                  </Button>
                </div>

                {/* Recent Activity Preview */}
                <div className="mt-6 pt-6 border-t border-vm-gray-200">
                  <h3 className="text-sm font-semibold text-vm-gray-900 mb-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-vm-gray-600">
                        New proposal received
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-vm-gray-600">
                        Documents uploaded
                      </span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-vm-gray-600">
                        Application updated
                      </span>
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
                  Immigration Dashboard
                </h1>
                <p className="text-vm-gray-600">
                  Manage your visa applications and connect with experts
                </p>
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="bg-white rounded-lg shadow-sm border border-vm-gray-200 p-6 min-h-[600px]">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-vm-gray-900">
                              New proposal received
                            </p>
                            <p className="text-sm text-vm-gray-500">
                              Michael Chen submitted a proposal for your H1-B
                              application
                            </p>
                            <p className="text-xs text-vm-gray-400">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-vm-gray-900">
                              Documents uploaded
                            </p>
                            <p className="text-sm text-vm-gray-500">
                              Successfully uploaded I-797 form for H1-B
                              application
                            </p>
                            <p className="text-xs text-vm-gray-400">
                              1 day ago
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-vm-gray-900">
                              Application milestone reached
                            </p>
                            <p className="text-sm text-vm-gray-500">
                              Your Canada PR application has entered background
                              check phase
                            </p>
                            <p className="text-xs text-vm-gray-400">
                              3 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-auto p-6 flex flex-col items-center space-y-2"
                          onClick={() => setShowPostModal(true)}
                        >
                          <Plus className="w-8 h-8 text-vm-green" />
                          <span className="font-medium">Post New Request</span>
                          <span className="text-sm text-vm-gray-500">
                            Get help with your visa application
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto p-6 flex flex-col items-center space-y-2"
                          onClick={() => setActiveTab("documents")}
                        >
                          <Upload className="w-8 h-8 text-vm-purple-600" />
                          <span className="font-medium">Upload Documents</span>
                          <span className="text-sm text-vm-gray-500">
                            Manage your files
                          </span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "requests" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-vm-gray-900">
                      My Visa Requests
                    </h2>
                    <Button
                      onClick={() => setShowPostModal(true)}
                      className="bg-vm-green hover:bg-vm-green-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Request
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {visaRequests.map((request) => (
                      <Card
                        key={request.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-vm-gray-900">
                                  {request.title}
                                </h3>
                                <Badge
                                  className={getStatusColor(request.status)}
                                >
                                  {request.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <p className="text-vm-gray-600 mb-3">
                                {request.description}
                              </p>
                              <div className="flex items-center space-x-6 text-sm text-vm-gray-500">
                                <span className="flex items-center">
                                  <Globe className="w-4 h-4 mr-1" />
                                  {request.country}
                                </span>
                                <span className="flex items-center">
                                  <FileText className="w-4 h-4 mr-1" />
                                  {request.type}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {request.proposalsCount} proposals
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {request.createdAt}
                                </span>
                              </div>
                              {request.budget && (
                                <div className="mt-2">
                                  <span className="text-sm font-medium text-vm-green">
                                    Budget: {request.budget}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "proposals" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-vm-gray-900">
                      Agent Proposals
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Search proposals..."
                        className="w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {proposals.map((proposal) => (
                      <Card
                        key={proposal.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={proposal.agentAvatar}
                              alt={proposal.agentName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold text-vm-gray-900">
                                    {proposal.agentName}
                                  </h3>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm text-vm-gray-600 ml-1">
                                        {proposal.agentRating}
                                      </span>
                                    </div>
                                    <span className="text-sm text-vm-gray-500">
                                      •
                                    </span>
                                    <span className="text-sm text-vm-gray-600">
                                      {proposal.experience} experience
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold text-vm-green">
                                    {proposal.price}
                                  </p>
                                  <p className="text-sm text-vm-gray-500">
                                    {proposal.timeline}
                                  </p>
                                </div>
                              </div>
                              <p className="text-vm-gray-600 mb-3">
                                {proposal.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                  {proposal.expertise.map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    Message
                                  </Button>
                                  <Button
                                    className="bg-vm-green hover:bg-vm-green-600"
                                    size="sm"
                                  >
                                    Accept Proposal
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "applications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-vm-gray-900">
                    Application Progress
                  </h2>

                  <div className="grid gap-6">
                    {applications.map((app) => (
                      <Card key={app.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-vm-gray-900">
                                {app.title}
                              </h3>
                              <p className="text-sm text-vm-gray-600">
                                Agent: {app.agent}
                              </p>
                            </div>
                            <Badge
                              className={getApplicationStatusColor(app.status)}
                            >
                              {app.status.replace("_", " ")}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-vm-gray-600">Progress</span>
                              <span className="font-medium">
                                {app.progress}%
                              </span>
                            </div>
                            <Progress value={app.progress} className="h-2" />
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-vm-gray-600">
                                Next Step:{" "}
                                <span className="font-medium">
                                  {app.nextStep}
                                </span>
                              </span>
                              <span className="text-vm-gray-600">
                                Deadline:{" "}
                                <span className="font-medium">
                                  {app.deadline}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contact Agent
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload Docs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "documents" && <DocumentUpload />}

              {activeTab === "agents" && <AgentsSection />}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPostModal && (
        <PostRequestModal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
        />
      )}

      {/* AI Chat Assistant */}
      <AIChatAssistant />
    </div>
  );
}
