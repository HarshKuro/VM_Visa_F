import { useState, useEffect } from "react";
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
  Briefcase,
} from "lucide-react";

export default function Index() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const immigrationImages = [
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Passport in hand - Immigration journey",
      title: "Your Journey Begins",
    },
    {
      src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "World map with travel planning - Global immigration",
      title: "Global Opportunities",
    },
    {
      src: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Passport pages with visa stamps",
      title: "Visa Success Stories",
    },
    {
      src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      alt: "Immigration documents and forms",
      title: "Expert Guidance",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % immigrationImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [immigrationImages.length]);

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
      name: "Sarah Chen",
      role: "Software Engineer • H1-B Visa",
      country: "USA",
      content:
        "Found the perfect immigration lawyer through VM Visa. My H1-B application was approved in record time with expert guidance every step of the way.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b898?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Ahmed Hassan",
      role: "Business Owner • Investment Visa",
      country: "Canada",
      content:
        "The immigration expert helped me navigate the complex investor visa process. Professional service and incredible attention to detail.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Maria Gonzalez",
      role: "Graduate Student • F1 Visa",
      country: "Australia",
      content:
        "VM Visa connected me with an amazing consultant who guided me through my student visa application. Approved in just 2 weeks!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    },
  ];

  const partners = ["Microsoft", "Google", "Amazon", "Meta", "Apple", "Tesla"];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {immigrationImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 min-h-screen flex flex-col justify-center">
          {/* Top Icons */}
          <div className="flex justify-center mb-16 animate-in fade-in duration-1000 delay-300">
            <div className="flex items-center space-x-20">
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors border border-white/20">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  Documents
                </span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors border border-white/20">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  Global
                </span>
              </div>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors border border-white/20">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-medium text-white/90">
                  Experts
                </span>
              </div>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center space-y-10">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white animate-in slide-in-from-bottom duration-1000 delay-500">
                Connect with top{" "}
                <span className="text-vm-green">immigration experts</span>{" "}
                worldwide
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-light animate-in slide-in-from-bottom duration-1000 delay-700">
                Find verified immigration consultants, get expert guidance, and
                navigate your visa journey with confidence. Professional
                immigration services at your fingertips.
              </p>

              {/* Dynamic subtitle based on current image */}
              <div className="relative h-8">
                {immigrationImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-lg text-vm-green font-semibold bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                      {image.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in slide-in-from-bottom duration-1000 delay-1000">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-vm-green hover:bg-vm-green-600 text-white text-lg px-10 py-4 min-w-[160px] rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Find experts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signup/agent">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-vm-gray-900 text-lg px-10 py-4 min-w-[160px] rounded-lg font-semibold backdrop-blur-sm bg-white/10 hover:bg-white transition-all duration-300"
                >
                  Join as expert
                </Button>
              </Link>
            </div>
          </div>

          {/* Image indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 animate-in fade-in duration-1000 delay-1200">
            {immigrationImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white shadow-lg scale-125"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border border-vm-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl lg:text-5xl font-bold text-vm-green mb-2">
                  91%
                </div>
                <div className="text-lg font-semibold text-vm-gray-700">
                  Success Rate
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border border-vm-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl lg:text-5xl font-bold text-vm-blue mb-2">
                  4-10
                </div>
                <div className="text-lg font-semibold text-vm-gray-700">
                  Months Avg Processing
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border border-vm-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl lg:text-5xl font-bold text-vm-green mb-2">
                  150+
                </div>
                <div className="text-lg font-semibold text-vm-gray-700">
                  Countries
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-vm-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-vm-gray-900 mb-4">
              Expert Immigration Services Worldwide
            </h2>
            <p className="text-lg text-vm-gray-600 max-w-3xl mx-auto">
              Connect with certified immigration professionals who understand
              the complexities of global visa processes. Get personalized
              guidance for your unique immigration journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Work & Employment Visas",
                description:
                  "Connect with experts specializing in H1-B, L1, O1, and other employment-based visas.",
                features: [
                  "Visa strategy consultation",
                  "Document review & prep",
                  "Interview preparation",
                ],
                image:
                  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Users,
                title: "Family Reunification",
                description:
                  "Reunite with loved ones through family-based immigration with expert guidance.",
                features: [
                  "Spouse & partner visas",
                  "Parent sponsorship",
                  "Child immigration",
                ],
                image:
                  "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Award,
                title: "Study & Exchange Programs",
                description:
                  "Expert assistance for F1, M1, and J1 visas for international education.",
                features: [
                  "University guidance",
                  "Visa application support",
                  "Post-study options",
                ],
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Shield,
                title: "Business & Investment",
                description:
                  "E1, E2, EB5 investor visas and business immigration solutions with certified experts.",
                features: [
                  "Investment strategy",
                  "Business plan review",
                  "Compliance guidance",
                ],
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: CheckCircle,
                title: "Permanent Residency",
                description:
                  "Green card applications and permanent residency pathways with expert support.",
                features: [
                  "Eligibility assessment",
                  "Application tracking",
                  "Interview coaching",
                ],
                image:
                  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
              {
                icon: Globe,
                title: "Citizenship & Naturalization",
                description:
                  "Complete naturalization support and citizenship test preparation.",
                features: [
                  "Eligibility review",
                  "Test preparation",
                  "Application support",
                ],
                image:
                  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-vm-green" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-vm-gray-900 mb-3">
                    {service.title}
                  </h3>
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
                  <div className="mt-4 pt-4 border-t border-vm-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-vm-green text-vm-green hover:bg-vm-green hover:text-white"
                    >
                      Find Expert
                    </Button>
                  </div>
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
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-vm-gray-600 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-vm-gray-100"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-vm-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-vm-gray-500 mb-1">
                        {testimonial.role}
                      </div>
                      <div className="flex items-center text-xs text-vm-blue">
                        <Globe className="w-3 h-3 mr-1" />
                        {testimonial.country}
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
      <section className="py-20 bg-gradient-to-r from-vm-green to-vm-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Begin Your Global Immigration Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Connect with certified immigration experts worldwide. Over 10,000
            successful visa applications and counting. Your dream destination
            awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-vm-green hover:bg-gray-100 text-lg px-8 py-4 min-w-[200px]"
              >
                Find Your Expert
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/signup/agent">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-vm-green text-lg px-8 py-4 min-w-[200px]"
              >
                Join as Expert
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-sm">Verified Experts</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              <span className="text-sm">150+ Countries</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              <span className="text-sm">91% Success Rate</span>
            </div>
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
