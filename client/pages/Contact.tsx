import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@vmvisa.com",
      action: "mailto:support@vmvisa.com",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-VISA",
      action: "tel:+15551234842",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with us online",
      contact: "Available 24/7",
      action: "#",
    },
    {
      icon: Headphones,
      title: "Help Center",
      description: "Browse our FAQ",
      contact: "Self-service support",
      action: "/help",
    },
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Immigration Blvd, Suite 500",
      zipcode: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
    },
    {
      city: "Toronto",
      address: "456 Immigration Ave, Floor 12",
      zipcode: "Toronto, ON M5V 3A8",
      phone: "+1 (416) 555-7890",
    },
    {
      city: "London",
      address: "789 Visa Street, 3rd Floor",
      zipcode: "London, UK SW1A 1AA",
      phone: "+44 20 7946 0958",
    },
  ];

  return (
    <div className="min-h-screen bg-vm-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-vm-green to-vm-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Get in touch with our immigration experts. We're here to help you
            navigate your global journey.
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Clock className="w-5 h-5" />
            <span>Response time: Under 2 hours</span>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300 bg-white"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-vm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-vm-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-vm-gray-600 mb-3">
                      {method.description}
                    </p>
                    <a
                      href={method.action}
                      className="text-vm-green font-medium hover:text-vm-green-600 transition-colors"
                    >
                      {method.contact}
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-vm-gray-900">
                    Send us a Message
                  </CardTitle>
                  <p className="text-vm-gray-600">
                    Fill out the form below and we'll get back to you within 2
                    hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-vm-gray-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-vm-gray-600">
                        We've received your message and will respond within 2
                        hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What can we help you with?"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your inquiry in detail..."
                          required
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-vm-green hover:bg-vm-green-600 h-12"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold text-vm-gray-900 mb-6">
                Our Offices
              </h2>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-vm-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-vm-green" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-vm-gray-900 mb-2">
                            {office.city}
                          </h3>
                          <p className="text-vm-gray-600 mb-1">
                            {office.address}
                          </p>
                          <p className="text-vm-gray-600 mb-3">
                            {office.zipcode}
                          </p>
                          <div className="flex items-center space-x-2 text-vm-green">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {office.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Business Hours */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-vm-green" />
                    <span>Business Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-vm-gray-700">Monday - Friday</span>
                      <span className="text-vm-gray-900 font-medium">
                        9:00 AM - 7:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vm-gray-700">Saturday</span>
                      <span className="text-vm-gray-900 font-medium">
                        10:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vm-gray-700">Sunday</span>
                      <span className="text-vm-gray-900 font-medium">
                        Closed
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-vm-gray-200">
                      <div className="flex items-center space-x-2 text-vm-green">
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Emergency support available 24/7
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-vm-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-vm-gray-600">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will I get a response?",
                answer:
                  "We respond to all inquiries within 2 hours during business hours, and within 24 hours on weekends.",
              },
              {
                question: "Do you offer consultation calls?",
                answer:
                  "Yes! We offer free 15-minute consultation calls to discuss your immigration needs and how we can help.",
              },
              {
                question: "What types of visas do you help with?",
                answer:
                  "We assist with all types of visas including work visas, student visas, family immigration, business visas, and more.",
              },
              {
                question: "Is there a fee for using your platform?",
                answer:
                  "Our platform is free to use. You only pay the immigration consultant directly for their services.",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-vm-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-vm-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
