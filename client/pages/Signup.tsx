import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import { Users, Briefcase, Building } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const userTypes = [
    {
      icon: Users,
      title: "Client",
      description: "Individual seeking immigration services",
      features: [
        "Personal consultation",
        "Application tracking",
        "Document support",
      ],
      ctaText: "Sign up as Client",
      route: "/signup/client",
    },
    {
      icon: Briefcase,
      title: "Agent",
      description: "Immigration attorney or consultant",
      features: ["Client management", "Case tracking", "Professional tools"],
      ctaText: "Sign up as Agent",
      route: "/signup/agent",
    },
    {
      icon: Building,
      title: "Organization",
      description: "Company or institution",
      features: [
        "Employee sponsorship",
        "Bulk applications",
        "Team management",
      ],
      ctaText: "Sign up as Organization",
      route: "/signup/organization",
    },
  ];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-vm-gray-900 mb-4">
              Join VM Visa
            </h1>
            <p className="text-xl text-vm-gray-600">
              Choose your account type to get started with our immigration
              services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg border border-vm-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-vm-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-8 h-8 text-vm-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-vm-gray-900 mb-2">
                    {type.title}
                  </h2>
                  <p className="text-vm-gray-600">{type.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-vm-gray-600"
                    >
                      <div className="w-4 h-4 bg-vm-green rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate(type.route)}
                  className="w-full bg-vm-green hover:bg-vm-green-600 text-white"
                  size="lg"
                >
                  {type.ctaText}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-vm-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-vm-blue hover:text-vm-blue-600"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-8 p-6 bg-vm-blue/5 rounded-lg border border-vm-blue/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
                Multi-Step Registration Process
              </h3>
              <p className="text-sm text-vm-gray-600 mb-4">
                Create your account to get started with VM Visa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AIChatAssistant />
    </div>
  );
}
