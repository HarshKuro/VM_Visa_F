import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  Sparkles,
  FileText,
  Users,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your VM Visa AI assistant powered by advanced AI. I can help you with visa questions, document analysis, application guidance, and connect you with the right experts. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate realistic typing delay
    const typingDelay = Math.min(messageText.length * 50 + 1000, 3000);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, typingDelay);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("document")) {
      return "📄 **Document Requirements:**\n\nFor most visa applications, you'll need:\n• Valid passport (6+ months validity)\n• Completed application forms\n• Passport-sized photos\n• Financial statements/bank records\n• Supporting documents (varies by visa type)\n\nI can help you create a personalized document checklist. Which visa type are you applying for?";
    } else if (
      lowercaseMessage.includes("processing") ||
      lowercaseMessage.includes("time")
    ) {
      return "⏱️ **Processing Times (Approximate):**\n\n• Tourist visas: 2-4 weeks\n• Work visas (H1-B): 4-8 weeks\n• Student visas: 4-12 weeks\n• Family visas: 8-15 months\n• Investment visas: 6-18 months\n\n*Times vary by country and current workload. Premium processing available for some categories.";
    } else if (
      lowercaseMessage.includes("visa type") ||
      lowercaseMessage.includes("types")
    ) {
      return "🎯 **Popular Visa Categories:**\n\n• **Work Visas:** H1-B, L1, O1, E2\n• **Student Visas:** F1, M1, J1\n• **Family Visas:** CR1, IR1, K1\n• **Investment:** EB5, E2\n• **Tourism:** B1/B2\n\nWhich category matches your situation? I can provide detailed requirements!";
    } else if (
      lowercaseMessage.includes("agent") ||
      lowercaseMessage.includes("expert")
    ) {
      return "🔍 **Finding the Right Agent:**\n\nOur platform has 500+ verified immigration experts. I recommend filtering by:\n• Your visa type expertise\n• Success rate (look for 90%+)\n• Response time\n• Client reviews\n\nWould you like me to help you find agents for your specific case?";
    } else if (
      lowercaseMessage.includes("status") ||
      lowercaseMessage.includes("track")
    ) {
      return "📊 **Application Tracking:**\n\nYou can track your application through:\n• Our dashboard (real-time updates)\n• Official government portals\n• Email/SMS notifications\n• Direct contact with your assigned agent\n\nNeed help accessing your tracking information?";
    } else if (
      lowercaseMessage.includes("cost") ||
      lowercaseMessage.includes("fee") ||
      lowercaseMessage.includes("price")
    ) {
      return "💰 **Typical Costs:**\n\n• Government fees: $200-$2,000+\n• Agent services: $500-$5,000\n• Document prep: $200-$1,000\n• Premium processing: $1,000-$2,500\n\nCosts vary significantly by visa type and complexity. Want a personalized estimate?";
    } else if (
      lowercaseMessage.includes("success rate") ||
      lowercaseMessage.includes("chances")
    ) {
      return "📈 **Success Rates:**\n\n• H1-B: 85-95% (with proper prep)\n• Tourist: 90-95%\n• Student: 88-92%\n• Family: 95-98%\n\nSuccess depends on proper documentation, expert guidance, and meeting requirements. Our agents maintain 91% average success rate!";
    } else {
      return "🤖 **I'm here to help with:**\n\n• Visa requirements & processes\n• Document checklists\n• Agent recommendations\n• Processing timelines\n• Cost estimates\n\nFor complex cases, I can connect you with our expert immigration agents. What specific immigration question can I help you with?";
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-r from-vm-green to-vm-green-600 hover:from-vm-green-600 hover:to-vm-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group transform hover:scale-110"
        >
          <MessageCircle className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="absolute right-full mr-4 bg-vm-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            AI Immigration Assistant
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-vm-gray-900"></div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-vm-gray-200 z-50 max-h-[600px] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-vm-gray-200 bg-gradient-to-r from-vm-green to-vm-green-600">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="text-white font-semibold">VM Visa AI Assistant</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/90 text-xs">Online • Powered by AI</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-96 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-300`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  message.isUser
                    ? "bg-vm-green text-white rounded-br-sm"
                    : "bg-white border border-vm-gray-200 text-vm-gray-900 rounded-bl-sm shadow-sm"
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
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex items-start space-x-2 max-w-[85%]">
              <div className="w-8 h-8 bg-vm-green rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-vm-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-vm-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-vm-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-vm-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
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

      {/* Input */}
      <div className="p-4 border-t border-vm-gray-200 bg-white">
        <div className="flex space-x-3">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about visa requirements, documents, agents..."
            className="flex-1 text-sm border-vm-gray-300 focus:border-vm-green focus:ring-vm-green"
            onKeyPress={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessage()
            }
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage()}
            size="sm"
            disabled={!inputMessage.trim() || isTyping}
            className="bg-vm-green hover:bg-vm-green-600 text-white px-4 disabled:opacity-50"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-vm-gray-500 mt-2 text-center">
          AI-powered immigration assistant • Always learning
        </p>
      </div>
    </div>
  );
}
