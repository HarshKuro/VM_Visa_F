import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Star,
  X,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
} from "lucide-react";
import Messages from "./Messages";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatState {
  isOpen: boolean;
  selectedAgent: any;
  messages: ChatMessage[];
  newMessage: string;
}

export default function AgentsSection() {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    selectedAgent: null,
    messages: [],
    newMessage: "",
  });
  const [showChat, setShowChat] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
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
    {
      id: "4",
      name: "David Kim",
      title: "Senior Immigration Attorney",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 156,
      experience: "10 years",
      location: "Los Angeles, CA",
      specializations: ["Corporate Immigration", "O1 Visa", "Green Card"],
      hourlyRate: "$250",
      isOnline: true,
    },
    {
      id: "5",
      name: "Lisa Wang",
      title: "Immigration Specialist",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 74,
      experience: "5 years",
      location: "Seattle, WA",
      specializations: ["Student Visa", "H1-B Visa", "Family Immigration"],
      hourlyRate: "$130",
      isOnline: false,
    },
    {
      id: "6",
      name: "Robert Martinez",
      title: "Immigration Consultant",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 93,
      experience: "7 years",
      location: "Chicago, IL",
      specializations: ["Asylum", "Citizenship", "Work Visa"],
      hourlyRate: "$140",
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
