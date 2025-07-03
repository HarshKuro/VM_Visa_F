import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Clock,
  CheckCircle,
  Upload,
  MessageSquare,
  Calendar,
  DollarSign,
  User,
  FileText,
  AlertCircle,
  Target,
  Star,
} from "lucide-react";

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

interface ProjectTrackerProps {
  projects: Project[];
}

export default function ProjectTracker({ projects }: ProjectTrackerProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "proposal_sent":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "in_progress":
        return <Target className="w-4 h-4 text-yellow-600" />;
      case "review":
        return <FileText className="w-4 h-4 text-purple-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNextAction = (project: Project) => {
    switch (project.status) {
      case "proposal_sent":
        return "Waiting for client acceptance";
      case "in_progress":
        if (project.progress < 50) return "Document collection in progress";
        if (project.progress < 80) return "Application preparation";
        return "Final review and submission";
      case "review":
        return "Awaiting government review";
      case "completed":
        return "Project completed successfully";
      default:
        return "No action required";
    }
  };

  const projectMilestones = [
    { title: "Initial Consultation", completed: true },
    { title: "Document Collection", completed: true },
    { title: "Application Preparation", completed: false },
    { title: "Review & Submission", completed: false },
    { title: "Follow-up & Completion", completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-vm-gray-900">
            My Projects
          </h2>
          <p className="text-sm text-vm-gray-600">
            Track and manage your active immigration cases
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="review">Under Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Total Projects
                </p>
                <p className="text-2xl font-bold text-vm-gray-900">
                  {projects.length}
                </p>
              </div>
              <Target className="w-8 h-8 text-vm-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {projects.filter((p) => p.status === "in_progress").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Under Review
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {projects.filter((p) => p.status === "review").length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-vm-gray-600">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter((p) => p.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-vm-gray-900">
                          {project.title}
                        </h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace("_", " ")}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-vm-gray-600 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Client: {project.client}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{project.amount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {project.deadline}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-vm-gray-700">
                            Progress
                          </span>
                          <span className="text-sm text-vm-gray-600">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Next Action */}
                      <div className="flex items-center space-x-2 text-sm">
                        {getStatusIcon(project.status)}
                        <span className="text-vm-gray-600">
                          Next: {getNextAction(project)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Timeline */}
                <div className="space-y-4">
                  {/* Project Actions */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-vm-gray-900 text-sm">
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        View Docs
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        disabled={project.status !== "completed"}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>

                  {/* Project Milestones */}
                  <div>
                    <h4 className="font-medium text-vm-gray-900 text-sm mb-3">
                      Milestones
                    </h4>
                    <div className="space-y-2">
                      {projectMilestones.slice(0, 3).map((milestone, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              milestone.completed
                                ? "bg-vm-green"
                                : "bg-vm-gray-200"
                            }`}
                          >
                            {milestone.completed && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span
                            className={`text-xs ${
                              milestone.completed
                                ? "text-vm-gray-900 font-medium"
                                : "text-vm-gray-500"
                            }`}
                          >
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mark Complete Button */}
                  {project.status === "in_progress" &&
                    project.progress >= 90 && (
                      <Button
                        className="w-full bg-vm-green hover:bg-vm-green-600 text-white"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Complete
                      </Button>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-vm-gray-600 mb-4">
            {statusFilter === "all" && priorityFilter === "all"
              ? "You don't have any active projects yet."
              : "No projects match your current filters."}
          </p>
          {statusFilter !== "all" || priorityFilter !== "all" ? (
            <Button
              onClick={() => {
                setStatusFilter("all");
                setPriorityFilter("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}
