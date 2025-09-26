"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Headphones,
} from "lucide-react";
import Navigation from "@/components/root/Navigation";
import Footer from "@/components/root/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      //   toast({
      //     title: "Missing Information",
      //     description: "Please fill in all required fields.",
      //     variant: "destructive"
      //   });
      return;
    }

    // Simulate form submission
    // toast({
    //   title: "Message Sent Successfully!",
    //   description: "We'll get back to you within 24 hours.",
    // });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@eduplatform.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Education Street, Learning City, LC 12345",
      description: "Our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday: 9AM - 6PM EST",
      description: "Weekend support available",
    },
  ];

  const supportTypes = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, courses, or services",
    },
    {
      icon: Users,
      title: "Student Support",
      description: "Help with course access, assignments, or learning issues",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Technical issues, bugs, or platform difficulties",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to help you succeed. Reach out to our team for support,
              questions, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card/50 h-max backdrop-blur-sm border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl  bg-gradient-primary bg-clip-text text-transparent">
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </CardHeader>
              <CardContent className="h-max">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full shadow-glow group"
                  >
                    <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Support Types & FAQ */}
            <div className="space-y-8">
              {/* Support Types */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
                    How Can We Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:border-primary/20 transition-colors group"
                    >
                      <type.icon className="h-6 w-6 text-primary mt-1 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                          {type.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    📚 Course Catalog
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    ❓ Frequently Asked Questions
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🎓 Student Resources
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    💼 Corporate Training
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    🤝 Become an Instructor
                  </Button>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-primary text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-90" />
                    <h3 className="text-xl font-semibold mb-2">
                      Fast Response Time
                    </h3>
                    <p className="text-white/90 text-sm">
                      We typically respond to all inquiries within 24 hours
                      during business days. For urgent technical issues, expect
                      a response within 4-6 hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Info Cards */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center group hover-card-lift bg-card/50 backdrop-blur-sm border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <info.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-sm font-medium mb-1">{info.content}</p>
                  <p className="text-xs text-muted-foreground">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
