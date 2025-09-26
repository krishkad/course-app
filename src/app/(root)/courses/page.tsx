"use client";

import { Clock, Users, Star, ArrowRight, Filter, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
  // const filteredCourses = courses.filter((course) => {
  //   if (selectedCategory !== "all" && course.category !== selectedCategory)
  //     return false;
  //   if (selectedDuration !== "all") {
  //     if (selectedDuration === "short" && course.durationValue > 6)
  //       return false;
  //     if (
  //       selectedDuration === "medium" &&
  //       (course.durationValue <= 6 || course.durationValue > 10)
  //     )
  //       return false;
  //     if (selectedDuration === "long" && course.durationValue <= 10)
  //       return false;
  //   }
  //   if (selectedPrice !== "all") {
  //     if (selectedPrice === "free" && course.priceValue > 0) return false;
  //     if (
  //       selectedPrice === "low" &&
  //       (course.priceValue <= 0 || course.priceValue > 100)
  //     )
  //       return false;
  //     if (
  //       selectedPrice === "medium" &&
  //       (course.priceValue <= 100 || course.priceValue > 150)
  //     )
  //       return false;
  //     if (selectedPrice === "high" && course.priceValue <= 150) return false;
  //   }
  //   if (selectedRating !== "all") {
  //     if (selectedRating === "4+" && course.rating < 4.0) return false;
  //     if (selectedRating === "4.5+" && course.rating < 4.5) return false;
  //     if (selectedRating === "4.8+" && course.rating < 4.8) return false;
  //   }
  //   return true;
  // });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                All Courses
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover our complete collection of professional development
                courses
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="px-4 pb-12">
          <div className="container mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-border/50">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search profession, skill, hobbies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Course Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="workshop">Self Improvement</SelectItem>
                      <SelectItem value="seminar">Career</SelectItem>
                      <SelectItem value="conference">AI</SelectItem>
                      <SelectItem value="course">AI Business</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Cost" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Free</SelectItem>
                      <SelectItem value="completed">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {courses.length} of {courses.length} courses
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {courses.map((course) => (
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
                          <span className="text-2xl font-bold !text-primary">
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
