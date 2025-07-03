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
  Clock,
  DollarSign,
  MapPin,
  User,
  Star,
  Zap,
  Eye,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

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
  clientRating: number;
  paymentVerified: boolean;
}

interface RequestsBrowserProps {
  onSendProposal: (request: Request) => void;
}

export default function RequestsBrowser({
  onSendProposal,
}: RequestsBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const requests: Request[] = [
    {
      id: "1",
      title: "Investment Visa for Tech Startup Founder",
      client: "David Kim",
      type: "Investment Visa",
      country: "United States",
      budget: "$3,000 - $5,000",
      description:
        "Need expert guidance for EB-5 investment visa application. Have startup valued at $2M+ and looking to expand to US market. Previous experience with tech companies preferred.",
      postedTime: "2 hours ago",
      urgency: "high",
      proposals: 3,
      isMatched: true,
      clientRating: 5.0,
      paymentVerified: true,
    },
    {
      id: "2",
      title: "Family Sponsorship Application - Spouse Visa",
      client: "Maria Lopez",
      type: "Family Immigration",
      country: "Canada",
      budget: "$1,500 - $2,500",
      description:
        "Looking to sponsor my spouse for permanent residency in Canada. We have all the required documents and need help with the application process.",
      postedTime: "5 hours ago",
      urgency: "medium",
      proposals: 7,
      isMatched: false,
      clientRating: 4.8,
      paymentVerified: true,
    },
    {
      id: "3",
      title: "Student Visa for Graduate Program",
      client: "Ahmed Hassan",
      type: "Student Visa",
      country: "Australia",
      budget: "$800 - $1,200",
      description:
        "Need help with student visa application for PhD program in Melbourne. Have admission letter and need guidance on financial requirements.",
      postedTime: "1 day ago",
      urgency: "low",
      proposals: 12,
      isMatched: true,
      clientRating: 4.5,
      paymentVerified: false,
    },
    {
      id: "4",
      title: "H1-B Transfer and Green Card Process",
      client: "Priya Patel",
      type: "Work Visa",
      country: "United States",
      budget: "$2,500 - $4,000",
      description:
        "Software engineer looking to transfer H1-B to new company and start green card process. Current H1-B expires in 6 months.",
      postedTime: "3 hours ago",
      urgency: "urgent",
      proposals: 5,
      isMatched: true,
      clientRating: 4.9,
      paymentVerified: true,
    },
    {
      id: "5",
      title: "UK Skilled Worker Visa - Healthcare Professional",
      client: "James Wilson",
      type: "Work Visa",
      country: "United Kingdom",
      budget: "$1,200 - $2,000",
      description:
        "Registered nurse seeking skilled worker visa for NHS position. Have job offer and certificate of sponsorship.",
      postedTime: "6 hours ago",
      urgency: "medium",
      proposals: 9,
      isMatched: false,
      clientRating: 4.7,
      paymentVerified: true,
    },
  ];

  const visaTypes = [
    "Work Visa",
    "Student Visa",
    "Family Immigration",
    "Investment Visa",
    "Business Visa",
    "Tourist Visa",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "Netherlands",
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all" || request.type === selectedType;
    const matchesCountry =
      selectedCountry === "all" || request.country === selectedCountry;
    const matchesUrgency =
      selectedUrgency === "all" || request.urgency === selectedUrgency;

    return matchesSearch && matchesType && matchesCountry && matchesUrgency;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime()
        );
      case "budget_high":
        return (
          parseInt(b.budget.split(" - ")[1].replace(/[$,]/g, "")) -
          parseInt(a.budget.split(" - ")[1].replace(/[$,]/g, ""))
        );
      case "budget_low":
        return (
          parseInt(a.budget.split(" - ")[0].replace(/[$,]/g, "")) -
          parseInt(b.budget.split(" - ")[0].replace(/[$,]/g, ""))
        );
      case "proposals":
        return a.proposals - b.proposals;
      case "matched":
        return b.isMatched ? 1 : -1;
      default:
        return 0;
    }
  });

  const matchedRequests = sortedRequests.filter((req) => req.isMatched);
  const regularRequests = sortedRequests.filter((req) => !req.isMatched);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-vm-gray-900">
            Browse Requests
          </h2>
          <p className="text-sm text-vm-gray-600">
            Find immigration projects that match your expertise
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Visa Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="budget_high">Highest Budget</SelectItem>
                <SelectItem value="budget_low">Lowest Budget</SelectItem>
                <SelectItem value="proposals">Fewest Proposals</SelectItem>
                <SelectItem value="matched">AI Matched</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-vm-gray-600">
          {sortedRequests.length} requests found • {matchedRequests.length} AI
          matched
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-vm-gray-600">View:</span>
          <Button variant="outline" size="sm">
            Grid
          </Button>
          <Button variant="outline" size="sm">
            List
          </Button>
        </div>
      </div>

      {/* AI Matched Requests Section */}
      {matchedRequests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-vm-green" />
            <h3 className="text-lg font-semibold text-vm-gray-900">
              AI Recommended for You
            </h3>
            <Badge className="bg-vm-green text-white">
              {matchedRequests.length} matches
            </Badge>
          </div>

          <div className="grid gap-4">
            {matchedRequests.map((request) => (
              <Card
                key={request.id}
                className="hover:shadow-lg transition-shadow border-vm-green/20 bg-vm-green/5"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <h3 className="text-lg font-semibold text-vm-gray-900">
                          {request.title}
                        </h3>
                        <Badge className="bg-vm-green text-white">
                          AI Match
                        </Badge>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                        {request.paymentVerified && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Payment Verified
                          </Badge>
                        )}
                      </div>

                      <p className="text-vm-gray-600 mb-4 line-clamp-2">
                        {request.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-vm-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-vm-gray-900">
                              {request.client}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-vm-gray-600 ml-1">
                                {request.clientRating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-vm-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-vm-gray-900">
                              {request.budget}
                            </div>
                            <div className="text-xs text-vm-gray-600">
                              Budget
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-vm-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-vm-gray-900">
                              {request.country}
                            </div>
                            <div className="text-xs text-vm-gray-600">
                              {request.type}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-vm-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-vm-gray-900">
                              {request.postedTime}
                            </div>
                            <div className="text-xs text-vm-gray-600">
                              {request.proposals} proposals
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => onSendProposal(request)}
                          className="bg-vm-green hover:bg-vm-green-600"
                        >
                          Send Proposal
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message Client
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Requests Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-vm-gray-900">All Requests</h3>

        <div className="grid gap-4">
          {regularRequests.map((request) => (
            <Card
              key={request.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <h3 className="text-lg font-semibold text-vm-gray-900">
                        {request.title}
                      </h3>
                      <Badge className={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                      {request.paymentVerified && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Payment Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-vm-gray-600 mb-4 line-clamp-2">
                      {request.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-vm-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-vm-gray-900">
                            {request.client}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-vm-gray-600 ml-1">
                              {request.clientRating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-vm-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-vm-gray-900">
                            {request.budget}
                          </div>
                          <div className="text-xs text-vm-gray-600">Budget</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-vm-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-vm-gray-900">
                            {request.country}
                          </div>
                          <div className="text-xs text-vm-gray-600">
                            {request.type}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-vm-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-vm-gray-900">
                            {request.postedTime}
                          </div>
                          <div className="text-xs text-vm-gray-600">
                            {request.proposals} proposals
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => onSendProposal(request)}
                        variant="outline"
                        className="border-vm-green text-vm-green hover:bg-vm-green hover:text-white"
                      >
                        Send Proposal
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Client
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {sortedRequests.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-vm-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-vm-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-vm-gray-600 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("all");
              setSelectedCountry("all");
              setSelectedUrgency("all");
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
