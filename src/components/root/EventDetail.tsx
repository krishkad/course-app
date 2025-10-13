"use client";

import CourseDetail from "@/components/root/CourseDetails";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/root/Navigation";
import Footer from "@/components/root/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IEvent } from "@/redux/slices/events";
import RegisterModal from "./RegisterModal";
import AuthComponent from "../auth/AuthComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EventDetail = ({ event_slug }: { event_slug: string }) => {
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const events = useSelector((state: RootState) => state.events.events);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const pathname = usePathname();

  const eventData = {
    id: "live-ai-business-transformation",
    title: "AI in Business Transformation - Live Workshop",
    description:
      "Join us for an exclusive live workshop where industry experts discuss how AI is revolutionizing business operations, decision-making, and customer experiences. Learn practical strategies to implement AI solutions in your organization and stay ahead of the competition.",
    date: "March 25, 2024",
    time: "2:00 PM EST",
    duration: "2 hours",
    videoId: "dQw4w9WgXcQ", // YouTube video ID
    isLive: true,
    registeredUsers: 1247,
    maxCapacity: 2000,
    ctaText: "Join Live Workshop",
    ctaUrl: "https://youtube.com/live/dQw4w9WgXcQ",
    tags: ["AI", "Business", "Live Workshop", "Free"],
  };

  const fetch_course = async () => {
    try {
      const event = events.filter((even) => even.slug === event_slug);
      const eventId = event[0].id;
      const response = await fetch(`/api/event/get-event?eventId=${eventId}`, {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log({ error: res.message });
        return;
      }
      console.log({ event: res.event });

      setEvent(res.event);
      console.log({ current_event: res.event });
    } catch (error) {
      console.log("error whle fetching course: ", error);
    }
  };

  useEffect(() => {
    fetch_course();
  }, [event_slug, events]);

  if (!event) {
    return <>Loading...</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-0">
        {/* Video Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* YouTube Embed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
                <iframe
                  src={`https://www.youtube.com/embed/${eventData.videoId}?autoplay=0&modestbranding=1&rel=0`}
                  title={eventData.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {event.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.keywords?.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Event Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">
                        {eventData.registeredUsers.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Registered
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">
                        {eventData.duration}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration
                      </div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Youtube className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">Free</div>
                      <div className="text-sm text-muted-foreground">
                        Access
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Join CTA */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                    <h3 className="text-xl font-bold mb-4">Join the Event</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span>
                          {eventData.registeredUsers.toLocaleString()} /{" "}
                          {eventData.maxCapacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (eventData.registeredUsers /
                                eventData.maxCapacity) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <AuthComponent
                        signOut={
                          <>
                            <Button
                              className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
                              onClick={() => setRegisterModalOpen(true)}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {eventData.ctaText}
                            </Button>
                          </>
                        }
                        signIn={
                          <>
                            <Link href={`/sign-in?redirect=${pathname}`}>
                              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-glow">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {eventData.ctaText}
                              </Button>
                            </Link>
                          </>
                        }
                      />
                      {/* <Button
                        className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
                        onClick={() => setRegisterModalOpen(true)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {eventData.ctaText}
                      </Button> */}
                    </div>
                  </div>

                  {/* Event Schedule */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                    <h3 className="text-xl font-bold mb-4">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{eventData.date}</div>
                          <div className="text-sm text-muted-foreground">
                            Date
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{eventData.time}</div>
                          <div className="text-sm text-muted-foreground">
                            Start Time
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Youtube className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">YouTube Live</div>
                          <div className="text-sm text-muted-foreground">
                            Platform
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share */}
                  <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                    <h3 className="text-xl font-bold mb-4">Share Event</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share on Social
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <RegisterModal
        eventId={event.id}
        registerModalOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
      />
      <Footer />
    </div>
  );
};

export default EventDetail;
