"use client";
import { RootState } from "@/redux/store";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Footer = () => {
  const year = new Date().getFullYear();
  const platform = useSelector((state: RootState) => state.platform.platform);
  const display = useSelector((state: RootState) => state.display.display);

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold">
              L
            </div>
            <span className="text-lg font-semibold">
              {platform.platformName}
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Empowering everyone to learn, create, and innovate with AI.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/courses"
            className="hover:text-primary transition-colors"
          >
            Courses
          </Link>
          {display.view_events && (
            <Link
              href="/events"
              className="hover:text-primary transition-colors"
            >
              Events
            </Link>
          )}
          <Link
            href="/refund-policy"
            className="hover:text-primary transition-colors"
          >
            Refund
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-primary transition-colors"
          >
            Disclaimer
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Social Icons & Contact Info */}
        <div className="flex flex-col  items-start md:items-end gap-3">
          <div className="flex space-x-4 text-muted-foreground">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Icon
                key={i}
                className="h-5 w-5 cursor-pointer hover:text-primary transition-colors"
              />
            ))}
          </div>
          <div className="space-y-1 text-xs text-muted-foreground text-left md:text-right">
            <div className="flex items-center space-x-2">
              <Mail className="h-3.5 w-3.5" />
              <span>support@learnpro.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-3.5 w-3.5" />
              <span>1-800-LEARN-PRO</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-left py-4 text-xs text-muted-foreground px-4 md:text-center">
        © {year} {platform.platformName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
