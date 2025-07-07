import { useState, useEffect } from "react";
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
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
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

    const savedSidebarState = localStorage.getItem("sidebarCollapsed");
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
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

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
        <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md hover:shadow-blue-100/50">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 group-hover:text-blue-700 transition-colors duration-300">
                  Total Agents
                </p>
                <p className="text-3xl font-bold text-vm-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                  {organizationData.totalAgents}
                </p>
                <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                  {organizationData.activeAgents} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Users className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md hover:shadow-green-100/50"
          style={{ animationDelay: "100ms" }}
        >
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 group-hover:text-green-700 transition-colors duration-300">
                  Requests Fulfilled
                </p>
                <p className="text-3xl font-bold text-vm-gray-900 group-hover:text-green-800 transition-colors duration-300">
                  {organizationData.requestsFulfilled}
                </p>
                <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                  +12 this month
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <CheckCircle className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md hover:shadow-yellow-100/50"
          style={{ animationDelay: "200ms" }}
        >
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 group-hover:text-yellow-700 transition-colors duration-300">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-vm-gray-900 group-hover:text-yellow-800 transition-colors duration-300">
                  {organizationData.successRate}
                </p>
                <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                  +2% this month
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Star className="w-5 h-5 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md hover:shadow-purple-100/50"
          style={{ animationDelay: "300ms" }}
        >
          <CardContent className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600 group-hover:text-purple-700 transition-colors duration-300">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-vm-gray-900 group-hover:text-purple-800 transition-colors duration-300">
                  $24,580
                </p>
                <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors duration-300">
                  +8% this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <DollarSign className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors duration-300" />
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
    <div className="min-h-screen bg-gradient-to-br from-vm-gray-50 to-vm-gray-100/50">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-vm-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Organization Logo & Name */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <img
                    src={organizationData.logo}
                    alt={organizationData.name}
                    className="w-10 h-10 rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-xl bg-vm-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-vm-gray-900 group-hover:text-vm-green transition-colors duration-300">
                    {organizationData.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-vm-gray-500">
                      {organizationData.country}
                    </span>
                    {organizationData.verified && (
                      <div className="flex items-center space-x-1 bg-vm-green/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-vm-green animate-pulse" />
                        <span className="text-xs text-vm-green font-medium">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="relative hover:bg-vm-green/5 hover:border-vm-green/30 transition-all duration-300 hover:scale-105"
              >
                <Bell className="w-4 h-4 text-vm-gray-600 hover:text-vm-green transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </Button>
              <div className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-vm-green/5 hover:border-vm-green/30 transition-all duration-300 hover:scale-105"
                >
                  <Building className="w-4 h-4 mr-2 text-vm-gray-600 group-hover:text-vm-green transition-colors duration-300" />
                  <span className="text-vm-gray-700 group-hover:text-vm-green transition-colors duration-300">
                    Organization
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2 text-vm-gray-600 group-hover:text-vm-green transition-all duration-300 group-hover:rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Mobile Overlay */}
        {isMobile && !sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-white/95 backdrop-blur-md border-r border-vm-gray-200 min-h-screen shadow-lg transition-all duration-300 ease-in-out z-50 ${
            isMobile ? "fixed" : "relative"
          }`}
        >
          <div className="p-4">
            {/* Sidebar Header with Toggle */}
            <div className="flex items-center justify-between mb-6">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-vm-green to-vm-green-600 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-vm-gray-900 text-sm truncate">
                      Organization
                    </h3>
                    <p className="text-xs text-vm-gray-500 truncate">
                      Dashboard
                    </p>
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

            <nav className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center ${
                        sidebarCollapsed
                          ? "justify-center px-3"
                          : "space-x-3 px-4"
                      } py-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 group/btn ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-vm-green/10 to-vm-green/5 text-vm-green border border-vm-green/20 shadow-lg shadow-vm-green/10"
                          : "text-vm-gray-600 hover:bg-vm-gray-50 hover:text-vm-gray-900"
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <Icon
                        className={`w-4 h-4 transition-all duration-300 ${
                          activeTab === item.id
                            ? "text-vm-green scale-110"
                            : "text-vm-gray-500 group-hover/btn:text-vm-green group-hover/btn:scale-110"
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <>
                          <span
                            className={`font-medium transition-all duration-300 ${
                              activeTab === item.id
                                ? "text-vm-green"
                                : "group-hover/btn:text-vm-gray-900"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Active indicator */}
                          {activeTab === item.id && (
                            <div className="ml-auto">
                              <div className="w-2 h-2 bg-vm-green rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Left border indicator */}
                      <div
                        className={`absolute left-0 w-1 h-8 bg-vm-green rounded-r-full transition-all duration-300 ${
                          activeTab === item.id
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-0 group-hover/btn:opacity-100 group-hover/btn:scale-y-100"
                        }`}
                      ></div>
                    </button>

                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-vm-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                          {item.label}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-vm-gray-900 rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            {!sidebarCollapsed && (
              <div className="mt-8 pt-6 border-t border-vm-gray-200">
                <div className="bg-gradient-to-r from-vm-green/5 to-vm-green/10 border border-vm-green/20 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-vm-green to-vm-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs text-vm-gray-500 mb-1">
                      Organization
                    </p>
                    <p className="text-sm font-medium text-vm-gray-900 truncate">
                      {organizationData.name}
                    </p>
                    {organizationData.verified && (
                      <div className="flex items-center justify-center mt-2">
                        <CheckCircle className="w-3 h-3 text-vm-green mr-1" />
                        <span className="text-xs text-vm-green font-medium">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Collapsed organization info */}
            {sidebarCollapsed && (
              <div className="mt-8 pt-6 border-t border-vm-gray-200">
                <div className="flex justify-center group relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-vm-green to-vm-green-600 rounded-full flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  {organizationData.verified && (
                    <div className="absolute -top-1 -right-1">
                      <CheckCircle className="w-3 h-3 text-vm-green bg-white rounded-full" />
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-vm-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      {organizationData.name}
                      {organizationData.verified && (
                        <span className="block text-xs text-vm-green">
                          ✓ Verified
                        </span>
                      )}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-vm-gray-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 p-8 transition-all duration-300 ${isMobile && !sidebarCollapsed ? "blur-sm" : ""}`}
        >
          {/* Mobile menu button */}
          {isMobile && sidebarCollapsed && (
            <div className="mb-6">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-3 bg-white rounded-lg shadow-md border border-vm-gray-200 hover:shadow-lg transition-all duration-200"
              >
                <Menu className="w-5 h-5 text-vm-gray-600" />
              </button>
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
