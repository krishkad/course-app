"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/redux/store";
import { LogIn, Menu, UserIcon, UserRoundIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import AuthComponent from "../auth/AuthComponent";
import { NavigationMenuDemo } from "./NavigationMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const platform = useSelector((state: RootState) => state.platform.platform);
  const display = useSelector((state: RootState) => state.display.display);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">
                L
              </span>
            </div>
            <span className="text-xl font-bold">{platform.platformName}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenuDemo />

          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </Link>
          {display.view_events && (
            <Link
              href="/events"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Events
            </Link>
          )}
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthComponent
            signIn={
              <>
                <Link href={"/sign-in"}>
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            }
            signOut={
              <Link href={"/profile"}>
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="relative bg-primary/80 text-gray-100">
                    {/* {user.fname?.slice(0, 1).toUpperCase()}{user.lname?.slice(0,1).toUpperCase()} */}
                    <UserIcon className="w-8 h-8 shrink-0 fill-gray-100 absolute -bottom-[4px]" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            }
          />
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
            className="w-full h-full p-6"
            aria-describedby={undefined}
          >
            <div className="flex  h-full flex-col space-y-6">
              <SheetHeader className="p-0">
                {/* Mobile Logo */}
                <SheetTitle className="p-0">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                      <span className="text-sm font-bold text-primary-foreground">
                        L
                      </span>
                    </div>
                    <span className="text-xl font-bold">
                      {platform.platformName}
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Links */}
              <div className="w-full mt-24">
                <div className="flex flex-col h-full justify-center items-center space-y-8 px-8">
                  <Link
                    href="/courses"
                    className="text-xl font-medium text-stone hover:text-coral transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    COURSES
                  </Link>

                  <Link
                    href="/about"
                    className="text-xl font-medium text-stone hover:text-coral transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  {display.view_events && (
                    <Link
                      href="/events"
                      className="text-xl font-medium text-stone hover:text-coral transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Events
                    </Link>
                  )}
                  <Link
                    href="/contact"
                    className="text-xl font-medium text-stone hover:text-coral transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <AuthComponent
                    signIn={
                      <>
                        <Link href={"/sign-in"} className="w-full">
                          <Button
                            variant="ghost"
                            className="justify-star w-full"
                            size={"lg"}
                            onClick={() => setIsOpen(false)}
                          >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                          </Button>
                        </Link>
                        <Link href={"/sign-up"} className="w-full">
                          <Button
                            className="bg-gradient-primary hover:opacity-90 w-full"
                            onClick={() => setIsOpen(false)}
                            size={"lg"}
                          >
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    }
                    signOut={
                      <Link href={"/profile"}>
                        <Button
                          size={"sm"}
                          variant={"ghost"}
                          onClick={() => setIsOpen(false)}
                        >
                          <UserIcon className="inline-flex mr-1.5" />
                          Profile
                        </Button>
                      </Link>
                    }
                  />
                </div>

                {/* Mobile Auth */}
                <div className="flex flex-col space-y-3 pt-4 border-t"></div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;
