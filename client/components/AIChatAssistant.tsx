import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  FileText,
  Users,
  Clock,
  ExternalLink,
  UserPlus,
  Phone,
  MapPin,
  Minimize2,
  Maximize2,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
  actionButtons?: ActionButton[];
}

interface ActionButton {
  text: string;
  action: () => void;
  icon?: any;
  variant?: "primary" | "secondary" | "outline";
}

interface UserContext {
  name?: string;
  country?: string;
  visaType?: string;
  purpose?: string;
}

export default function AIChatAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Start closed, only open when clicked
  const [isMinimized, setIsMinimized] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to VM Visa Support! 👋",
      isUser: false,
      timestamp: new Date(Date.now() - 10000),
    },
    {
      id: "2",
      text: "I'm your AI immigration assistant. I can help you with visa applications, document requirements, connect you with expert agents, and answer any immigration questions you have.",
      isUser: false,
      timestamp: new Date(Date.now() - 8000),
    },
    {
      id: "3",
      text: "How can I assist you today? 😊",
      isUser: false,
      timestamp: new Date(Date.now() - 5000),
      suggestions: [
        "I need help with H1-B visa",
        "What documents do I need?",
        "Find immigration agents",
        "Student visa information",
        "Processing times",
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const predefinedQuestions = [
    "What documents do I need for a work visa?",
    "How long does visa processing take?",
    "What are the different visa types?",
    "Can you help me check my application status?",
    "How to find the right immigration agent?",
    "What's the success rate for H1-B visas?",
  ];

  const quickActions = [
    {
      icon: FileText,
      label: "Document Help",
      action: "What documents do I need for my visa application?",
    },
    {
      icon: Users,
      label: "Find Agents",
      action: "Help me find immigration agents for my case",
    },
    {
      icon: Clock,
      label: "Processing Time",
      action: "How long will my visa application take?",
    },
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText || isTyping) return;

    // Extract user context from message
    updateUserContext(messageText);

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate realistic typing delay with animation
    const typingDelay = Math.min(messageText.length * 50 + 1500, 4000);

    setTimeout(() => {
      const { response, suggestions, actionButtons } =
        getAIResponse(messageText);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        suggestions,
        actionButtons,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      setShowSuggestions(true);
    }, typingDelay);
  };

  const updateUserContext = (message: string) => {
    const lowercaseMessage = message.toLowerCase();

    // Extract name
    if (
      lowercaseMessage.includes("my name is") ||
      lowercaseMessage.includes("i'm") ||
      lowercaseMessage.includes("i am")
    ) {
      const nameMatch = message.match(/(?:my name is|i'm|i am)\s+([a-zA-Z]+)/i);
      if (nameMatch) {
        setUserContext((prev) => ({ ...prev, name: nameMatch[1] }));
      }
    }

    // Extract country
    const countries = [
      "canada",
      "usa",
      "united states",
      "uk",
      "united kingdom",
      "australia",
      "germany",
      "france",
      "singapore",
      "india",
    ];
    const mentionedCountry = countries.find((country) =>
      lowercaseMessage.includes(country),
    );
    if (mentionedCountry) {
      setUserContext((prev) => ({ ...prev, country: mentionedCountry }));
    }

    // Extract visa type
    if (
      lowercaseMessage.includes("work visa") ||
      lowercaseMessage.includes("h1-b") ||
      lowercaseMessage.includes("employment")
    ) {
      setUserContext((prev) => ({
        ...prev,
        visaType: "work",
        purpose: "employment",
      }));
    } else if (
      lowercaseMessage.includes("student") ||
      lowercaseMessage.includes("f1") ||
      lowercaseMessage.includes("study")
    ) {
      setUserContext((prev) => ({
        ...prev,
        visaType: "student",
        purpose: "education",
      }));
    } else if (
      lowercaseMessage.includes("tourist") ||
      lowercaseMessage.includes("visit") ||
      lowercaseMessage.includes("b1/b2")
    ) {
      setUserContext((prev) => ({
        ...prev,
        visaType: "tourist",
        purpose: "tourism",
      }));
    } else if (
      lowercaseMessage.includes("family") ||
      lowercaseMessage.includes("spouse") ||
      lowercaseMessage.includes("marriage")
    ) {
      setUserContext((prev) => ({
        ...prev,
        visaType: "family",
        purpose: "family reunification",
      }));
    }
  };

  const getAIResponse = (
    userMessage: string,
  ): {
    response: string;
    suggestions?: string[];
    actionButtons?: ActionButton[];
  } => {
    const lowercaseMessage = userMessage.toLowerCase();
    const userName = userContext.name ? `, ${userContext.name}` : "";
    const contextInfo =
      userContext.country || userContext.visaType
        ? `\n\n*Based on your interest in ${userContext.visaType || "immigration"} ${userContext.country ? `for ${userContext.country}` : ""}*`
        : "";

    if (
      lowercaseMessage.includes("my name is") ||
      lowercaseMessage.includes("i'm") ||
      lowercaseMessage.includes("i am")
    ) {
      const nameMatch = userMessage.match(
        /(?:my name is|i'm|i am)\s+([a-zA-Z]+)/i,
      );
      const extractedName = nameMatch ? nameMatch[1] : "";
      return {
        response: `Nice to meet you, ${extractedName}! 🎉 I'm excited to help you with your immigration journey.\n\nI specialize in:\n• Visa requirements & documentation\n• Connecting you with verified experts\n• Processing timelines & costs\n• Application guidance\n\nWhat type of visa or immigration question can I help you with today?`,
        suggestions: [
          "I need a work visa",
          "Help with student visa",
          "Family immigration questions",
          "Find immigration agents",
          "Document requirements",
        ],
      };
    }

    if (lowercaseMessage.includes("document")) {
      return {
        response: `📄 **Document Requirements${userName}:**\n\nFor most visa applications, you'll need:\n• Valid passport (6+ months validity)\n• Completed application forms\n• Passport-sized photos\n• Financial statements/bank records\n• Supporting documents (varies by visa type)${contextInfo}\n\nI can help you create a personalized document checklist!`,
        suggestions: [
          "Create my document checklist",
          "What financial documents do I need?",
          "Photo requirements details",
          "Help with application forms",
        ],
        actionButtons: [
          {
            text: "Get Document Checklist",
            action: () => navigate("/signup"),
            icon: FileText,
            variant: "primary",
          },
          {
            text: "Find Document Expert",
            action: () => navigate("/services"),
            icon: Users,
            variant: "secondary",
          },
        ],
      };
    } else if (
      lowercaseMessage.includes("processing") ||
      lowercaseMessage.includes("time")
    ) {
      return {
        response: `⏱️ **Processing Times${userName}:**\n\n• Tourist visas: 2-4 weeks\n• Work visas (H1-B): 4-8 weeks\n• Student visas: 4-12 weeks\n• Family visas: 8-15 months\n• Investment visas: 6-18 months${contextInfo}\n\n*Times vary by country and current workload. Premium processing available for some categories.*`,
        suggestions: [
          "Premium processing options",
          "How to track my application",
          "Factors affecting processing time",
          "Expedite my application",
        ],
      };
    } else if (
      lowercaseMessage.includes("agent") ||
      lowercaseMessage.includes("expert")
    ) {
      return {
        response: `🔍 **Finding the Right Agent${userName}:**\n\nOur platform has 500+ verified immigration experts${contextInfo}. I recommend filtering by:\n• Your visa type expertise\n• Success rate (look for 90%+)\n• Response time\n• Client reviews\n\nLet me help you find the perfect match!`,
        suggestions: [
          "Show me top-rated agents",
          "Agents for my visa type",
          "Compare agent prices",
          "Read agent reviews",
        ],
        actionButtons: [
          {
            text: "Browse Agents",
            action: () => navigate("/services"),
            icon: Users,
            variant: "primary",
          },
          {
            text: "Post My Request",
            action: () => navigate("/signup"),
            icon: FileText,
            variant: "secondary",
          },
        ],
      };
    } else if (
      lowercaseMessage.includes("cost") ||
      lowercaseMessage.includes("fee") ||
      lowercaseMessage.includes("price")
    ) {
      return {
        response: `💰 **Typical Costs${userName}:**\n\n• Government fees: $200-$2,000+\n• Agent services: $500-$5,000\n• Document prep: $200-$1,000\n• Premium processing: $1,000-$2,500${contextInfo}\n\nCosts vary significantly by visa type and complexity.`,
        suggestions: [
          "Get personalized cost estimate",
          "Compare agent pricing",
          "Government fee calculator",
          "Payment plans available?",
        ],
        actionButtons: [
          {
            text: "Get Cost Estimate",
            action: () => navigate("/signup"),
            icon: FileText,
            variant: "primary",
          },
        ],
      };
    } else if (
      lowercaseMessage.includes("success rate") ||
      lowercaseMessage.includes("chances")
    ) {
      return {
        response: `📈 **Success Rates${userName}:**\n\n• H1-B: 85-95% (with proper prep)\n• Tourist: 90-95%\n• Student: 88-92%\n• Family: 95-98%${contextInfo}\n\nSuccess depends on proper documentation, expert guidance, and meeting requirements. Our agents maintain 91% average success rate!`,
        suggestions: [
          "How to improve my chances",
          "Common rejection reasons",
          "Success stories",
          "Find expert help",
        ],
      };
    } else if (
      lowercaseMessage.includes("help") ||
      lowercaseMessage.includes("support") ||
      lowercaseMessage.includes("talk to human")
    ) {
      return {
        response: `🤝 **Human Support${userName}:**\n\nI'd be happy to connect you with our human support team!\n\nYour options:\n• Live chat with support agents\n• Schedule a consultation call\n• Connect with immigration experts\n• Emergency support hotline`,
        actionButtons: [
          {
            text: "Talk to Human Support",
            action: () => navigate("/contact"),
            icon: Phone,
            variant: "primary",
          },
          {
            text: "Schedule Consultation",
            action: () => navigate("/signup"),
            icon: Calendar,
            variant: "secondary",
          },
        ],
      };
    } else {
      return {
        response: `🤖 **I'm here to help${userName}:**\n\n• Visa requirements & processes\n• Document checklists\n• Agent recommendations\n• Processing timelines\n• Cost estimates${contextInfo}\n\nFor complex cases, I can connect you with our expert immigration agents. What specific immigration question can I help you with?`,
        suggestions: [
          "What documents do I need?",
          "How long does processing take?",
          "Find immigration agents",
          "Calculate visa costs",
          "Talk to human support",
        ],
      };
    }
  };

  // Show floating button when chat is closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-20 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-vm-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          AI Assistant
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-vm-gray-900"></div>
        </div>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 bg-vm-green hover:bg-vm-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <MessageCircle className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-vm-gray-200 z-50 max-h-[600px] flex flex-col overflow-hidden">
      {/* WhatsApp-style Header */}
      <div className="flex items-center justify-between p-3 border-b border-vm-gray-200 bg-vm-green">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">
              VM Visa Support
            </h3>
            <p className="text-white/80 text-xs">Online now</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages - WhatsApp style */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0 max-h-96 bg-gray-50"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="chat-bg" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="1" fill="%23e5e7eb" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23chat-bg)"/></svg>\')',
        }}
      >
        {messages.map((message, index) => (
          <div key={message.id}>
            <div
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed ${
                  message.isUser
                    ? "bg-vm-green text-white rounded-lg rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-900 rounded-lg rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-line">{message.text}</div>
                <div
                  className={`flex items-center justify-end space-x-1 mt-1 ${
                    message.isUser ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {message.isUser && (
                    <CheckCheck className="w-3 h-3 text-blue-200" />
                  )}
                </div>
              </div>
            </div>

            {/* Quick Reply Suggestions */}
            {!message.isUser &&
              message.suggestions &&
              showSuggestions &&
              index === messages.length - 1 && (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-2 justify-start">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs px-3 py-2 bg-white border border-vm-green text-vm-green rounded-full hover:bg-vm-green hover:text-white transition-colors duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            {!message.isUser &&
              message.actionButtons &&
              showSuggestions &&
              index === messages.length - 1 && (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-2 justify-start">
                    {message.actionButtons.map((button, idx) => {
                      const Icon = button.icon;
                      return (
                        <Button
                          key={idx}
                          onClick={button.action}
                          size="sm"
                          variant={
                            button.variant === "primary" ? "default" : "outline"
                          }
                          className={`text-xs ${
                            button.variant === "primary"
                              ? "bg-vm-green hover:bg-vm-green-600 text-white"
                              : "border-vm-green text-vm-green hover:bg-vm-green hover:text-white"
                          }`}
                        >
                          {Icon && <Icon className="w-3 h-3 mr-1" />}
                          {button.text}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        ))}

        {/* Simple Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-1">
            <div className="max-w-[75%] bg-white border border-gray-200 rounded-lg rounded-bl-none shadow-sm px-3 py-2">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-500">typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp-style Input */}
      <div className="p-3 border-t border-vm-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-vm-green">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="text-sm border-gray-300 focus:border-vm-green focus:ring-vm-green/20 rounded-full px-4 py-2 pr-10"
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              disabled={isTyping}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-vm-green">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <Button
            onClick={() => handleSendMessage()}
            size="sm"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-vm-green hover:bg-vm-green-600 text-white p-2 rounded-full disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
