"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Topic {
  label: string;
  keyword: string;
  tag: "HOT" | "NEW" | "";
}

interface Topic {
  label: string;
  keyword: string;
  tag: "HOT" | "NEW" | "";
}

const topics: Topic[] = [
  { label: "EduBlink Education", keyword: "edublink education", tag: "HOT" },
  { label: "Distant Learning", keyword: "distant learning", tag: "" },
  { label: "University", keyword: "university", tag: "" },
  { label: "Online Academy", keyword: "online academy", tag: "HOT" },
  { label: "Modern Schooling", keyword: "modern schooling", tag: "" },
  { label: "Kitchen Coach", keyword: "kitchen coach", tag: "" },
  { label: "Yoga Instructor", keyword: "yoga instructor", tag: "" },
  { label: "Kindergarten", keyword: "kindergarten", tag: "" },
  { label: "Language Academy", keyword: "language academy", tag: "" },
  { label: "Remote Training", keyword: "remote training", tag: "" },

  { label: "Business Coach", keyword: "business coach", tag: "" },
  { label: "Motivation", keyword: "motivation", tag: "" },
  { label: "Programming", keyword: "programming", tag: "" },
  { label: "Online Art", keyword: "online art", tag: "" },
  { label: "Sales Coach", keyword: "sales coach", tag: "NEW" },
  { label: "Quran Learning", keyword: "quran learning", tag: "NEW" },
  { label: "Gym Training", keyword: "gym training", tag: "NEW" },
  { label: "Photography", keyword: "photography", tag: "NEW" },
  { label: "Health Coach", keyword: "health coach", tag: "NEW" },
  { label: "Digital Marketing", keyword: "digital marketing", tag: "NEW" },
];

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="!bg-transparent hover:!bg-transparent hover:!text-primary !focus:text-primary focus:bg-transparent focus-visible:bg-transparent pr-0">
            Courses
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {topics.map((component) => (
                <ListItem
                  key={component.label}
                  title={component.label}
                  href={component.keyword}
                  tag={component.tag}
                ></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  tag,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; tag: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        asChild
        className="bg-transparent hover:bg-transparent "
      >
        <Link href={href}>
          <div className="flex items-center justify-start gap-2 text-sm leading-none font-medium hover:scale-103 transition-all hover:translate-x-[8px]">
            {title}

            {tag && (
              <span
                className={cn(
                  "rounded-xl px-2 py-1 text-white text-[8px]",
                  tag === "NEW" ? "bg-green-600" : "bg-red-600"
                )}
              >
                {tag}
              </span>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
