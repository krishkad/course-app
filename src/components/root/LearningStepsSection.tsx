import { Search, Route, GraduationCap, Building, Award } from "lucide-react";

const LearningStepsSection = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Choose Your Profession",
      description: "Identify your career goals and select the profession you want to advance in"
    },
    {
      number: "02", 
      icon: Route,
      title: "Pick a Learning Path",
      description: "Select from curated learning paths designed by industry experts"
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Learn from Experts",
      description: "Access high-quality content created by top professionals in your field"
    },
    {
      number: "04",
      icon: Building,
      title: "Build Real-World Projects",
      description: "Apply your knowledge through hands-on projects and practical exercises"
    },
    {
      number: "05",
      icon: Award,
      title: "Get Certified & Get Hired",
      description: "Earn industry-recognized certificates and advance your career"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Grow Your Knowledge in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Five Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven learning methodology helps thousands of professionals achieve their career goals
          </p>
        </div>

        {/* Steps Container */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-primary transform -translate-y-1/2 rounded-full"></div>
              
              {/* Steps */}
              <div className="flex justify-between items-center relative z-10">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center max-w-xs">
                    {/* Step Circle */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-hero mb-4">
                        <step.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold mb-3 text-card-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                {/* Step Circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-card">
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold">
                    {step.number}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-px h-12 bg-gradient-primary transform -translate-x-1/2"></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-bold mb-2 text-card-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to start your learning journey?
          </p>
          <button className="px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-card">
            Begin Your Path
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningStepsSection;