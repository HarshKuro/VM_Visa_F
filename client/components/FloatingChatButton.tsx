import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import Messages from "./Messages";

interface FloatingChatButtonProps {
  userType: "client" | "agent";
  currentUserId: string;
  currentUserName: string;
}

export default function FloatingChatButton({
  userType,
  currentUserId,
  currentUserName,
}: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount] = useState(3); // Mock unread count

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 bg-vm-green hover:bg-vm-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-start z-50 p-6">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md h-[500px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b border-vm-gray-200 bg-vm-green text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-semibold">Messages</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Content */}
            <div className="flex-1">
              <Messages
                userType={userType}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
