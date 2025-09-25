import { Search, CheckCircle, Award, Users, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
// import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      text: "Learn at your own pace",
    },
    {
      icon: Award,
      text: "Industry recognized",
    },
    {
      icon: Users,
      text: "Courses by top professionals",
    },
    {
      icon: Zap,
      text: "Career focused learning",
    },
    {
      icon: Clock,
      text: "Lifetime course access",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={"/images/hero-image.png"}
          alt="Professional learning environment"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Unlock Your Career Potential
          </h1>
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Learn from Industry Experts
          </h2> */}
          <p className="text-xl md:text-2xl text-muted-foreground  max-w-2xl mx-auto">
            Learn from Industry Experts
          </p>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Courses tailored to your profession, goals, and schedule
          </p>

          {/* Search Section */}
          {/* <div className="mb-16 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="What is your profession?"
                className="pl-12 pr-4 py-4 text-lg bg-white rounded-xl border-2 focus:border-primary shadow-card"
              />
              <Button 
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:opacity-90 px-8"
              >
                Search
              </Button>
            </div>
          </div> */}

          <div className="w-full max-w-xl mx-auto mb-16">
            <div className="flex items-center shadow-card rounded-full bg-white overflow-hidden border border-border focus-within:ring-1 focus-within:ring-primary transition">
              {/* Search Icon */}
              <div className="pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Input */}
              <Input
                type="text"
                placeholder="What is your profession?"
                className="flex-1 border-none ring-0 focus-visible:ring-0 focus:outline-none focus:border-none bg-transparent px-4 py-3 text-base"
              />

              {/* Button */}
              <Button
                type="submit"
                variant="ghost"
                className="rounded-none rounded-r-full bg-gradient-primary text-white hover:text-white hover:opacity-90 px-6 py-3 h-auto"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col w-[170px] items-center justify-center p-6 bg-gradient-card aspect-square rounded-full shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 border border-white hover:border-primary"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-1.5">
                  <benefit.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-sm font-medium text-center leading-snug">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg shadow-hero"
            >
              Start Learning Now
            </Button>
            <Link href={"/courses"}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-2"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
