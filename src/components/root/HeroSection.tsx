import { Search, CheckCircle, Award, Users, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProfessionSearch } from "./SearchBox";
// import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      text: "Learn Anytime, Anywheree",
      gradient: "from-green-400 via-green-300 to-emerald-400", // fresh green
    },
    {
      icon: Award,
      text: "Globally Recognized Expertise.",
      gradient: "from-yellow-400 via-yellow-300 to-orange-400", // sunny yellow-orange
    },
    {
      icon: Users,
      text: "Taught by AI-Driven Professionals",
      gradient: "from-blue-400 via-sky-300 to-cyan-400", // cool blue-cyan
    },
    {
      icon: Zap,
      text: "Career focused learning",
      gradient: "from-pink-400 via-rose-300 to-fuchsia-400", // energetic pink-fuchsia
    },
    {
      icon: Clock,
      text: "Lifetime course access",
      gradient: "from-purple-400 via-violet-300 to-indigo-400", // calm purple-indigo
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={"/images/hero-image.png"}
          alt="Professional learning environment"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Unlock Your Future with AI – Grow Your Career, Not Just Your Skills
          </h1>
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Learn from Industry Experts
          </h2> */}
          <p className="text-xl md:text-2xl text-white  max-w-2xl mx-auto">
            Master practical AI applications in your industry.
          </p>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white mb-12 max-w-2xl mx-auto">
            Lead initiatives. Unlock promotions. Stay irreplaceable in the age
            of automation.
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

          {/* <div className="w-full max-w-xl mx-auto mb-16">
            <div className="flex items-center shadow-card rounded-full bg-background overflow-hidden focus-within:ring-1 focus-within:ring-primary transition">
              <div className="pl-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>

              <Input
                type="text"
                placeholder="What is your profession?"
                className="flex-1 border-none ring-0 focus-visible:ring-0 focus:outline-none focus:border-none bg-transparent px-4 py-3 text-base"
              />

              <Button
                type="submit"
                variant="ghost"
                className="rounded-none rounded-r-full bg-gradient-primary text-white hover:text-white hover:opacity-90 px-6 py-3 h-auto"
              >
                Search
              </Button>
            </div>
          </div> */}
          <ProfessionSearch />

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <div
                  className="flex h-full aspect-square flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:shadow-blue-500/50"
                  // whileHover={{ scale: 1.05, rotate: 2 }}
                  // whileTap={{ scale: 0.95 }}
                  // initial={{ opacity: 0, y: 20 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-400 rounded-xl mb-3",
                      benefit.gradient
                    )}
                  >
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-center text-white leading-snug">
                    {benefit.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg shadow-hero"
            >
              Start Your AI Journey
            </Button>
            <Link href={"/courses"} className="max-sm:w-full">
              <Button
                size="lg"
                variant="outline"
                className="max-sm:w-full px-8 py-4 text-lg border-2"
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
