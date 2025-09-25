import CallToActionSection from "@/components/root/CallToActionSection";
import CareerGrowthSection from "@/components/root/CareerGrowthSection";
import Footer from "@/components/root/Footer";
import HeroSection from "@/components/root/HeroSection";
import InteractiveLearningSteps from "@/components/root/InteractiveLearningSteps";
import Navigation from "@/components/root/Navigation";
import TopCoursesSection from "@/components/root/TopCoursesSection";
import UpcomingEventsSection from "@/components/root/UpcompingEventsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CareerGrowthSection />
      <TopCoursesSection />
      <UpcomingEventsSection />
      <InteractiveLearningSteps />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Home;
