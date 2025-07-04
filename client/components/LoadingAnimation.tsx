import { useEffect, useState } from "react";
import { Loader2, Plane, Globe, FileText } from "lucide-react";

interface LoadingAnimationProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingAnimation({
  isLoading,
  message = "Loading...",
}: LoadingAnimationProps) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [Plane, Globe, FileText, Loader2];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % icons.length);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading, icons.length]);

  if (!isLoading) return null;

  const CurrentIcon = icons[currentIcon];

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-vm-green/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CurrentIcon className="w-10 h-10 text-vm-green animate-spin" />
          </div>

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full border-2 border-vm-green/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-vm-green/30 animate-ping animation-delay-200"></div>
          <div className="absolute inset-4 rounded-full border-2 border-vm-green/40 animate-ping animation-delay-400"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-vm-gray-900 animate-bounce">
            {message}
          </h3>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-vm-green rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-vm-green rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-vm-green rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-vm-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-vm-green to-vm-green-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-vm-green/5 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-vm-blue/5 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-vm-green/5 rounded-full animate-float animation-delay-2000"></div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
