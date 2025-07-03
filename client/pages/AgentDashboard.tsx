import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-vm-green to-vm-green-600 rounded-lg p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Agent!</h1>
            <p className="text-white/90">
              Your agent dashboard is ready. Manage your clients, proposals, and
              grow your immigration practice.
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
                    <span className="font-semibold text-yellow-600">4.9/5</span>
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

      <AIChatAssistant />
    </div>
  );
}
