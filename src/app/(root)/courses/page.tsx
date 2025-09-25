"use client"

import { Clock, Users, Star, ArrowRight, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/root/Navigation";
import Link from "next/link";
import Footer from "@/components/root/Footer";

const AllCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const courses = [
    {
      id: "digital-marketing-mastery",
      title: "Digital Marketing Mastery",
      description:
        "Learn modern marketing strategies and tools to grow your business online with comprehensive hands-on projects",
      instructor: "Sarah Johnson",
      price: "$89",
      priceValue: 89,
      duration: "8 weeks",
      durationValue: 8,
      students: "2,341",
      rating: 4.8,
      badge: "Best Seller",
      badgeVariant: "default" as const,
      category: "marketing",
      image: "/images/course-digital-marketing.jpeg",
    },
    {
      id: "full-stack-web-development",
      title: "Full-Stack Web Development",
      description:
        "Build complete web applications with React, Node.js, and modern tools from scratch to deployment",
      instructor: "Mike Chen",
      price: "$129",
      priceValue: 129,
      duration: "12 weeks",
      durationValue: 12,
      students: "1,876",
      rating: 4.9,
      badge: "Most Popular",
      badgeVariant: "secondary" as const,
      category: "development",
      image: "/images/course-web-development.jpeg",
    },
    {
      id: "project-management-pro",
      title: "Project Management Pro",
      description:
        "Master Agile, Scrum, and traditional project management methodologies with real-world case studies",
      instructor: "Lisa Rodriguez",
      price: "$79",
      priceValue: 79,
      duration: "6 weeks",
      durationValue: 6,
      students: "3,102",
      rating: 4.7,
      badge: "Trending",
      badgeVariant: "outline" as const,
      category: "business",
      image: "/images/course-project-management.jpeg",
    },
    {
      id: "data-science-fundamentals",
      title: "Data Science Fundamentals",
      description:
        "Python, statistics, and machine learning for beginners to advanced with industry datasets",
      instructor: "Dr. James Wilson",
      price: "$149",
      priceValue: 149,
      duration: "10 weeks",
      durationValue: 10,
      students: "1,543",
      rating: 4.9,
      badge: "New",
      badgeVariant: "destructive" as const,
      category: "data-science",
      image: "/images/course-data-science.jpeg",
    },
    {
      id: "ui-ux-design-principles",
      title: "UI/UX Design Principles",
      description:
        "Create beautiful and user-friendly interfaces with design thinking and modern tools",
      instructor: "Emma Thompson",
      price: "$99",
      priceValue: 99,
      duration: "7 weeks",
      durationValue: 7,
      students: "2,087",
      rating: 4.8,
      badge: "Editor's Choice",
      badgeVariant: "default" as const,
      category: "design",
      image: "/images/course-ui-ux-design.jpeg",
    },
    {
      id: "financial-planning-analysis",
      title: "Financial Planning & Analysis",
      description:
        "Corporate finance, budgeting, and financial modeling for professionals in modern business",
      instructor: "Robert Kim",
      price: "$119",
      priceValue: 119,
      duration: "9 weeks",
      durationValue: 9,
      students: "1,234",
      rating: 4.6,
      badge: "Professional",
      badgeVariant: "secondary" as const,
      category: "finance",
      image: "/images/course-financial-planing.jpeg",
    },
  ];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter((course) => {
    if (selectedCategory !== "all" && course.category !== selectedCategory)
      return false;
    if (selectedDuration !== "all") {
      if (selectedDuration === "short" && course.durationValue > 6)
        return false;
      if (
        selectedDuration === "medium" &&
        (course.durationValue <= 6 || course.durationValue > 10)
      )
        return false;
      if (selectedDuration === "long" && course.durationValue <= 10)
        return false;
    }
    if (selectedPrice !== "all") {
      if (selectedPrice === "free" && course.priceValue > 0) return false;
      if (
        selectedPrice === "low" &&
        (course.priceValue <= 0 || course.priceValue > 100)
      )
        return false;
      if (
        selectedPrice === "medium" &&
        (course.priceValue <= 100 || course.priceValue > 150)
      )
        return false;
      if (selectedPrice === "high" && course.priceValue <= 150) return false;
    }
    if (selectedRating !== "all") {
      if (selectedRating === "4+" && course.rating < 4.0) return false;
      if (selectedRating === "4.5+" && course.rating < 4.5) return false;
      if (selectedRating === "4.8+" && course.rating < 4.8) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                All Courses
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
                Discover our complete collection of professional development
                courses
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Filter Courses</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDuration}
                onValueChange={setSelectedDuration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">Short (1-6 weeks)</SelectItem>
                  <SelectItem value="medium">Medium (7-10 weeks)</SelectItem>
                  <SelectItem value="long">Long (10+ weeks)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="low">$1 - $100</SelectItem>
                  <SelectItem value="medium">$101 - $150</SelectItem>
                  <SelectItem value="high">$150+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Rating</SelectItem>
                  <SelectItem value="4+">4.0+ Stars</SelectItem>
                  <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                  <SelectItem value="4.8+">4.8+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group block"
                >
                  <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20">
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant={course.badgeVariant}
                          className="shadow-sm"
                        >
                          {course.badge}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-800">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                      </p>

                      <p className="text-sm font-medium text-primary mb-4">
                        by {course.instructor}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-6 bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{course.students}</span>
                        </div>
                      </div>

                      {/* Course Footer */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">
                            {course.price}
                          </span>
                        </div>
                        <Button className="bg-gradient-primary hover:opacity-90 shadow-glow group">
                          View Course
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllCourses;
