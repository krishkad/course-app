"use client";

import { Calendar, Clock, User, Users, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { format } from "date-fns";

const UpcomingEventsSection = () => {
  const events = useSelector((state: RootState) => state.events.events);


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

  useEffect(() => {
    console.log({ events });
  }, [events]);

  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
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
            <Link href={`/events/${event.slug}`} key={index}>
              <div
                className="group bg-background rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-border/50 hover:border-primary/20"
              >
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
                        {format(event.date, "h:mm a")}
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

        {/* Bottom CTA */}
        <div className="text-center w-full">
          <div className="inline-flex w-full items-center justify-center p-8 bg-transparent rounded-2xl">
            <div className="text-center">
              <p className="text-4xl font-semibold mb-4">
                Don&apos;t miss out on future events
              </p>
              <Link href={"/events"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 bg-gradient-primary text-white hover:bg-primary hover:text-white"
                >
                  View Event Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
