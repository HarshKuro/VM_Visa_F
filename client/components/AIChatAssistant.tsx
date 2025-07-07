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
  const [isOpen, setIsOpen] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hello! I'm your Immigration Assistant AI. I can help you with visa questions, document analysis, application guidance, and connect you with verified experts.\n\nTo provide personalized assistance, may I know your name?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "My name is [Your Name]",
        "Skip and ask a question",
        "I need help with work visa",
        "Tell me about student visas",
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-r from-vm-green to-vm-green-600 hover:from-vm-green-600 hover:to-vm-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110 animate-pulse hover:animate-none"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
              <Wand2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="absolute right-full mr-4 bg-vm-gray-900 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Immigration Assistant AI 👋</span>
            </div>
            <div className="text-xs text-gray-300 mt-1">
              Ask me anything about visas!
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-vm-gray-900"></div>
          </div>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-vm-green animate-ping opacity-20"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-vm-gray-200 z-50 max-h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-vm-gray-200 bg-gradient-to-r from-vm-green via-vm-green-600 to-vm-green-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <div className="text-lg">🌐</div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-bold text-lg">
                Immigration Assistant AI
              </h3>
              <span
                className="text-xl inline-block"
                style={{
                  animation: "wave 2s ease-in-out infinite",
                }}
              >
                👋
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/90 text-xs font-medium">
                Online • Powered by Advanced AI
              </p>
              <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 rounded-xl relative z-10 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-10deg); }
          }
        `}
      </style>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-96 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {!message.isUser && (
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-vm-green to-vm-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                  </div>
                )}
                {message.isUser && (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white flex-shrink-0">
                    <span className="text-sm text-white font-medium">
                      {userContext.name
                        ? userContext.name[0].toUpperCase()
                        : "U"}
                    </span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 hover:shadow-md ${
                    message.isUser
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-md"
                      : "bg-gradient-to-r from-gray-50 to-white border border-vm-gray-200 text-vm-gray-900 rounded-bl-md"
                  }`}
                >
                  <div className="whitespace-pre-line">{message.text}</div>
                  <div
                    className={`text-xs mt-2 opacity-70 ${message.isUser ? "text-white/70" : "text-vm-gray-500"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Contextual Suggestions */}
            {!message.isUser && message.suggestions && showSuggestions && (
              <div
                className="mt-3 ml-11 space-y-2 animate-in fade-in duration-500"
                style={{ animationDelay: "300ms" }}
              >
                <p className="text-xs font-medium text-vm-gray-600 mb-2">
                  💡 Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full border border-blue-200 transition-all duration-200 hover:scale-105 hover:shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!message.isUser && message.actionButtons && showSuggestions && (
              <div
                className="mt-3 ml-11 space-y-2 animate-in fade-in duration-500"
                style={{ animationDelay: "400ms" }}
              >
                <p className="text-xs font-medium text-vm-gray-600 mb-2">
                  🚀 Quick actions:
                </p>
                <div className="flex flex-wrap gap-2">
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
                        className={`text-xs transition-all duration-200 hover:scale-105 ${
                          button.variant === "primary"
                            ? "bg-vm-green hover:bg-vm-green-600 text-white"
                            : "border-vm-green text-vm-green hover:bg-vm-green/10"
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

        {/* Enhanced Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-vm-green to-vm-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <span className="text-sm animate-pulse">🤖</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white animate-pulse"></div>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-white border border-vm-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-vm-green rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-vm-green rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-vm-green rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-vm-gray-500 animate-pulse">
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4 border-b border-vm-gray-100">
          <p className="text-xs font-medium text-vm-gray-600 mb-3">
            Quick Actions:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSendMessage(action.action)}
                  className="flex flex-col items-center p-3 text-xs text-vm-gray-600 hover:text-vm-green bg-vm-gray-50 hover:bg-vm-green/5 rounded-lg transition-all duration-200 border hover:border-vm-green/20"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="font-medium">{action.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 space-y-2">
            {predefinedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="block w-full text-left text-xs text-vm-blue hover:text-vm-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors border border-blue-100 hover:border-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input */}
      <div className="p-4 border-t border-vm-gray-200 bg-gradient-to-r from-white to-gray-50">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about immigration... 💬"
              className="text-sm border-vm-gray-300 focus:border-vm-green focus:ring-vm-green/20 rounded-2xl px-4 py-3 pr-12 shadow-sm hover:shadow-md transition-all duration-200"
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              disabled={isTyping}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-vm-gray-400" />
            </div>
          </div>
          <Button
            onClick={() => handleSendMessage()}
            size="sm"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-vm-green to-vm-green-600 hover:from-vm-green-600 hover:to-vm-green-700 text-white px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-center mt-3 space-x-2">
          <div className="w-2 h-2 bg-vm-green rounded-full animate-pulse"></div>
          <p className="text-xs text-vm-gray-500 font-medium">
            🚀 AI-powered immigration assistant • Secure & Private
          </p>
          <Sparkles className="w-3 h-3 text-vm-green animate-pulse" />
        </div>
      </div>
    </div>
  );
}
