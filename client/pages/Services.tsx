import Navigation from "@/components/Navigation";
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

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-vm-green to-vm-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Immigration Services
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Expert support for every step of your global journey. Connect with
            verified immigration professionals.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-white text-vm-green hover:bg-gray-100"
            >
              Find Your Expert
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-vm-gray-900 mb-4">
              Choose Your Immigration Service
            </h2>
            <p className="text-lg text-vm-gray-600 max-w-3xl mx-auto">
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
                  className="hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-vm-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-vm-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Link to={service.link}>
                      <Button
                        className="w-full bg-vm-green hover:bg-vm-green-600"
                        size="lg"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
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
            <div>
              <div className="text-4xl font-bold text-vm-green mb-2">91%</div>
              <div className="text-lg font-medium text-vm-gray-900">
                Success Rate
              </div>
              <div className="text-vm-gray-600">
                Successful visa applications
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-vm-green mb-2">150+</div>
              <div className="text-lg font-medium text-vm-gray-900">
                Countries
              </div>
              <div className="text-vm-gray-600">Global coverage</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-vm-green mb-2">10K+</div>
              <div className="text-lg font-medium text-vm-gray-900">
                Happy Clients
              </div>
              <div className="text-vm-gray-600">Served worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vm-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Immigration Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with verified immigration experts and make your global
            dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-vm-green hover:bg-vm-green-600">
                Find Expert Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/signup/agent">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-vm-gray-900"
              >
                Join as Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
