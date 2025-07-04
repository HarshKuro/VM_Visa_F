import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import {
  Building,
  Users,
  UserPlus,
  FileText,
  CreditCard,
  Settings,
  Bell,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  UserX,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Star,
  Activity,
} from "lucide-react";

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);

  // Mock organization data
  const organizationData = {
    name: "Global Immigration Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face",
    country: "United States",
    verified: true,
    memberSince: "2023",
    totalAgents: 12,
    activeAgents: 10,
    requestsFulfilled: 234,
    successRate: "94%",
  };

  // Mock agents data
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@globalmigration.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Consultant",
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      dateAdded: "2023-01-15",
      requestsHandled: 45,
      successRate: "96%",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@globalmigration.com",
      phone: "+1 (555) 234-5678",
      role: "Immigration Lawyer",
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      dateAdded: "2023-02-20",
      requestsHandled: 38,
      successRate: "92%",
      lastActive: "5 minutes ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@globalmigration.com",
      phone: "+1 (555) 345-6789",
      role: "Consultant",
      status: "Inactive",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      dateAdded: "2023-03-10",
      requestsHandled: 22,
      successRate: "89%",
      lastActive: "3 days ago",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      agent: "Sarah Johnson",
      action: "Accepted H1-B visa request",
      client: "John Smith",
      status: "Accepted",
      time: "2 hours ago",
    },
    {
      id: 2,
      agent: "Michael Chen",
      action: "Completed family immigration case",
      client: "Maria Garcia",
      status: "Completed",
      time: "4 hours ago",
    },
    {
      id: 3,
      agent: "Sarah Johnson",
      action: "Submitted proposal for student visa",
      client: "Ahmed Hassan",
      status: "Pending",
      time: "6 hours ago",
    },
  ];

  const sidebarItems = [
    { id: "overview", label: "Dashboard Overview", icon: Activity },
    { id: "agents", label: "My Agents", icon: Users },
    { id: "add-agent", label: "Add Agent", icon: UserPlus },
    { id: "requests", label: "Requests Posted", icon: FileText },
    { id: "billing", label: "Billing & Subscription", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Total Agents
                </p>
                <p className="text-3xl font-bold text-vm-gray-900">
                  {organizationData.totalAgents}
                </p>
                <p className="text-sm text-green-600">
                  {organizationData.activeAgents} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Requests Fulfilled
                </p>
                <p className="text-3xl font-bold text-vm-gray-900">
                  {organizationData.requestsFulfilled}
                </p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                <p className="text-3xl font-bold text-vm-gray-900">
                  {organizationData.successRate}
                </p>
                <p className="text-sm text-green-600">+2% this month</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-vm-gray-900">$24,580</p>
                <p className="text-sm text-green-600">+8% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Agent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-vm-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-vm-gray-900">
                      {activity.agent}
                    </span>
                    <span className="text-vm-gray-600">{activity.action}</span>
                  </div>
                  <div className="text-sm text-vm-gray-500">
                    Client: {activity.client} • {activity.time}
                  </div>
                </div>
                <Badge
                  variant={
                    activity.status === "Completed"
                      ? "default"
                      : activity.status === "Accepted"
                        ? "secondary"
                        : "outline"
                  }
                  className={
                    activity.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "Accepted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      {/* Agents Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-vm-gray-900">My Agents</h2>
        <Button
          onClick={() => setShowAddAgentModal(true)}
          className="bg-vm-green hover:bg-vm-green-600"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
          <Input placeholder="Search agents..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Agents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-vm-gray-50 border-b border-vm-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Agent
                  </th>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Contact
                  </th>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Role
                  </th>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Performance
                  </th>
                  <th className="text-left p-4 font-medium text-vm-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="border-b border-vm-gray-100 hover:bg-vm-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-vm-gray-900">
                            {agent.name}
                          </div>
                          <div className="text-sm text-vm-gray-500">
                            Added {agent.dateAdded}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-vm-gray-600">
                          <Mail className="w-3 h-3 mr-1" />
                          {agent.email}
                        </div>
                        <div className="flex items-center text-sm text-vm-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {agent.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-vm-gray-900">
                        {agent.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <Badge
                          variant={
                            agent.status === "Active" ? "default" : "secondary"
                          }
                          className={
                            agent.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {agent.status}
                        </Badge>
                        <div className="text-xs text-vm-gray-500">
                          Last active: {agent.lastActive}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-vm-gray-900">
                          {agent.requestsHandled} requests
                        </div>
                        <div className="text-sm text-green-600">
                          {agent.successRate} success rate
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "agents":
        return renderAgents();
      case "add-agent":
        return (
          <div className="text-center py-8">
            <UserPlus className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Add New Agent
            </h3>
            <p className="text-vm-gray-600 mb-4">
              Add agent functionality will be implemented here
            </p>
            <Button className="bg-vm-green hover:bg-vm-green-600">
              Add Agent
            </Button>
          </div>
        );
      case "requests":
        return (
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Posted Requests
            </h3>
            <p className="text-vm-gray-600">
              Request management functionality will be implemented here
            </p>
          </div>
        );
      case "billing":
        return (
          <div className="text-center py-8">
            <CreditCard className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Billing & Subscription
            </h3>
            <p className="text-vm-gray-600">
              Billing management functionality will be implemented here
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-8">
            <Settings className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
              Organization Settings
            </h3>
            <p className="text-vm-gray-600">
              Settings functionality will be implemented here
            </p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-vm-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-vm-gray-200 sticky top-0 z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Organization Logo & Name */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={organizationData.logo}
                  alt={organizationData.name}
                  className="w-8 h-8 rounded-lg"
                />
                <div>
                  <h1 className="text-lg font-bold text-vm-gray-900">
                    {organizationData.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-vm-gray-500">
                      {organizationData.country}
                    </span>
                    {organizationData.verified && (
                      <CheckCircle className="w-3 h-3 text-vm-green" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="relative">
                <Button variant="outline" size="sm">
                  <Building className="w-4 h-4 mr-2" />
                  Organization
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-vm-gray-900 to-vm-gray-800 border-r border-vm-gray-700 min-h-screen shadow-xl">
          <div className="p-6">
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 group ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-vm-green to-vm-green-600 text-white shadow-lg shadow-vm-green/25 scale-105"
                        : "text-vm-gray-300 hover:bg-vm-gray-700/50 hover:text-white"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Icon
                      className={`w-4 h-4 transition-all duration-300 ${
                        activeTab === item.id
                          ? "text-white scale-110"
                          : "text-vm-gray-400 group-hover:text-vm-green group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={`font-medium transition-all duration-300 ${
                        activeTab === item.id
                          ? "text-white"
                          : "group-hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active indicator */}
                    {activeTab === item.id && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}

                    {/* Hover indicator */}
                    <div
                      className={`absolute left-0 w-1 h-8 bg-vm-green rounded-r-full transition-all duration-300 ${
                        activeTab === item.id
                          ? "opacity-100 scale-y-100"
                          : "opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"
                      }`}
                    ></div>
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="mt-8 pt-6 border-t border-vm-gray-700">
              <div className="bg-vm-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-vm-gray-400 mb-1">Organization</p>
                  <p className="text-sm font-medium text-white truncate">
                    {organizationData.name}
                  </p>
                  {organizationData.verified && (
                    <div className="flex items-center justify-center mt-2">
                      <CheckCircle className="w-3 h-3 text-vm-green mr-1" />
                      <span className="text-xs text-vm-green">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
