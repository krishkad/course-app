import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  MessageSquare,
  Network,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const CareerGrowthSection = () => {
  const growthCards = [
    {
      icon: FileText,
      title: "Resume Building",
      description: "Polish your resume to match industry standards.",
      image: "/images/career-resume-builder.jpeg",
    },
    {
      icon: Briefcase,
      title: "Interview Preparation",
      description: "Master interview techniques with real-world scenarios.",
      image: "/images/career-interview-prep.jpeg",
    },
    {
      icon: Network,
      title: "Professional Networking",
      description: "Connect with industry leaders and expand your network.",
      image: "/images/career-networking.jpeg",
    },
    {
      icon: TrendingUp,
      title: "Skill Assessment",
      description: "Identify gaps and track your professional development.",
      image: "/images/career-skill-assessment.jpeg",
    },
    {
      icon: Users,
      title: "Mentorship Programs",
      description: "Get guidance from experienced professionals in your field.",
      image: "/images/career-mentorship.jpeg",
    },
    {
      icon: Target,
      title: "Career Planning",
      description: "Set goals and create actionable career roadmaps.",
      image: "/images/career-resume-builder.jpeg",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Stay updated with the latest industry trends and skills.",
      image: "/images/career-interview-prep.jpeg",
    },
    {
      icon: MessageSquare,
      title: "Communication Skills",
      description: "Improve presentation and interpersonal communication.",
      image: "/images/career-networking.jpeg",
    },
    {
      icon: Calendar,
      title: "Time Management",
      description: "Master productivity techniques for professional success.",
      image: "/images/career-skill-assessment.jpeg",
    },
    {
      icon: Star,
      title: "Leadership Development",
      description: "Build essential leadership and team management skills.",
      image: "/images/career-mentorship.jpeg",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Helping People Grow Their Careers.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Every Day!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive support to advance your professional journey at every
            stage
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {growthCards.map((card, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] border border-border/50 hover:border-primary/20 overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {card.description}
                </p>
                <button className="text-sm font-medium text-primary hover:text-primary/80 flex items-center space-x-2 group/btn">
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center w-full">
          <div className="w-full inline-flex items-center justify-center p-8 bg-transparent rounded-2xl">
            <div className="text-center flex flex-col items-center justify-center text-primary-foreground">
              <p className="text-4xl font-semibold mb-4 text-black">
                Ready to accelerate your career growth?
              </p>
              <button className="px-8 py-3 bg-white text-white font-semibold rounded-lg bg-gradient-primary hover:bg-white/90 transition-colors shadow-lg flex items-center space-x-2">
                <span>Get Started Today</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGrowthSection;
