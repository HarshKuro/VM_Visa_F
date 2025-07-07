import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Star,
  MessageCircle,
  Users,
  Archive,
  Mute,
  Trash2,
  Info,
  ArrowLeft,
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: "client" | "agent";
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  typing?: boolean;
  specialization?: string;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
  status: "sent" | "delivered" | "read";
  type: "text" | "document" | "image";
}

interface MessagesProps {
  userType: "client" | "agent";
  currentUserId: string;
  currentUserName: string;
}

export default function Messages({
  userType,
  currentUserId,
  currentUserName,
}: MessagesProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample contacts - in real app, this would come from API
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: userType === "client" ? "Sarah Johnson" : "John Doe",
      role: userType === "client" ? "agent" : "client",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      lastMessage:
        userType === "client"
          ? "Great! Let's proceed with the application."
          : "Thank you for the proposal! When can we schedule a call?",
      timestamp: "11:28",
      unreadCount: 2,
      online: true,
      specialization: userType === "client" ? "Family Immigration" : undefined,
    },
    {
      id: "2",
      name: userType === "client" ? "Alex Rodriguez" : "Maria Garcia",
      role: userType === "client" ? "agent" : "client",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastMessage:
        userType === "client"
          ? "Can you handle a complex EB-5 case? Client budget is..."
          : "Perfect! I'll send the documents tomorrow.",
      timestamp: "11:01",
      unreadCount: 0,
      online: false,
      specialization: userType === "client" ? "Immigration Law" : undefined,
    },
    {
      id: "3",
      name: userType === "client" ? "Emma Wilson" : "David Kim",
      role: userType === "client" ? "agent" : "client",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      lastMessage:
        userType === "client"
          ? "What's the typical timeline for F-1 visa processing?"
          : "I'm available this week. Could we schedule for Thursday afternoon?",
      timestamp: "10:45",
      unreadCount: 1,
      online: true,
      typing: true,
      specialization: userType === "client" ? "Student Visa" : undefined,
    },
    {
      id: "4",
      name: userType === "client" ? "Maria Garcia" : "Emma Wilson",
      role: userType === "client" ? "agent" : "client",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      lastMessage:
        userType === "client"
          ? "Perfect! I'll send the documents tomorrow."
          : "Thank you for the proposal! When can we schedule a call?",
      timestamp: "Yesterday",
      unreadCount: 0,
      online: false,
      specialization: userType === "client" ? "Green Card" : undefined,
    },
  ]);

  // Sample messages for selected contact
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: selectedContact?.id || "1",
      text:
        userType === "client"
          ? "Hi! I received your proposal for the H1-B visa application. It looks comprehensive."
          : "Thank you for your interest! I'll send the proposal immediately. When would be a good time for a consultation call?",
      timestamp: "11:05",
      isCurrentUser: false,
      status: "read",
      type: "text",
    },
    {
      id: "2",
      senderId: currentUserId,
      text:
        userType === "client"
          ? "Thank you for your interest! I'll send the proposal immediately. When would be a good time for a consultation call?"
          : "Hi! I received your proposal for the H1-B visa application. It looks comprehensive.",
      timestamp: "11:10",
      isCurrentUser: true,
      status: "read",
      type: "text",
    },
    {
      id: "3",
      senderId: selectedContact?.id || "1",
      text:
        userType === "client"
          ? "I'm available this week. Could we schedule for Thursday afternoon?"
          : "Thursday afternoon works perfectly! I'll send you a calendar invite shortly.",
      timestamp: "11:26",
      isCurrentUser: false,
      status: "delivered",
      type: "text",
    },
    {
      id: "4",
      senderId: currentUserId,
      text:
        userType === "client"
          ? "Thursday afternoon works perfectly! I'll send you a calendar invite shortly."
          : "I'm available this week. Could we schedule for Thursday afternoon?",
      timestamp: "11:28",
      isCurrentUser: true,
      status: "delivered",
      type: "text",
    },
  ]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.specialization &&
        contact.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
      status: "sent",
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "delivered" } : msg,
        ),
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg,
        ),
      );
    }, 3000);
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedContact && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedContact]);

  return (
    <div className="h-full bg-vm-gray-50 flex">
      {/* Contacts Sidebar */}
      <div
        className={`${selectedContact ? "hidden md:block" : "block"} w-full md:w-80 bg-white border-r border-vm-gray-200 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-vm-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-vm-gray-900">Messages</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vm-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-vm-gray-50 border-vm-gray-200"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-vm-gray-200 bg-white">
          <button className="flex-1 px-4 py-3 text-sm font-medium text-vm-green border-b-2 border-vm-green bg-vm-green/5">
            All
            <Badge variant="secondary" className="ml-2 bg-vm-green text-white">
              {contacts.reduce((sum, contact) => sum + contact.unreadCount, 0)}
            </Badge>
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-vm-gray-600 hover:text-vm-gray-900">
            {userType === "client" ? "Agents" : "Clients"}
            <Badge variant="secondary" className="ml-2">
              {contacts.length}
            </Badge>
          </button>
          <button className="flex-1 px-4 py-3 text-sm font-medium text-vm-gray-600 hover:text-vm-gray-900">
            Prospects
            <Badge variant="secondary" className="ml-2">
              3
            </Badge>
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-vm-gray-100 cursor-pointer hover:bg-vm-gray-50 transition-colors ${
                selectedContact?.id === contact.id
                  ? "bg-vm-green/10 border-vm-green/20"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-vm-gray-900 truncate">
                      {contact.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-vm-gray-500">
                        {contact.timestamp}
                      </span>
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-vm-green text-white text-xs">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {contact.specialization && (
                    <p className="text-xs text-vm-gray-500 mb-1">
                      {contact.specialization}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-vm-gray-600 truncate flex-1">
                      {contact.typing ? (
                        <span className="text-vm-green italic">typing...</span>
                      ) : (
                        contact.lastMessage
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-vm-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setSelectedContact(null)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="relative">
                  <img
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedContact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-vm-gray-900">
                    {selectedContact.name}
                  </h3>
                  <p className="text-xs text-vm-gray-500">
                    {selectedContact.typing
                      ? "typing..."
                      : selectedContact.online
                        ? "online"
                        : "last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="chat-bg" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="0.5" fill="%23e5e7eb" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23chat-bg)"/></svg>\')',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    message.isCurrentUser
                      ? "bg-vm-green text-white rounded-br-none"
                      : "bg-white border border-vm-gray-200 text-vm-gray-900 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.isCurrentUser
                        ? "text-white/70"
                        : "text-vm-gray-500"
                    }`}
                  >
                    <span className="text-xs">{message.timestamp}</span>
                    {message.isCurrentUser && (
                      <div>
                        {message.status === "sent" && (
                          <Check className="w-3 h-3" />
                        )}
                        {message.status === "delivered" && (
                          <CheckCheck className="w-3 h-3" />
                        )}
                        {message.status === "read" && (
                          <CheckCheck className="w-3 h-3 text-blue-300" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-vm-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-5 h-5 text-vm-gray-500" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="rounded-full border-vm-gray-300 focus:border-vm-green focus:ring-vm-green/20 pr-10"
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Smile className="w-4 h-4 text-vm-gray-500" />
                </Button>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-vm-green hover:bg-vm-green-600 text-white rounded-full p-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-vm-gray-50">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-vm-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
              Select a conversation
            </h3>
            <p className="text-vm-gray-600">
              Choose a contact from the list to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
