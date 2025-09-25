"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Lock,
    Play,
    Star,
    Users,
} from "lucide-react";
import Link from "next/link";
import Footer from "./Footer";
import Navigation from "./Navigation";
import YouTubeEmbed from "./YoutubeEmbed";

const CourseDetail = ({ courseId }: { courseId: string }) => {

  // Simulate video progress - in real app this would be from video player events
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setWatchProgress((prev) => {
//         const newProgress = prev + 1;
//         return newProgress > 100 ? 0 : newProgress;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

  // Course data - in a real app, this would come from an API
  const courseData = {
    "digital-marketing-mastery": {
      title: "Digital Marketing Mastery",
      description:
        "Learn modern marketing strategies and tools to grow your business online with comprehensive hands-on projects and real-world case studies.",
      fullDescription:
        "This comprehensive digital marketing course covers everything from SEO and social media marketing to email campaigns and analytics. You'll learn to create effective marketing strategies that drive real business results.",
      instructor: {
        name: "Sarah Johnson",
        bio: "Senior Marketing Director at TechCorp with 10+ years of experience in digital marketing and brand growth.",
        image: "/placeholder-instructor.jpg",
      },
      price: "$89",
      originalPrice: "$199",
      duration: "8 weeks",
      students: "2,341",
      rating: 4.8,
      reviews: 432,
      badge: "Best Seller",
      image: "/images/course-digital-marketing.jpeg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      lessons: [
        {
          title: "Introduction to Digital Marketing",
          duration: "15 min",
          locked: false,
        },
        {
          title: "Understanding Your Target Audience",
          duration: "22 min",
          locked: false,
        },
        { title: "SEO Fundamentals", duration: "35 min", locked: true },
        {
          title: "Social Media Marketing Strategy",
          duration: "28 min",
          locked: true,
        },
        {
          title: "Email Marketing Campaigns",
          duration: "31 min",
          locked: true,
        },
        {
          title: "Analytics and Performance Tracking",
          duration: "25 min",
          locked: true,
        },
        {
          title: "Paid Advertising (Google Ads, Facebook Ads)",
          duration: "40 min",
          locked: true,
        },
        {
          title: "Content Marketing Best Practices",
          duration: "33 min",
          locked: true,
        },
      ],
      whatYouLearn: [
        "Create comprehensive digital marketing strategies",
        "Master SEO techniques for organic traffic growth",
        "Design high-converting social media campaigns",
        "Build effective email marketing funnels",
        "Analyze marketing performance with advanced analytics",
        "Run profitable paid advertising campaigns",
      ],
      requirements: [
        "Basic computer skills and internet access",
        "Willingness to learn and experiment",
        "No prior marketing experience required",
      ],
    },
    "full-stack-web-development": {
      title: "Full-Stack Web Development",
      description:
        "Build complete web applications with React, Node.js, and modern tools from scratch to deployment.",
      fullDescription:
        "Master full-stack development by building real-world applications. Learn React, Node.js, databases, and deployment strategies used by top tech companies.",
      instructor: {
        name: "Mike Chen",
        bio: "Senior Software Engineer at Google with expertise in full-stack development and system architecture.",
        image: "/placeholder-instructor.jpg",
      },
      price: "$129",
      originalPrice: "$299",
      duration: "12 weeks",
      students: "1,876",
      rating: 4.9,
      reviews: 287,
      badge: "Most Popular",
      image: "/images/course-web-development.jpeg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      lessons: [
        {
          title: "Course Introduction & Setup",
          duration: "20 min",
          locked: false,
        },
        { title: "HTML & CSS Fundamentals", duration: "45 min", locked: false },
        { title: "JavaScript ES6+ Features", duration: "50 min", locked: true },
        { title: "React Components & Hooks", duration: "60 min", locked: true },
        {
          title: "Node.js & Express Server Setup",
          duration: "55 min",
          locked: true,
        },
        {
          title: "Database Design & MongoDB",
          duration: "40 min",
          locked: true,
        },
        { title: "RESTful API Development", duration: "65 min", locked: true },
        {
          title: "Authentication & Security",
          duration: "45 min",
          locked: true,
        },
        { title: "Deployment & DevOps", duration: "35 min", locked: true },
      ],
      whatYouLearn: [
        "Build responsive web applications with React",
        "Create RESTful APIs with Node.js and Express",
        "Design and manage databases with MongoDB",
        "Implement user authentication and security",
        "Deploy applications to production environments",
        "Use modern development tools and workflows",
      ],
      requirements: [
        "Basic understanding of HTML and CSS",
        "Familiarity with programming concepts",
        "Computer with internet connection",
      ],
    },
    // Add other courses as needed...
  };

  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The course you're looking for doesn't exist.
            </p>
            <Link href="/courses">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Courses
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-0">
        {/* Breadcrumb */}
        <div className="border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/courses"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Courses
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative  bg-black rounded-lg overflow-hidden mb-6">
                <YouTubeEmbed videoId={course.videoUrl.split("embed/")[1]} />
              </div>

              {/* Progress Section */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Your Progress</h3>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(20)}% Complete
                    </span>
                  </div>
                  <Progress value={20} className="h-3 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Keep watching to track your learning progress
                  </p>
                </CardContent>
              </Card>

              {/* Course Content Sections */}
              <div className="space-y-8">
                {/* Course Schedule */}
                <Card className="p-0">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <Play className="mr-3 h-6 w-6 text-primary" />
                      Course Content
                    </h2>
                    <div className="space-y-3">
                      {course.lessons.map((lesson, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-medium text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium text-card-foreground">
                                {lesson.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </p>
                            </div>
                          </div>
                          {lesson.locked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="what-you-learn">
                    <AccordionTrigger className="text-xl font-semibold">
                      What You'll Learn
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.whatYouLearn.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="instructor">
                    <AccordionTrigger className="text-xl font-semibold">
                      About the Instructor
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {course.instructor.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">
                            {course.instructor.name}
                          </h4>
                          <p className="text-muted-foreground">
                            {course.instructor.bio}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="requirements">
                    <AccordionTrigger className="text-xl font-semibold">
                      Requirements
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">
                              {requirement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="px-6">
                  {/* Course Image */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />

                  {/* Badge */}
                  <div className="mb-4">
                    <Badge variant="default" className="shadow-sm">
                      {course.badge}
                    </Badge>
                  </div>

                  {/* Title and Description */}
                  <h1 className="text-2xl font-bold mb-4 text-card-foreground">
                    {course.title}
                  </h1>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {course.fullDescription}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl font-bold text-primary">
                        {course.price}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {course.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Limited time offer
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full mb-6 bg-gradient-primary hover:opacity-90 shadow-glow h-12 text-lg">
                    Enroll Now
                  </Button>

                  {/* Course Stats */}
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Instructor:</span>
                      <span className="font-medium">
                        {course.instructor.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Students:</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                        <span className="text-muted-foreground">
                          ({course.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
