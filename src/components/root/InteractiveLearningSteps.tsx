"use client";
import {
  ArrowRight,
  Award,
  Building,
  CheckCircle,
  GraduationCap,
  Route,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const InteractiveLearningSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

 

  // useEffect(() => {
  //   if (isVisible) {
  //     const interval = setInterval(() => {
  //       setActiveStep((prev) => (prev + 1) % steps.length);
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isVisible]);

  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Choose Your Profession",
      description:
        "Identify your career goals and select the profession you want to advance in",
      details:
        "Browse through 50+ career paths with detailed requirements and growth prospects.",
    },
    {
      number: "02",
      icon: Route,
      title: "Pick a Learning Path",
      description:
        "Select from curated learning paths designed by industry experts",
      details:
        "Each path includes 5-12 courses with progressive difficulty and hands-on projects.",
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Learn from Experts",
      description:
        "Access high-quality content created by top professionals in your field",
      details:
        "Video lessons, interactive exercises, and real-world case studies from industry leaders.",
    },
    {
      number: "04",
      icon: Building,
      title: "Build Real-World Projects",
      description:
        "Apply your knowledge through hands-on projects and practical exercises",
      details:
        "Portfolio-worthy projects that demonstrate your skills to potential employers.",
    },
    {
      number: "05",
      icon: Award,
      title: "Get Certified & Get Hired",
      description:
        "Earn industry-recognized certificates and advance your career",
      details:
        "Digital certificates, LinkedIn endorsements, and career support to land your dream job.",
    },
  ];

  return (
    <section
      id="learning-steps"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Grow Your Knowledge in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Five Simple Steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our proven learning methodology helps thousands of professionals
            achieve their career goals
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Interactive Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Animated Progress Line */}
              {/* <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted rounded-full transform -translate-y-1/2 overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                ></div>
              </div> */}

              {/* Steps */}
              <div className="flex justify-between items-center relative z-10">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center max-w-xs cursor-pointer transition-all duration-500`}
                    // onClick={() => setActiveStep(index)}
                  >
                    {/* Step Circle */}
                    <div className="relative mb-8">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-glow mb-4 transition-all duration-500 ${
                          true
                            ? "bg-gradient-primary scale-110"
                            : "bg-muted hover:bg-gradient-primary/20"
                        }`}
                      >
                        {false ? (
                          <CheckCircle className="h-10 w-10 text-primary-foreground" />
                        ) : (
                          <step.icon
                            className={`h-10 w-10 ${
                              true
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            }`}
                          />
                        )}
                      </div>
                      <div
                        className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                         false
                            ? "bg-accent text-accent-foreground scale-110"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="text-center">
                      <h3
                        className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                          true
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {step.description}
                      </p>
                      {/* {true && (
                        <p className="text-xs text-primary leading-relaxed animate-fade-in">
                          {step.details}
                        </p>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Interactive Layout */}
          <div className="lg:hidden">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    index === activeStep
                      ? "bg-gradient-primary text-primary-foreground shadow-hero scale-105"
                      : "bg-background shadow-card hover:shadow-card-hover"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Circle */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index === activeStep
                          ? "bg-white/20 backdrop-blur-sm"
                          : "bg-gradient-primary"
                      }`}
                    >
                      {index < activeStep ? (
                        <CheckCircle className="h-6 w-6 text-primary-foreground" />
                      ) : (
                        <step.icon className="h-6 w-6 text-primary-foreground" />
                      )}
                    </div>
                    <div
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === activeStep
                          ? "bg-white text-primary"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed mb-2 opacity-90">
                      {step.description}
                    </p>
                    {index === activeStep && (
                      <p className="text-xs leading-relaxed opacity-80 animate-fade-in">
                        {step.details}
                      </p>
                    )}
                  </div>

                  {/* Arrow for active step */}
                  {index === activeStep && (
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {/* <div className="flex justify-center space-x-2 mt-12 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeStep
                  ? "bg-primary scale-125"
                  : "bg-muted hover:bg-primary/50"
              }`}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div> */}

        {/* Bottom CTA */}
         <div className="text-center w-full mt-14">
          <div className="w-full inline-flex items-center justify-center p-8 py-12 bg-gradient-primary rounded-2xl shadow-hero">
            <div className="text-center text-primary-foreground">
              <p className="text-4xl font-semibold mb-4">
               Ready to start your learning journey?
              </p>
              <Button variant="outline" size="lg" className="border-2 border-white text-primary hover:bg-white hover:text-primary">
                <span>Begin Your Path</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-8 bg-gradient-primary rounded-2xl shadow-hero">
            <div className="text-center text-primary-foreground">
              <p className="text-lg font-medium mb-4">
                Ready to start your learning journey?
              </p>
              <button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-lg flex items-center space-x-2">
                <span>Begin Your Path</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default InteractiveLearningSteps;
