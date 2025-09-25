import { Clock, Users, Star, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const TopCoursesSection = () => {
  const courses = [
    {
      title: "Digital Marketing Mastery",
      description:
        "Learn modern marketing strategies and tools to grow your business online",
      instructor: "Sarah Johnson",
      price: "$89",
      duration: "8 weeks",
      students: "2,341",
      rating: 4.8,
      badge: "Best Seller",
      badgeVariant: "default" as const,
      image: "/images/course-digital-marketing.jpeg",
    },
    {
      title: "Full-Stack Web Development",
      description:
        "Build complete web applications with React, Node.js, and modern tools",
      instructor: "Mike Chen",
      price: "$129",
      duration: "12 weeks",
      students: "1,876",
      rating: 4.9,
      badge: "Most Popular",
      badgeVariant: "secondary" as const,
      image: "/images/course-web-development.jpeg",
    },
    {
      title: "Project Management Pro",
      description:
        "Master Agile, Scrum, and traditional project management methodologies",
      instructor: "Lisa Rodriguez",
      price: "$79",
      duration: "6 weeks",
      students: "3,102",
      rating: 4.7,
      badge: "Trending",
      badgeVariant: "outline" as const,
      image: "/images/course-project-management.jpeg",
    },
    {
      title: "Data Science Fundamentals",
      description:
        "Python, statistics, and machine learning for beginners to advanced",
      instructor: "Dr. James Wilson",
      price: "$149",
      duration: "10 weeks",
      students: "1,543",
      rating: 4.9,
      badge: "New",
      badgeVariant: "destructive" as const,
      image: "/images/course-data-science.jpeg",
    },
    {
      title: "UI/UX Design Principles",
      description:
        "Create beautiful and user-friendly interfaces with design thinking",
      instructor: "Emma Thompson",
      price: "$99",
      duration: "7 weeks",
      students: "2,087",
      rating: 4.8,
      badge: "Editor's Choice",
      badgeVariant: "default" as const,
      image: "/images/course-ui-ux-design.jpeg",
    },
    {
      title: "Financial Planning & Analysis",
      description:
        "Corporate finance, budgeting, and financial modeling for professionals",
      instructor: "Robert Kim",
      price: "$119",
      duration: "9 weeks",
      students: "1,234",
      rating: 4.6,
      badge: "Professional",
      badgeVariant: "secondary" as const,
      image: "/images/course-financial-planing.jpeg",
    },
  ];

  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
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
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20"
            >
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant={course.badgeVariant} className="shadow-sm">
                    {course.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{course.rating}</span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
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
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
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
