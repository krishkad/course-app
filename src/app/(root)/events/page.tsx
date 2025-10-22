"use client";

import {
  Clock,
  Users,
  Star,
  ArrowRight,
  Filter,
  Play,
  User,
  Calendar,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navigation from "@/components/root/Navigation";
import Link from "next/link";
import Footer from "@/components/root/Footer";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { format } from "date-fns";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const redux_events = useSelector((state: RootState) => state.events.events);

  const events = [
    {
      title: "AI in Business: Practical Applications",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      type: "Webinar",
      speaker: "Dr. Rachel Martinez",
      description:
        "Discover how AI is transforming business operations and customer experience",
      attendees: 1250,
      status: "Open",
      image: "/images/event-ai-business.jpeg",
    },
    {
      title: "Career Transition Workshop",
      date: "March 22, 2024",
      time: "1:00 PM EST",
      type: "Workshop",
      speaker: "James Anderson",
      description:
        "Navigate career changes successfully with proven strategies and frameworks",
      attendees: 450,
      status: "Limited",
      image: "/images/event-career-transition.jpeg",
    },
    {
      title: "Digital Marketing Trends 2024",
      date: "March 29, 2024",
      time: "3:30 PM EST",
      type: "Masterclass",
      speaker: "Sophie Chang",
      description:
        "Stay ahead of the curve with the latest digital marketing strategies",
      attendees: 800,
      status: "Open",
      image: "/images/event-marketing-trends.jpeg",
    },
    {
      title: "Leadership in Remote Teams",
      date: "April 5, 2024",
      time: "12:00 PM EST",
      type: "Panel Discussion",
      speaker: "Multiple Experts",
      description:
        "Learn effective leadership techniques for managing distributed teams",
      attendees: 650,
      status: "Filling Fast",
      image: "/images/event-ai-business.jpeg",
    },
    {
      title: "Freelancing Success Strategies",
      date: "April 12, 2024",
      time: "4:00 PM EST",
      type: "Workshop",
      speaker: "Maria Santos",
      description:
        "Build a thriving freelance business with practical tips and real examples",
      attendees: 350,
      status: "Open",
      image: "/images/event-career-transition.jpeg",
    },
    {
      title: "Tech Industry Networking Event",
      date: "April 19, 2024",
      time: "6:00 PM EST",
      type: "Networking",
      speaker: "Various Industry Leaders",
      description:
        "Connect with tech professionals and explore new opportunities",
      attendees: 200,
      status: "Limited",
      image: "/images/event-marketing-trends.jpeg",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcomming":
        return "default";
      case "k":
        return "secondary";
      case "today":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Filter courses based on selected filters
  // const filteredCourses = events.filter((course) => {
  //   if (selectedCategory !== "all" && course.category !== selectedCategory)
  //     return false;
  //   if (selectedDuration !== "all") {
  //     if (selectedDuration === "short" && course.durationValue > 6)
  //       return false;
  //     if (
  //       selectedDuration === "medium" &&
  //       (course.durationValue <= 6 || course.durationValue > 10)
  //     )
  //       return false;
  //     if (selectedDuration === "long" && course.durationValue <= 10)
  //       return false;
  //   }
  //   if (selectedPrice !== "all") {
  //     if (selectedPrice === "free" && course.priceValue > 0) return false;
  //     if (
  //       selectedPrice === "low" &&
  //       (course.priceValue <= 0 || course.priceValue > 100)
  //     )
  //       return false;
  //     if (
  //       selectedPrice === "medium" &&
  //       (course.priceValue <= 100 || course.priceValue > 150)
  //     )
  //       return false;
  //     if (selectedPrice === "high" && course.priceValue <= 150) return false;
  //   }
  //   if (selectedRating !== "all") {
  //     if (selectedRating === "4+" && course.rating < 4.0) return false;
  //     if (selectedRating === "4.5+" && course.rating < 4.5) return false;
  //     if (selectedRating === "4.8+" && course.rating < 4.8) return false;
  //   }
  //   return true;
  // });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary pb-3 bg-clip-text text-transparent mb-6">
                Upcoming Events
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join our community of learners and professionals at exclusive
                events, workshops, and seminars designed to accelerate your
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="px-4 pb-12">
          <div className="container mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-elegant border border-border/50">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search events, speakers, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {/* Showing {filteredCourses.length} of {courses.length} courses */}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {redux_events.map((event, index) => (
                <Link href={`/events/${event.slug}`} key={index}>
                  <div className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20">
                    {/* Event Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={event?.thumbnailUrl as string}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                      {/* Event Badges */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm text-primary border-none shadow-sm"
                        >
                          {event?.type ?? event.type}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          variant={
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            getStatusColor(event?.status ?? event.status) as any
                          }
                          className="shadow-sm"
                        >
                          {event?.status ?? event.status}
                        </Badge>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
                          <Play className="h-6 w-6 text-primary ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {event?.title ?? event.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-2">
                        {event?.description ?? event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center space-x-3 text-sm">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-foreground font-medium">
                            {format(event.date, "MMMM dd yyyy")}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground">
                            {event.time}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground">
                            {event?.organizer_name}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-sm">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-muted-foreground">
                            {event?.registered} registered
                          </span>
                        </div>
                      </div>

                      {/* Event Footer */}
                      <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-glow group/btn">
                        Register Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllCourses;
