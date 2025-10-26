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
  Brain,
  BarChart,
  Calculator,
  UserCog,
  Scale,
  Palette,
  Book,
  Lightbulb,
  Eye,
  Newspaper,
  Globe,
} from "lucide-react";
import Link from "next/link";

const CareerGrowthSection = () => {
  const growthCards = [
    {
      icon: Brain,
      title: "Software Engineer / Developer",
      description:
        "AI literacy enables transition to ML Engineer or AI Architect roles, focusing on model deployment and ethical AI integration.",
      image: "/images/career-resume-builder.jpeg",
      keywords: ["Software Engineer", "Software Developer"],
    },
    {
      icon: BarChart,
      title: "Marketing Specialist / Digital Marketer",
      description:
        "AI analytics skills enable personalized campaigns and optimization, leading to MarTech leadership and better ROI.",
      image: "/images/career-interview-prep.jpeg",
      keywords: ["Marketing Manager"],
    },
    {
      icon: Calculator,
      title: "Data Analyst / Business Analyst",
      description:
        "Mastery of ML and deep learning opens doors to Data Scientist roles with higher salary and strategic projects.",
      image: "/images/career-networking.jpeg",
      keywords: ["Data Analyst", "Business Analyst"],
    },
    {
      icon: Calculator,
      title: "Financial Analyst / Investment Professional",
      description:
        "AI use in trading and risk modeling shifts focus to strategic forecasting and FinTech leadership.",
      image: "/images/career-skill-assessment.jpeg",
      keywords: ["Financial Analyst"],
    },
    {
      icon: UserCog,
      title: "Customer Service / Operations Manager",
      description:
        "AI automation knowledge improves service efficiency, leading to CX Strategy and digital transformation roles.",
      image: "/images/career-mentorship.jpeg",
      keywords: [],
    },
    {
      icon: Scale,
      title: "Legal Professional (Lawyer / Paralegal)",
      description:
        "AI enhances e-discovery and contract analysis, unlocking careers in Legal Tech and AI Governance.",
      image: "/images/career-resume-builder.jpeg",
      keywords: ["Lawyer"],
    },
    {
      icon: Palette,
      title: "Content Creator / Graphic Designer",
      description:
        "Generative AI boosts output and creative direction, enabling monetization via prompt engineering.",
      image: "/images/career-interview-prep.jpeg",
      keywords: ["Graphic Designer", "Content Writer"],
    },
    {
      icon: Book,
      title: "Educator / Learning Designer",
      description:
        "AI aids personalized learning and assessments, keeping teaching relevant in AI-enhanced classrooms.",
      image: "/images/career-networking.jpeg",
      keywords: ["Teacher", "Educator"],
    },
    {
      icon: Lightbulb,
      title: "Entrepreneur / Business Owner",
      description:
        "AI automates operations and markets, giving businesses a competitive edge in efficiency and growth.",
      image: "/images/career-skill-assessment.jpeg",
      keywords: ["Entrepreneur", "Business Owner"],
    },
    {
      icon: Eye,
      title: "UX/UI Designer",
      description:
        "AI enhances user behavior analysis and design, creating faster, data-backed, intuitive interfaces.",
      image: "/images/career-mentorship.jpeg",
      keywords: ["UX/UI Designer"],
    },
    {
      icon: Newspaper,
      title: "Journalist / Research Writer",
      description:
        "AI tools speed up research and verification, enabling deeper, credible reporting from large datasets.",
      image: "/images/career-resume-builder.jpeg",
      keywords: ["Journalist", "Writer"],
    },
    {
      icon: Globe,
      title: "AI for All",
      description:
        "AI literacy empowers everyone to use AI responsibly, becoming as essential as computer literacy.",
      image: "/images/career-interview-prep.jpeg",
      keywords: [],
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
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
            <Link href={`/courses?q=${card.keywords[0]}`} key={index} className="h-full">
              <div className="group h-full bg-background dark:bg-background/30 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] border border-border/50 hover:border-primary/20 overflow-hidden">
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
                <div className="p-6 bg-background/50">
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
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center w-full">
          <div className="w-full inline-flex items-center justify-center p-8 bg-transparent rounded-2xl">
            <div className="text-center flex flex-col items-center justify-center text-primary-foreground">
              <p className="text-4xl font-semibold mb-4 text-black">
                Ready to accelerate your career growth?
              </p>
              <Link href={"/courses"}>
                <button className="px-8 py-3 bg-white text-white font-semibold rounded-lg bg-gradient-primary hover:bg-white/90 transition-colors shadow-lg flex items-center space-x-2">
                  <span>Get Started Today</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerGrowthSection;
