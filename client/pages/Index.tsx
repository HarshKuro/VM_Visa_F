import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import AIChatAssistant from "@/components/AIChatAssistant";
import {
  ArrowRight,
  Users,
  Clock,
  FileText,
  Star,
  Play,
  CheckCircle,
  Globe,
  Shield,
  Award,
} from "lucide-react";

export default function Index() {
  const stats = [
    {
      icon: CheckCircle,
      label: "Success Rate",
      value: "98.5%",
      description: "Visa approvals",
    },
    {
      icon: Clock,
      label: "Avg Processing",
      value: "4-6 weeks",
      description: "Application time",
    },
    {
      icon: FileText,
      label: "Visa Types",
      value: "25+",
      description: "Countries covered",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "10,000+",
      description: "Since 2015",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content:
        "VM Visa made my work visa application seamless. Their expert guidance and support throughout the process was exceptional.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Miguel Rodriguez",
      role: "Business Owner",
      content:
        "Professional service and clear communication. They helped me bring my family to the US without any complications.",
      rating: 5,
      image: "/placeholder.svg",
    },
    {
      name: "Priya Patel",
      role: "Student",
      content:
        "Got my student visa approved in just 3 weeks! The team was incredibly helpful and responsive to all my questions.",
      rating: 5,
      image: "/placeholder.svg",
    },
  ];

  const partners = ["Microsoft", "Google", "Amazon", "Meta", "Apple", "Tesla"];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vm-gray-900 via-vm-gray-800 to-vm-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Pathway to a{" "}
                  <span className="text-vm-green">New Future</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Expert immigration services with personalized guidance,
                  transparent processes, and proven success. Start your journey
                  to a new country today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-vm-green hover:bg-vm-green-600 text-white text-lg px-8 py-4"
                  >
                    Start Your Application
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-vm-gray-900 text-lg px-8 py-4"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-vm-green border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">
                    10,000+ satisfied clients
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-300 ml-2">
                    4.9/5 rating
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-vm-green/20 to-vm-blue/20 rounded-2xl transform rotate-6"></div>
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3"
                  alt="Immigration consultation"
                  className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-none">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-vm-green/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-vm-green" />
                    </div>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-vm-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-vm-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-vm-gray-500">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-vm-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-vm-gray-900 mb-4">
              Comprehensive Immigration Services
            </h2>
            <p className="text-lg text-vm-gray-600 max-w-2xl mx-auto">
              From visa applications to permanent residency, we provide expert
              guidance for all your immigration needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Work Visas",
                description:
                  "H1-B, L1, O1 and other employment-based visas for professionals and skilled workers.",
                features: [
                  "Expert consultation",
                  "Document preparation",
                  "24/7 support",
                ],
              },
              {
                icon: Users,
                title: "Family Immigration",
                description:
                  "Reunite with your loved ones through family-based immigration petitions.",
                features: [
                  "Spouse visas",
                  "Parent petitions",
                  "Child immigration",
                ],
              },
              {
                icon: Award,
                title: "Student Visas",
                description:
                  "F1, M1, and J1 visas for academic and exchange programs.",
                features: [
                  "University applications",
                  "Visa interviews",
                  "Post-graduation options",
                ],
              },
              {
                icon: Shield,
                title: "Business Immigration",
                description:
                  "E1, E2, EB5 investor visas and business immigration solutions.",
                features: [
                  "Investment guidance",
                  "Business setup",
                  "Legal compliance",
                ],
              },
              {
                icon: FileText,
                title: "Green Card Services",
                description: "Permanent residency applications and renewals.",
                features: [
                  "Priority processing",
                  "Status tracking",
                  "Interview preparation",
                ],
              },
              {
                icon: CheckCircle,
                title: "Citizenship",
                description:
                  "Naturalization process and citizenship test preparation.",
                features: [
                  "Test preparation",
                  "Document review",
                  "Interview coaching",
                ],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-vm-green/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-vm-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-vm-gray-900 ml-4">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-vm-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-vm-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-vm-green mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-vm-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-vm-gray-600">
              Trusted by thousands of individuals and families worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-vm-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-vm-gray-200"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-vm-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-vm-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-vm-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-vm-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-vm-gray-600">
              We work with top companies to facilitate their immigration needs.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="h-12 bg-vm-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-vm-gray-500 font-medium text-sm">
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vm-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Immigration Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful applicants who trusted VM Visa with
            their future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-vm-green hover:bg-gray-100 text-lg px-8 py-4"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-vm-green text-lg px-8 py-4"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vm-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-vm-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VM</span>
                </div>
                <span className="text-xl font-bold">VM Visa</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for immigration success. Expert guidance,
                transparent processes, proven results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/services/work-visa"
                    className="hover:text-white transition-colors"
                  >
                    Work Visas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/family"
                    className="hover:text-white transition-colors"
                  >
                    Family Immigration
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/student"
                    className="hover:text-white transition-colors"
                  >
                    Student Visas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/business"
                    className="hover:text-white transition-colors"
                  >
                    Business Immigration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>1-800-VM-VISA</li>
                <li>support@vmvisa.com</li>
                <li>
                  123 Immigration Blvd
                  <br />
                  New York, NY 10001
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VM Visa. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AIChatAssistant />
    </div>
  );
}
