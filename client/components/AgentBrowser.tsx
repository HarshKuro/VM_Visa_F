import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
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

export default function AgentBrowser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const agents: Agent[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "Immigration Attorney",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b898?w=150",
      rating: 4.9,
      reviewCount: 247,
      experience: "8 years",
      location: "New York, USA",
      languages: ["English", "Spanish"],
      expertise: ["H1-B Visa", "Work Permits", "Family Immigration"],
      hourlyRate: "$150-200",
      successRate: "95%",
      responseTime: "< 2 hours",
      description:
        "Experienced immigration attorney specializing in employment-based visas with a track record of successful H1-B applications.",
      isVerified: true,
      completedCases: 1200,
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Immigration Consultant",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4.8,
      reviewCount: 189,
      experience: "12 years",
      location: "Toronto, Canada",
      languages: ["English", "Mandarin", "Cantonese"],
      expertise: ["Express Entry", "Provincial Nominee", "Study Permits"],
      hourlyRate: "$120-180",
      successRate: "92%",
      responseTime: "< 4 hours",
      description:
        "Canadian immigration specialist with extensive experience in Express Entry and Provincial Nominee Programs.",
      isVerified: true,
      completedCases: 890,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      title: "Visa Specialist",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 4.7,
      reviewCount: 156,
      experience: "6 years",
      location: "London, UK",
      languages: ["English", "Spanish", "French"],
      expertise: ["UK Tier 2", "Student Visas", "Business Immigration"],
      hourlyRate: "$100-150",
      successRate: "89%",
      responseTime: "< 6 hours",
      description:
        "UK immigration expert helping professionals and students navigate the British immigration system.",
      isVerified: false,
      completedCases: 445,
    },
    {
      id: "4",
      name: "Robert Kim",
      title: "Immigration Lawyer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 4.9,
      reviewCount: 312,
      experience: "15 years",
      location: "Sydney, Australia",
      languages: ["English", "Korean"],
      expertise: ["Skilled Migration", "Partner Visas", "Business Visas"],
      hourlyRate: "$180-250",
      successRate: "96%",
      responseTime: "< 3 hours",
      description:
        "Senior immigration lawyer with expertise in Australian skilled migration and business visa programs.",
      isVerified: true,
      completedCases: 1850,
    },
  ];

  const expertiseOptions = [
    "H1-B Visa",
    "Express Entry",
    "Work Permits",
    "Student Visas",
    "Family Immigration",
    "Business Immigration",
    "Investment Visas",
    "Permanent Residency",
  ];

  const locationOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "Netherlands",
  ];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesExpertise =
      !selectedExpertise ||
      selectedExpertise === "all" ||
      agent.expertise.includes(selectedExpertise);
    const matchesLocation =
      !selectedLocation ||
      selectedLocation === "all" ||
      agent.location.includes(selectedLocation);

    return matchesSearch && matchesExpertise && matchesLocation;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience);
      case "price_low":
        return (
          parseInt(a.hourlyRate.split("-")[0].replace("$", "")) -
          parseInt(b.hourlyRate.split("-")[0].replace("$", ""))
        );
      case "price_high":
        return (
          parseInt(b.hourlyRate.split("-")[0].replace("$", "")) -
          parseInt(a.hourlyRate.split("-")[0].replace("$", ""))
        );
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-vm-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <Select
            value={selectedExpertise}
            onValueChange={setSelectedExpertise}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expertise</SelectItem>
              {expertiseOptions.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locationOptions.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-vm-gray-900">
          Immigration Experts ({sortedAgents.length} found)
        </h2>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Agent Cards */}
      <div className="grid gap-6">
        {sortedAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {/* Avatar and Basic Info */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {agent.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-vm-green rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-vm-gray-900">
                          {agent.name}
                        </h3>
                        {agent.isVerified && (
                          <Badge className="bg-vm-green text-white text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-vm-gray-600 font-medium">
                        {agent.title}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-vm-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{agent.rating}</span>
                          <span className="ml-1">
                            ({agent.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{agent.experience} experience</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-vm-green">
                        {agent.hourlyRate}
                      </p>
                      <p className="text-sm text-vm-gray-500">per hour</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-gray-900">
                        {agent.successRate}
                      </div>
                      <div className="text-xs text-vm-gray-600">
                        Success Rate
                      </div>
                    </div>
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-gray-900">
                        {agent.completedCases}
                      </div>
                      <div className="text-xs text-vm-gray-600">
                        Cases Completed
                      </div>
                    </div>
                    <div className="text-center p-3 bg-vm-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-vm-gray-900">
                        {agent.responseTime}
                      </div>
                      <div className="text-xs text-vm-gray-600">
                        Response Time
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-vm-gray-600 mb-4">{agent.description}</p>

                  {/* Expertise and Languages */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-medium text-vm-gray-700 mr-2">
                        Expertise:
                      </span>
                      <div className="inline-flex flex-wrap gap-1">
                        {agent.expertise.map((skill) => (
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
                    <div>
                      <span className="text-sm font-medium text-vm-gray-700 mr-2">
                        Languages:
                      </span>
                      <span className="text-sm text-vm-gray-600">
                        {agent.languages.join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <Button className="bg-vm-green hover:bg-vm-green-600 text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Agent
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedAgents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
            No agents found
          </h3>
          <p className="text-vm-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedExpertise("all");
              setSelectedLocation("all");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
