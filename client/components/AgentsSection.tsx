import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Award,
  MessageSquare,
  Eye,
  Heart,
  DollarSign,
  Users,
  CheckCircle,
  FileText,
  Upload,
  Calendar,
  Send,
  Phone,
  Video,
  Mail,
  Download,
  Archive,
  PlusCircle,
  Paperclip,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: string;
  location: string;
  languages: string[];
  expertise: string[];
  hourlyRate: string;
  successRate: string;
  responseTime: string;
  description: string;
  isVerified: boolean;
  completedCases: number;
}

interface Request {
  id: string;
  title: string;
  type: string;
  country: string;
  status: "open" | "in_progress" | "completed";
  createdAt: string;
  proposalsCount: number;
  budget?: string;
}

interface Proposal {
  id: string;
  requestId: string;
  agentName: string;
  agentRating: number;
  price: string;
  timeline: string;
  description: string;
  agentAvatar: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

interface Application {
  id: string;
  title: string;
  agent: string;
  agentAvatar: string;
  status:
    | "proposal_accepted"
    | "documents_uploaded"
    | "in_review"
    | "completed";
  progress: number;
  nextStep: string;
  deadline: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "uploaded" | "verified" | "rejected";
  category: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  message: string;
  timestamp: string;
  isClient: boolean;
}

interface ChatConversation {
  id: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export default function AgentsSection() {
  // Mock data
  const agentRequests: Request[] = [
    {
      id: "1",
      title: "H1-B Visa Application for Software Engineer",
      type: "Work Visa",
      country: "United States",
      status: "open",
      createdAt: "2024-12-20",
      proposalsCount: 5,
      budget: "$2,500",
    },
    {
      id: "2",
      title: "Canada Express Entry Application",
      type: "Permanent Residence",
      country: "Canada",
      status: "in_progress",
      createdAt: "2024-12-18",
      proposalsCount: 3,
      budget: "$3,200",
    },
  ];

  const proposals: Proposal[] = [
    {
      id: "1",
      requestId: "1",
      agentName: "Sarah Johnson",
      agentRating: 4.9,
      price: "$2,400",
      timeline: "30-45 days",
      description:
        "I have 8+ years of experience with H1-B applications and a 96% success rate.",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "pending",
      submittedAt: "2024-12-21",
    },
    {
      id: "2",
      requestId: "2",
      agentName: "Michael Chen",
      agentRating: 4.8,
      price: "$3,000",
      timeline: "45-60 days",
      description:
        "Specialized in Canadian immigration with 200+ successful Express Entry cases.",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "accepted",
      submittedAt: "2024-12-19",
    },
  ];

  const applications: Application[] = [
    {
      id: "1",
      title: "H1-B Visa Application",
      agent: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "documents_uploaded",
      progress: 65,
      nextStep: "Document review by immigration officer",
      deadline: "2025-01-15",
    },
    {
      id: "2",
      title: "Canada Express Entry",
      agent: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "in_review",
      progress: 80,
      nextStep: "Waiting for government response",
      deadline: "2025-02-01",
    },
  ];

  const documents: Document[] = [
    {
      id: "1",
      name: "Passport.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-12-20",
      status: "verified",
      category: "Identity",
    },
    {
      id: "2",
      name: "Degree_Certificate.pdf",
      type: "PDF",
      size: "1.8 MB",
      uploadedAt: "2024-12-19",
      status: "uploaded",
      category: "Education",
    },
    {
      id: "3",
      name: "Employment_Letter.pdf",
      type: "PDF",
      size: "945 KB",
      uploadedAt: "2024-12-21",
      status: "rejected",
      category: "Employment",
    },
  ];

  const chatConversations: ChatConversation[] = [
    {
      id: "1",
      agentId: "agent1",
      agentName: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage:
        "I've reviewed your documents and have some questions about...",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      agentId: "agent2",
      agentName: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Your application has been submitted successfully!",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      senderId: "agent1",
      senderName: "Sarah Johnson",
      senderAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      message:
        "Hi! I've started working on your H1-B application. I need to clarify a few details about your employment history.",
      timestamp: "3 hours ago",
      isClient: false,
    },
    {
      id: "2",
      senderId: "client",
      senderName: "You",
      senderAvatar: "",
      message: "Sure, what specific information do you need?",
      timestamp: "2 hours ago",
      isClient: true,
    },
    {
      id: "3",
      senderId: "agent1",
      senderName: "Sarah Johnson",
      senderAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      message:
        "I need the exact dates of your previous employment and any gaps in employment that lasted more than 30 days.",
      timestamp: "2 hours ago",
      isClient: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "uploaded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage("");
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 mb-1">
                  Active Requests
                </p>
                <p className="text-2xl font-bold text-vm-gray-900">
                  {agentRequests.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 mb-1">
                  Proposals Received
                </p>
                <p className="text-2xl font-bold text-vm-gray-900">
                  {proposals.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 mb-1">
                  Active Applications
                </p>
                <p className="text-2xl font-bold text-vm-gray-900">
                  {applications.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    New proposal received from Sarah Johnson
                  </p>
                  <p className="text-xs text-vm-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Documents uploaded for H1-B application
                  </p>
                  <p className="text-xs text-vm-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Application status updated
                  </p>
                  <p className="text-xs text-vm-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{app.title}</p>
                    <p className="text-xs text-vm-gray-500">
                      Next: {app.nextStep}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-vm-gray-600">{app.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMyRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vm-gray-900">My Requests</h3>
        <Button className="bg-vm-green hover:bg-vm-green-600">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid gap-6">
        {agentRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-vm-gray-900">
                      {request.title}
                    </h4>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-vm-gray-500 mb-3">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {request.type}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {request.country}
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
                    <p className="text-sm font-medium text-vm-green">
                      Budget: {request.budget}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProposals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vm-gray-900">Proposals</h3>
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
          <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
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
                      <h4 className="text-lg font-semibold text-vm-gray-900">
                        {proposal.agentName}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-vm-gray-600 ml-1">
                            {proposal.agentRating}
                          </span>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
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
                  <p className="text-vm-gray-600 mb-4">
                    {proposal.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {proposal.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-vm-green hover:bg-vm-green-600"
                        >
                          Accept Proposal
                        </Button>
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vm-gray-900">Applications</h3>
      </div>

      <div className="grid gap-6">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={application.agentAvatar}
                  alt={application.agent}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-vm-gray-900">
                        {application.title}
                      </h4>
                      <p className="text-sm text-vm-gray-600">
                        Agent: {application.agent}
                      </p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-vm-gray-600">Progress</span>
                      <span className="text-sm font-medium">
                        {application.progress}%
                      </span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-vm-gray-600">Next Step</p>
                      <p className="text-sm font-medium">
                        {application.nextStep}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-vm-gray-600">Deadline</p>
                      <p className="text-sm font-medium">
                        {application.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-vm-gray-900">Documents</h3>
        <Button className="bg-vm-green hover:bg-vm-green-600">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-vm-gray-900">
                      {document.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-vm-gray-500">
                      <span>{document.type}</span>
                      <span>{document.size}</span>
                      <span>{document.category}</span>
                      <span>Uploaded {document.uploadedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed border-2 border-vm-gray-300">
        <CardContent className="p-8 text-center">
          <Upload className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-vm-gray-900 mb-2">
            Upload New Document
          </h4>
          <p className="text-vm-gray-600 mb-4">
            Drag and drop your files here or click to browse
          </p>
          <Button className="bg-vm-green hover:bg-vm-green-600">
            Choose Files
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderChat = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {chatConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-vm-gray-50 transition-colors ${
                  selectedChat === conversation.id
                    ? "bg-vm-blue-50 border-r-2 border-vm-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedChat(conversation.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.agentAvatar}
                      alt={conversation.agentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-vm-gray-900 truncate">
                        {conversation.agentName}
                      </h4>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-vm-blue text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-vm-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-vm-gray-500">
                      {conversation.lastMessageTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        {selectedChat ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      chatConversations.find((c) => c.id === selectedChat)
                        ?.agentAvatar
                    }
                    alt={
                      chatConversations.find((c) => c.id === selectedChat)
                        ?.agentName
                    }
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-vm-gray-900">
                      {
                        chatConversations.find((c) => c.id === selectedChat)
                          ?.agentName
                      }
                    </h4>
                    <p className="text-sm text-vm-gray-500">
                      {chatConversations.find((c) => c.id === selectedChat)
                        ?.isOnline
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isClient ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isClient ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      {!message.isClient && (
                        <img
                          src={message.senderAvatar}
                          alt={message.senderName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${message.isClient ? "bg-vm-blue text-white" : "bg-vm-gray-100 text-vm-gray-900"}`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p
                          className={`text-xs mt-1 ${message.isClient ? "text-blue-100" : "text-vm-gray-500"}`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-vm-blue hover:bg-vm-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-vm-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-vm-gray-900 mb-2">
              Select a Conversation
            </h4>
            <p className="text-vm-gray-600">
              Choose a conversation from the left to start chatting
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );

  const agents = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Senior Immigration Consultant",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 127,
      experience: "8 years",
      location: "New York, NY",
      specializations: ["H1-B Visa", "Green Card", "Family Immigration"],
      hourlyRate: "$150",
      isOnline: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Immigration Lawyer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 98,
      experience: "6 years",
      location: "San Francisco, CA",
      specializations: ["Business Immigration", "EB-5 Visa", "L1 Visa"],
      hourlyRate: "$200",
      isOnline: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      title: "Immigration Consultant",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 82,
      experience: "4 years",
      location: "Miami, FL",
      specializations: ["Student Visa", "Work Visa", "Family Immigration"],
      hourlyRate: "$120",
      isOnline: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-vm-gray-900">
            Browse Agents
          </h2>
          <p className="text-vm-gray-600 mt-1">
            Find qualified immigration agents and chat with them directly
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {agent.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-vm-gray-900">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-vm-gray-600">{agent.title}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(agent.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-vm-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-vm-gray-600">
                      {agent.rating} ({agent.reviewCount})
                    </span>
                  </div>
                  <p className="text-xs text-vm-gray-500 mt-1">
                    {agent.experience} • {agent.location}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {agent.specializations.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-vm-green/10 text-vm-green text-xs rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {agent.specializations.length > 2 && (
                    <span className="px-2 py-1 bg-vm-gray-100 text-vm-gray-600 text-xs rounded-full">
                      +{agent.specializations.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-vm-gray-900">
                    {agent.hourlyRate}/hr
                  </span>
                  <Button
                    size="sm"
                    className="bg-vm-green hover:bg-vm-green-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full md:w-auto">
          Load More Agents
        </Button>
      </div>
    </div>
  );
}
