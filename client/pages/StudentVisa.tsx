import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  DollarSign,
  Users,
  FileText,
  Globe,
} from "lucide-react";

export default function StudentVisa() {
  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-vm-green to-vm-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Student Visa Services
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Student Visa Assistance
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Complete end-to-end support for F-1 and other study permits, from
            document prep to embassy interview coaching.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-white text-vm-green hover:bg-gray-100"
            >
              Find Student Visa Expert
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-vm-gray-900 mb-4">
              What's Included in Our Student Visa Service
            </h2>
            <p className="text-lg text-vm-gray-600 max-w-3xl mx-auto">
              Get comprehensive support for your student visa application with
              verified immigration experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Document Preparation",
                description:
                  "Complete guidance on preparing all required documents including I-20, financial statements, and academic transcripts.",
              },
              {
                icon: BookOpen,
                title: "University Selection",
                description:
                  "Expert advice on choosing the right university and program that matches your academic goals and visa requirements.",
              },
              {
                icon: Users,
                title: "Interview Coaching",
                description:
                  "Comprehensive preparation for your visa interview including mock interviews and expert tips.",
              },
              {
                icon: Clock,
                title: "Application Timeline",
                description:
                  "Detailed timeline planning to ensure all deadlines are met and your application is submitted on time.",
              },
              {
                icon: DollarSign,
                title: "Financial Planning",
                description:
                  "Guidance on demonstrating financial capability and understanding funding requirements.",
              },
              {
                icon: Globe,
                title: "Post-Arrival Support",
                description:
                  "Assistance with post-arrival requirements including SSN application and campus orientation.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-vm-green/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-vm-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-vm-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-vm-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-vm-gray-900 mb-4">
              Our Student Visa Process
            </h2>
            <p className="text-lg text-vm-gray-600">
              Simple, transparent process to get your student visa approved.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Initial Consultation",
                description:
                  "Meet with your assigned expert to discuss your academic goals and visa requirements.",
              },
              {
                step: "02",
                title: "Document Review",
                description:
                  "Comprehensive review of all your documents and guidance on missing requirements.",
              },
              {
                step: "03",
                title: "Application Preparation",
                description:
                  "Complete preparation and submission of your visa application with expert oversight.",
              },
              {
                step: "04",
                title: "Interview Preparation",
                description:
                  "Mock interviews and coaching to ensure you're fully prepared for your visa interview.",
              },
              {
                step: "05",
                title: "Follow-up Support",
                description:
                  "Continued support until visa approval and assistance with post-arrival requirements.",
              },
            ].map((process, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-vm-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {process.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-vm-gray-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-vm-gray-600">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vm-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Student Visa Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with verified student visa experts and get your application
            approved.
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
