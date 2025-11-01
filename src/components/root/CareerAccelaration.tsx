import { StarIcon } from "lucide-react";
import React from "react";
import { Award, Users, Target, Clock, UserCheck, Zap } from "lucide-react";

const CareerAccelaration = () => {
  const cards = [
    {
      headline: "Industry-Recognized Certification",
      description:
        "Earn credentials that hiring managers recognize. Add verified AI skills to your LinkedIn profile and resume that differentiate you from peers.",
      icon: "award",
    },
    {
      headline: "Professional Network",
      description:
        "Connect with ambitious professionals across industries. Collaborate on projects, share insights, and build relationships that accelerate your career growth.",
      icon: "users",
    },
    {
      headline: "Career-First Curriculum",
      description:
        "Designed with hiring managers and executives. Focus on skills that lead to promotions, salary increases, and leadership opportunities in your field.",
      icon: "target",
    },
    {
      headline: "Busy Professional Schedule",
      description:
        "Self-paced learning with 3-5 hour weekly commitments. Live office hours every week. Complete courses in 6-8 weeks while maintaining your full-time role.",
      icon: "clock",
    },
    {
      headline: "Role-Specific Learning Paths",
      description:
        "Tailored courses for marketers, finance professionals, HR leaders, operations managers, and executives. Learn AI applications that directly impact your daily responsibilities.",
      icon: "user-check",
    },
    {
      headline: "Immediate Implementation",
      description:
        "Start applying AI tools in your work within the first week. Build your portfolio of AI-driven projects that demonstrate measurable business impact.",
      icon: "zap",
    },
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    award: Award,
    users: Users,
    target: Target,
    clock: Clock,
    "user-check": UserCheck,
    zap: Zap,
  };
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Industry-Specific AI Skills That Transform.{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Careers!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Generic AI courses teach theory. We teach you how to apply AI in
            your actual role—whether you&apos;re in marketing, finance, healthcare,
            operations, or leadership.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const IconComponent = iconMap[card.icon];
            return (
              <div className="w-full h-full p-6 rounded-lg shadow-xl hover:shadow-primary/20" key={i}>
                <div className="w-max h-max">
                  <div className="bg-primary p-4 rounded-xl">
                    {IconComponent && (
                      <IconComponent className="text-white h-6 w-6 shrink-0" />
                    )}
                    {/* <StarIcon className="text-white h-6 w-6 shrink-0" /> */}
                  </div>
                </div>
                <h1 className="text-lg font-semibold mt-5">{card.headline}</h1>
                <p className="text-muted-foreground font-medium mt-3">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerAccelaration;
