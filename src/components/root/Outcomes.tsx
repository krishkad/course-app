import { StarIcon } from "lucide-react";
import React from "react";

const Outcomes = () => {
  const cards = [
    {
      headline: "Automate Repetitive Tasks",
      description:
        "Eliminate 10-15 hours of manual work weekly through AI-powered automation in your specific role",
    },
    {
      headline: "Lead AI Initiatives",
      description:
        "Position yourself as the go-to AI expert in your department and lead strategic implementation projects",
    },
    {
      headline: "Enhance Decision-Making",
      description:
        "Leverage AI-driven insights and predictive analytics to make data-informed decisions faster and with greater confidence",
    },
    {
      headline: "Increase Productivity 3x",
      description:
        "Master AI tools for content creation, analysis, research, and communication to dramatically accelerate your output",
    },
    {
      headline: "Demonstrate ROI",
      description:
        "Build a portfolio of AI projects showing cost savings, efficiency gains, and revenue impact to justify promotions",
    },
    {
      headline: "Future-Proof Your Role",
      description:
        "Become the professional who works alongside AI effectively rather than being replaced by it",
    },
    {
      headline: "Command Higher Compensation",
      description:
        "AI-skilled professionals earn 25-40% more on average—position yourself for raises and better opportunities",
    },
    {
      headline: "Accelerate to Leadership",
      description:
        "Stand out in promotion decisions by demonstrating innovation, efficiency, and strategic thinking through AI adoption",
    },
  ];
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Concrete Outcomes That Advance Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Career
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every course is designed to deliver specific, measurable
            improvements to your professional capabilities and career
            trajectory.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            return (
              <div className="w-full h-full p-6 rounded-lg shadow-xl border-l-4 border-primary bg-background shadow-primary/20" key={i}>
                <h1 className="text-lg font-semibold">{card.headline}</h1>
                <p className="text-muted-foreground font-medium mt-1">
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

export default Outcomes;
