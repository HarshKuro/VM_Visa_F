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
          {/* Immigration-themed Background Images */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {/* Passport Images */}
            <div
              className="absolute top-10 left-10 w-32 h-24 bg-white/20 rounded-lg transform rotate-12 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="absolute top-32 right-16 w-28 h-20 bg-white/20 rounded-lg transform -rotate-6 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "1s",
              }}
            ></div>
            {/* Visa Documents */}
            <div
              className="absolute bottom-20 left-20 w-24 h-32 bg-white/20 rounded-lg transform rotate-3 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="absolute bottom-40 right-32 w-30 h-24 bg-white/20 rounded-lg transform -rotate-12 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "3s",
              }}
            ></div>
            {/* Immigration Stamps */}
            <div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/30 rounded-full animate-spin-slow"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDuration: "8s",
              }}
            ></div>
            <div
              className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/30 rounded-full animate-spin-slow"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDuration: "10s",
                animationDelay: "2s",
              }}
            ></div>
          </div>

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
                  className="bg-white text-vm-green hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 group hover:shadow-2xl"
                >
                  Find Your Expert
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Animated Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Immigration Icons */}
            <div
              className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-float"
              style={{
                animation: "float 6s ease-in-out infinite",
                animationDelay: "0s",
              }}
            >
              <Globe className="w-6 h-6 text-white/60 m-1" />
            </div>
            <div
              className="absolute top-40 right-20 w-10 h-10 bg-white/20 rounded-full animate-float"
              style={{
                animation: "float 8s ease-in-out infinite",
                animationDelay: "2s",
              }}
            >
              <Users className="w-8 h-8 text-white/60 m-1" />
            </div>
            <div
              className="absolute bottom-20 left-1/3 w-6 h-6 bg-white/20 rounded-full animate-float"
              style={{
                animation: "float 7s ease-in-out infinite",
                animationDelay: "4s",
              }}
            >
              <Award className="w-4 h-4 text-white/60 m-1" />
            </div>
            <div
              className="absolute bottom-40 right-1/4 w-12 h-12 bg-white/20 rounded-full animate-float"
              style={{
                animation: "float 9s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <Briefcase className="w-10 h-10 text-white/60 m-1" />
            </div>
          </div>

          <style>
            {`
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                }
                50% {
                  transform: translateY(-20px) scale(1.1);
                }
              }
              .animate-spin-slow {
                animation: spin 8s linear infinite;
              }
            `}
          </style>
        </section>

        {/* Services Grid */}
        <section className="py-20 relative overflow-hidden">
          {/* Background Immigration Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute top-10 left-1/4 w-40 h-28 transform rotate-45 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "1s",
              }}
            ></div>
            <div
              className="absolute bottom-20 right-1/4 w-36 h-24 transform -rotate-30 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "3s",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-10 w-32 h-20 transform rotate-12 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="absolute top-1/3 right-10 w-28 h-32 transform -rotate-20 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "4s",
              }}
            ></div>
            {/* Immigration Stamps Pattern */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-16 h-16 bg-vm-green/5 rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                      {/* Immigration Background Pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <div
                          className="w-full h-full transform rotate-12 animate-pulse"
                          style={{
                            backgroundImage:
                              index % 3 === 0
                                ? "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80')"
                                : index % 3 === 1
                                  ? "url('https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80')"
                                  : "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            animationDelay: `${index * 0.5}s`,
                          }}
                        />
                      </div>

                      {/* Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-vm-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Floating Immigration Icons */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110">
                        <Globe className="w-6 h-6 text-vm-green animate-bounce" />
                      </div>

                      <div className="relative z-10">
                        <div
                          className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 shadow-lg group-hover:shadow-xl`}
                        >
                          <Icon className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
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
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Animated Immigration Background */}
          <div className="absolute inset-0 opacity-3 pointer-events-none">
            <div
              className="absolute top-10 left-20 w-32 h-24 transform rotate-6 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="absolute bottom-20 right-32 w-28 h-36 transform -rotate-12 animate-pulse"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-spin-slow"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                animationDuration: "20s",
              }}
            ></div>
            {/* Scattered visa stamps */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-12 h-12 bg-vm-green/10 rounded-full animate-pulse"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${i * 1.5}s`,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
