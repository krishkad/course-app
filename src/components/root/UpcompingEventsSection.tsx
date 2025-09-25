import { Calendar, Clock, User, Users, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const UpcomingEventsSection = () => {
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
      case "Open":
        return "default";
      case "Limited":
        return "secondary";
      case "Filling Fast":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Upcoming{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join live sessions, workshops, and networking events to accelerate
            your learning
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={event.image}
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
                    {event.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={getStatusColor(event.status) as any}
                    className="shadow-sm"
                  >
                    {event.status}
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
                  {event.title}
                </h3>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      {event.date}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      {event.speaker}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      {event.attendees} registered
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
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center w-full">
          <div className="inline-flex w-full items-center justify-center p-8 bg-transparent rounded-2xl">
            <div className="text-center">
              <p className="text-4xl font-semibold mb-4">
                Don't miss out on future events
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-2 bg-gradient-primary text-white hover:bg-primary hover:text-white"
              >
                View Event Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
