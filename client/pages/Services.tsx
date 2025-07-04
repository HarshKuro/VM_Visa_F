import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Briefcase,
  Globe,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const [isLoading, setIsLoading] = useState(true);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Start card animations after loading
      setTimeout(() => setAnimateCards(true), 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Award,
      title: "Student Visa Assistance",
      description:
        "Complete end-to-end support for F-1 and other study permits, from document prep to embassy interview coaching.",
      link: "/services/student-visa",
      color: "bg-blue-500",
    },
    {
      icon: Briefcase,
      title: "Work Permit Processing",
      description:
        "Professional guidance for H1-B, L1, O1, and employment-based visas with expert document review and strategy.",
      link: "/services/work-permit",
      color: "bg-green-500",
    },
    {
      icon: Globe,
      title: "Tourist & Visitor Visas",
      description:
        "Streamlined support for B1/B2 tourist visas, ensuring proper documentation and interview preparation.",
      link: "/services/tourist-visa",
      color: "bg-purple-500",
    },
    {
      icon: Users,
      title: "Family Sponsorship",
      description:
        "Reunite with loved ones through family-based immigration with comprehensive application support.",
      link: "/services/family-sponsorship",
      color: "bg-pink-500",
    },
    {
      icon: TrendingUp,
      title: "Investor & Business Visas",
      description:
        "E1, E2, EB5 investor visas and business immigration solutions with investment strategy guidance.",
      link: "/services/investor-visa",
      color: "bg-orange-500",
    },
    {
      icon: CheckCircle,
      title: "Appeals & Renewals",
      description:
        "Expert assistance with visa appeals, renewals, and status changes to maintain your legal standing.",
      link: "/services/appeals-renewals",
      color: "bg-red-500",
    },
  ];

  const stats = [
    {
      value: "91%",
      label: "Success Rate",
      description: "Successful visa applications",
    },
    { value: "150+", label: "Countries", description: "Global coverage" },
    { value: "10K+", label: "Happy Clients", description: "Served worldwide" },
  ];

  return (
    <>
      <LoadingAnimation isLoading={isLoading} message="Loading Services..." />

      <div className="min-h-screen bg-vm-gray-50">
        <Navigation />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-vm-green to-vm-green-600 overflow-hidden relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-in slide-in-from-bottom duration-1000">
              Our Immigration Services
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-in slide-in-from-bottom duration-1000 delay-200">
              Expert support for every step of your global journey. Connect with
              verified immigration professionals.
            </p>
            <div className="animate-in slide-in-from-bottom duration-1000 delay-400">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-white text-vm-green hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 group"
                >
                  Find Your Expert
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Background Animation Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-bounce"></div>
            <div
              className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/5 rounded-full animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-vm-gray-900 mb-4 animate-in slide-in-from-bottom duration-700">
                Choose Your Immigration Service
              </h2>
              <p className="text-lg text-vm-gray-600 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-700 delay-200">
                Get personalized guidance from verified immigration experts for
                your specific visa type and destination.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className={`hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-2 ${
                      animateCards
                        ? "animate-in slide-in-from-bottom duration-700"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      animationDelay: animateCards ? `${index * 150}ms` : "0ms",
                    }}
                  >
                    <CardContent className="p-8 relative overflow-hidden">
                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-vm-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6`}
                        >
                          <Icon className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-semibold text-vm-gray-900 mb-4 group-hover:text-vm-green transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-vm-gray-600 mb-6 leading-relaxed group-hover:text-vm-gray-700 transition-colors duration-300">
                          {service.description}
                        </p>
                        <Link to={service.link}>
                          <Button
                            className="w-full bg-vm-green hover:bg-vm-green-600 transform hover:scale-105 transition-all duration-300 group-hover:shadow-lg"
                            size="lg"
                          >
                            Learn More
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transform hover:scale-105 transition-all duration-500 ${
                    animateCards
                      ? "animate-in slide-in-from-bottom duration-700"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    animationDelay: animateCards
                      ? `${(index + 6) * 150}ms`
                      : "0ms",
                  }}
                >
                  <div className="text-4xl font-bold text-vm-green mb-2 animate-pulse">
                    {stat.value}
                  </div>
                  <div className="text-lg font-medium text-vm-gray-900">
                    {stat.label}
                  </div>
                  <div className="text-vm-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-vm-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6 animate-in slide-in-from-bottom duration-700">
              Ready to Start Your Immigration Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-in slide-in-from-bottom duration-700 delay-200">
              Connect with verified immigration experts and make your global
              dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom duration-700 delay-400">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-vm-green hover:bg-vm-green-600 transform hover:scale-105 transition-all duration-300 group"
                >
                  Find Expert Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/signup/agent">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-vm-gray-900 transform hover:scale-105 transition-all duration-300"
                >
                  Join as Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
