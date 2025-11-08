import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/20 rounded-lg rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Don&apos;t Let Your Career Fall Behind
          </h2>

          {/* Supporting Text */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            AI is transforming every industry right now. The professionals who
            master it today will lead tomorrow. Those who wait will be left
            behind.
          </p>

          {/* Testimonial Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-12 border border-white/20">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-primary-foreground/95 italic mb-4">
              &quot;LearnPro transformed my career. Within 6 months of
              completing their courses, I landed my dream job with a 40% salary
              increase.&quot;
            </blockquote>
            <cite className="text-primary-foreground/80 font-medium">
              - Sarah Chen, Software Engineer at TechCorp
            </cite>
          </div>

          {/* Success Metrics */}
          <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                50K+
              </div>
              <div className="text-primary-foreground/80">
                Successful Graduates
              </div>
            </div>
            {/* <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                95%
              </div>
              <div className="text-primary-foreground/80">
                Job Placement Rate
              </div>
            </div> */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                4.9/5
              </div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={"/courses"}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-hero"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 bg-transparent border-white text-white hover:text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Join for Free
              </Button>
            </Link>
          </div>

          {/* Additional Incentive */}
          {/* <p className="text-primary-foreground/80 mt-6 text-sm">
            💡 No credit card required • 7-day free trial • Cancel anytime
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
