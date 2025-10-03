"use client";
import { Clock, Users, Star, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ICourse } from "@/redux/slices/courses";

const TopCoursesSection = () => {
  const [topCourses, setTopCourses] = useState<ICourse[]>([]);
  const courses = useSelector((state: RootState) => state.courses.courses);
  // const courses = [
  //   {
  //     id: "digital-marketing-mastery",
  //     title: "Digital Marketing Mastery",
  //     description:
  //       "Learn modern marketing strategies and tools to grow your business online with comprehensive hands-on projects",
  //     instructor: "Sarah Johnson",
  //     price: "$89",
  //     priceValue: 89,
  //     duration: "8 weeks",
  //     durationValue: 8,
  //     students: "2,341",
  //     rating: 4.8,
  //     badge: "Best Seller",
  //     badgeVariant: "default" as const,
  //     category: "marketing",
  //     image: "/images/course-digital-marketing.jpeg",
  //   },
  //   {
  //     id: "full-stack-web-development",
  //     title: "Full-Stack Web Development",
  //     description:
  //       "Build complete web applications with React, Node.js, and modern tools from scratch to deployment",
  //     instructor: "Mike Chen",
  //     price: "$129",
  //     priceValue: 129,
  //     duration: "12 weeks",
  //     durationValue: 12,
  //     students: "1,876",
  //     rating: 4.9,
  //     badge: "Most Popular",
  //     badgeVariant: "secondary" as const,
  //     category: "development",
  //     image: "/images/course-web-development.jpeg",
  //   },
  //   {
  //     id: "project-management-pro",
  //     title: "Project Management Pro",
  //     description:
  //       "Master Agile, Scrum, and traditional project management methodologies with real-world case studies",
  //     instructor: "Lisa Rodriguez",
  //     price: "$79",
  //     priceValue: 79,
  //     duration: "6 weeks",
  //     durationValue: 6,
  //     students: "3,102",
  //     rating: 4.7,
  //     badge: "Trending",
  //     badgeVariant: "outline" as const,
  //     category: "business",
  //     image: "/images/course-project-management.jpeg",
  //   },
  //   {
  //     id: "data-science-fundamentals",
  //     title: "Data Science Fundamentals",
  //     description:
  //       "Python, statistics, and machine learning for beginners to advanced with industry datasets",
  //     instructor: "Dr. James Wilson",
  //     price: "$149",
  //     priceValue: 149,
  //     duration: "10 weeks",
  //     durationValue: 10,
  //     students: "1,543",
  //     rating: 4.9,
  //     badge: "New",
  //     badgeVariant: "destructive" as const,
  //     category: "data-science",
  //     image: "/images/course-data-science.jpeg",
  //   },
  //   {
  //     id: "ui-ux-design-principles",
  //     title: "UI/UX Design Principles",
  //     description:
  //       "Create beautiful and user-friendly interfaces with design thinking and modern tools",
  //     instructor: "Emma Thompson",
  //     price: "$99",
  //     priceValue: 99,
  //     duration: "7 weeks",
  //     durationValue: 7,
  //     students: "2,087",
  //     rating: 4.8,
  //     badge: "Editor's Choice",
  //     badgeVariant: "default" as const,
  //     category: "design",
  //     image: "/images/course-ui-ux-design.jpeg",
  //   },
  //   {
  //     id: "financial-planning-analysis",
  //     title: "Financial Planning & Analysis",
  //     description:
  //       "Corporate finance, budgeting, and financial modeling for professionals in modern business",
  //     instructor: "Robert Kim",
  //     price: "$119",
  //     priceValue: 119,
  //     duration: "9 weeks",
  //     durationValue: 9,
  //     students: "1,234",
  //     rating: 4.6,
  //     badge: "Professional",
  //     badgeVariant: "secondary" as const,
  //     category: "finance",
  //     image: "/images/course-financial-planing.jpeg",
  //   },
  // ];

  useEffect(() => {
    if (courses) {
      setTopCourses(courses);
      console.log({ courses });
    }
  }, [courses]);

  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Top Courses for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Career Growth
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hand-picked courses by industry experts to advance your professional
            skills
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {topCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group block"
            >
              <div className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20">
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={
                        course.tag === "new"
                          ? "destructive"
                          : course.tag === "best_seller"
                          ? "default"
                          : course.tag === "trending"
                          ? "outline"
                          : "secondary"
                      }
                      className="shadow-sm"
                    >
                      {course.tag.replace("_", " ")}
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
                        ${course.price}
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

        {/* Bottom CTA */}
        <div className="text-center w-full">
          <div className="w-full inline-flex items-center justify-center p-8 py-12 bg-gradient-primary rounded-2xl shadow-hero">
            <div className="text-center text-primary-foreground">
              <p className="text-4xl font-semibold mb-4">
                Want to see more courses?
              </p>
              <Link href={"/courses"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-primary hover:bg-white hover:text-primary"
                >
                  Browse All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCoursesSection;
