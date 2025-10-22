import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Award,
  TrendingUp,
  BookOpen,
  Globe,
  Heart,
  Zap,
} from "lucide-react";
import Navigation from "@/components/root/Navigation";
import Footer from "@/components/root/Footer";
import { Suspense } from "react";

const About = () => {
  const stats = [
    { number: "50K+", label: "Students Enrolled", icon: Users },
    { number: "200+", label: "Expert Instructors", icon: Award },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "100+", label: "Countries Served", icon: Globe },
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Excellence in Education",
      description:
        "We deliver world-class educational content that transforms careers and lives through innovative learning methodologies.",
    },
    {
      icon: Heart,
      title: "Student-Centric Approach",
      description:
        "Every decision we make puts our students first, ensuring they receive the support and resources they need to succeed.",
    },
    {
      icon: Zap,
      title: "Innovation & Technology",
      description:
        "We leverage cutting-edge technology to create immersive, interactive learning experiences that engage and inspire.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "We measure our success by your success, focusing on tangible outcomes and real-world application of skills.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      bio: "15+ years in EdTech, former VP at LinkedIn Learning",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b526?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Former Google engineer, AI and machine learning expert",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Head of Curriculum",
      bio: "PhD in Education, 20+ years in curriculum development",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "David Park",
      role: "Head of Student Success",
      bio: "Career counselor with 12+ years helping professionals grow",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                About LearnPro
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We&apos;re on a mission to democratize education and empower
                individuals worldwide to achieve their career goals through
                innovative online learning experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 pb-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center group hover-card-lift bg-card/50 backdrop-blur-sm border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 pb-16">
          <div className="container mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-elegant border border-border/50">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    At EduPlatform, we believe that quality education should be
                    accessible to everyone, everywhere. We&apos;re breaking down
                    barriers and creating pathways for individuals to unlock
                    their potential and transform their careers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Through our comprehensive curriculum, expert instructors,
                    and supportive community, we&apos;ve helped thousands of
                    students achieve their professional goals and build the
                    careers they&apos;ve always dreamed of.
                  </p>
                  <Button size="lg" className="shadow-glow">
                    Join Our Community
                  </Button>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-primaryflex items-center justify-center">
                    {/* <BookOpen className="h-24 w-24 text-white" /> */}
                    <img
                      src={
                        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      className="w-full h-full object-cover rounded-3xl shrink-0"
                      alt="about us image"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-secondary/20 backdrop-blur-sm rounded-full p-4">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-primary-accent/20 backdrop-blur-sm rounded-full p-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 pb-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These principles guide everything we do and shape the learning
                experience we create for our students.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group hover-card-lift bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {value.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Meet Our Leadership Team
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Passionate educators and technology experts dedicated to
                transforming the future of learning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center group hover-card-lift bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="relative mb-6">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <Badge variant="outline" className="mb-3">
                      {member.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Suspense>
  );
};

export default About;
