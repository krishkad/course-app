"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NavigationMenuDemo } from "./NavigationMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const courseCategories = [
    "Business & Finance",
    "Technology & Programming",
    "Marketing & Sales",
    "Design & Creative",
    "Healthcare & Medicine",
    "Personal Development",
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <span className="text-sm font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-xl font-bold">LearnPro</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenuDemo />

          <a
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </a>
          <a
            href="#events"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Events
          </a>
          <a
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href={"/sign-in"}>
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full p-6"
            aria-describedby={undefined}
          >
            <div className="flex flex-col space-y-6">
              <SheetHeader className="p-0">
                {/* Mobile Logo */}
                <SheetTitle className="p-0">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                      <span className="text-sm font-bold text-primary-foreground">
                        L
                      </span>
                    </div>
                    <span className="text-xl font-bold">LearnPro</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Links */}
              <div className="flex flex-col space-y-4 mt-8">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    COURSES
                  </h3>
                  <div className="flex flex-col space-y-2 pl-2">
                    {courseCategories.map((category) => (
                      <a
                        key={category}
                        href="#"
                        className="text-sm hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="#pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#events"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </div>

              {/* Mobile Auth */}
              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button className="bg-gradient-primary hover:opacity-90">
                  Sign Up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
