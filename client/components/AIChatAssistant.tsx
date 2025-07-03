import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";

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
      text: "Hello! I'm your VM Visa AI assistant. I can help you with general visa questions, application processes, and requirements. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const predefinedQuestions = [
    "What documents do I need for a work visa?",
    "How long does visa processing take?",
    "What are the different visa types?",
    "Can you help me check my application status?",
  ];

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes("document")) {
      return "For most visa applications, you'll typically need: valid passport, completed application form, passport photos, financial documentation, and supporting documents specific to your visa type. Would you like me to provide more details about documents for a specific visa category?";
    } else if (
      lowercaseMessage.includes("processing") ||
      lowercaseMessage.includes("time")
    ) {
      return "Processing times vary by visa type and country. Generally: Tourist visas (2-4 weeks), Work visas (4-8 weeks), Student visas (4-12 weeks). Current processing times may be longer due to high demand. Would you like specific information for a particular visa type?";
    } else if (lowercaseMessage.includes("visa type")) {
      return "Common visa types include: Tourist/Visitor, Work/Employment, Student, Family/Spouse, Investment/Business, and Transit visas. Each has different requirements and processing procedures. Which type interests you most?";
    } else if (lowercaseMessage.includes("status")) {
      return "To check your application status, you'll need your application reference number and personal details. You can usually track status online through the official immigration website or contact our support team for assistance.";
    } else {
      return "I understand you're asking about immigration matters. While I can provide general information, for specific cases, I recommend consulting with one of our qualified immigration agents. Would you like me to connect you with an agent or provide information about our services?";
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-vm-green hover:bg-vm-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group z-50"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute right-full mr-3 bg-vm-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Ask AI Assistant
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl border border-vm-gray-200 z-50 max-h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-vm-gray-200 bg-vm-green rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">VM Visa AI</h3>
            <p className="text-white/80 text-xs">Online now</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-64">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.isUser
                  ? "bg-vm-green text-white"
                  : "bg-vm-gray-100 text-vm-gray-900"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-vm-gray-500 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {predefinedQuestions.slice(0, 2).map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="block w-full text-left text-xs text-vm-blue hover:text-vm-blue-600 bg-vm-gray-50 hover:bg-vm-gray-100 px-2 py-1 rounded transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-vm-gray-200">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 text-sm"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={() => handleSendMessage()}
            size="sm"
            className="bg-vm-green hover:bg-vm-green-600 text-white px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
