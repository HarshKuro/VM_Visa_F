import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import {
  ArrowRight,
  Shield,
  Lock,
  CheckCircle,
  Headphones,
  Rocket,
  MessageSquare,
  MapPin,
  Trophy,
} from "lucide-react";

export default function About() {
  const milestones = [
    {
      year: "2020",
      title: "Platform launched",
      icon: Rocket,
    },
    {
      year: "2021",
      title: "10,000+ proposals submitted",
      icon: MessageSquare,
    },
    {
      year: "2022",
      title: "Expanded to Canada & UK markets",
      icon: MapPin,
    },
    {
      year: "2023",
      title: "94% average success rate",
      icon: Trophy,
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Former immigration lawyer with 15+ years helping families navigate complex visa processes globally.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations",
      bio: "Ex-government visa officer ensuring our platform meets the highest compliance standards worldwide.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
    {
      name: "Priya Patel",
      role: "Lead Product Manager",
      bio: "Technology expert focused on creating seamless experiences for clients and immigration consultants.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      bio: "Multilingual support specialist ensuring every client receives personalized guidance throughout their journey.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: "Licensed Practitioners",
      description: "Verified experts only",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Bank-level encryption",
    },
    {
      icon: CheckCircle,
      title: "GDPR & CCPA Compliant",
      description: "Privacy protected",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* About Us Section */}
      <section className="py-24 lg:py-32 bg-[#F5F7FA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading & Intro */}
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-semibold text-[#1A2E4E] mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              About Us
            </h2>
            <p
              className="text-lg text-[#4A4A4A] max-w-4xl mx-auto leading-relaxed mb-12"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 400 }}
            >
              At GlobalPath Immigration, our mission is to simplify your journey
              abroad. Since 2020, we've connected thousands of clients with
              verified immigration experts to secure work, study, and travel
              visas efficiently and confidently.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-5 gap-12 mb-20">
            {/* Left Column (60%) */}
            <div className="lg:col-span-3 space-y-10">
              {/* Our Mission */}
              <div>
                <h3
                  className="text-2xl font-semibold text-[#1A2E4E] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Empower Your Global Journey
                </h3>
                <p
                  className="text-base text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  We believe everyone deserves transparent, expert guidance when
                  moving across borders. Our platform matches you with licensed
                  agents who understand your unique needs and provide
                  personalized support throughout your immigration journey.
                </p>
              </div>

              {/* Our Values */}
              <div>
                <h3
                  className="text-2xl font-semibold text-[#1A2E4E] mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Integrity • Excellence • Community
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-[#2E8B57]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A2E4E] mb-2">
                        Integrity
                      </h4>
                      <p className="text-[#4A4A4A]">
                        Strict vetting and verification for every agent on our
                        platform.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-6 h-6 text-[#2E8B57]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A2E4E] mb-2">
                        Excellence
                      </h4>
                      <p className="text-[#4A4A4A]">
                        High success rates and continuous support throughout
                        your journey.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-[#2E8B57]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A2E4E] mb-2">
                        Community
                      </h4>
                      <p className="text-[#4A4A4A]">
                        Building a global network of travelers and immigration
                        experts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (40%) */}
            <div className="lg:col-span-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Diverse team collaborating on immigration services"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Trusted by 5,000+ Clients
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Milestones */}
          <div className="mb-20">
            <h3
              className="text-2xl font-semibold text-[#1A2E4E] text-center mb-12"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Our Journey
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-16 left-0 right-0 h-1 bg-[#2E8B57] hidden lg:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div key={index} className="text-center relative">
                      <div className="w-16 h-16 bg-[#2E8B57] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-[#1A2E4E] mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-[#4A4A4A] font-medium">
                        {milestone.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Team Spotlight */}
          <div className="mb-20">
            <h3
              className="text-2xl font-semibold text-[#1A2E4E] text-center mb-12"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="text-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-lg font-semibold text-[#1A2E4E] mb-1">
                      {member.name}
                    </h4>
                    <p className="text-[#2E8B57] font-medium mb-3 text-sm">
                      {member.role}
                    </p>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust & Compliance Badges */}
          <div className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[#1A2E4E]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-8 h-8 text-[#1A2E4E]" />
                    </div>
                    <h4
                      className="font-semibold text-[#1A2E4E] mb-1 text-sm"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {badge.title}
                    </h4>
                    <p
                      className="text-[#4A4A4A] text-xs"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {badge.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="text-center bg-white rounded-lg p-8 shadow-md">
            <h3
              className="text-2xl font-semibold text-[#1A2E4E] mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Ready to start? Post your request today and connect with an
              expert.
            </h3>
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-[#14A800] hover:bg-[#14A800]/90 text-white px-8 py-3"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
