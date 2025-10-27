"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ICourse, initialiseCourses } from "../slices/courses";
import { IEvent, initializeEvents } from "../slices/events";
import ReduxProvider from "./redux-provider";
import {
  Display,
  LessonProgress,
  PlatformSettings,
  User,
} from "@prisma/client";
import { initializeUser } from "../slices/user";
import { initializeDisplay } from "../slices/display";
import { initializeLessonProgress } from "../slices/lessons-progress";
import { initializePlatform } from "../slices/platform";

interface Props {
  children: ReactNode;
  courses: ICourse[] | null;
  events: IEvent[] | null;
  user: User | null;
  display: Display;
  lessonProgress: LessonProgress[];
  platform: PlatformSettings;
}

const ReduxProviderInitializer = ({
  children,
  courses,
  events,
  user,
  display,
  lessonProgress,
  platform,
}: Props) => {
  return (
    <ReduxProvider>
      <Initializer
        courses={courses}
        events={events}
        user={user}
        display={display}
        lessonProgress={lessonProgress}
        platform={platform}
      />
      {children}
    </ReduxProvider>
  );
};

export default ReduxProviderInitializer;

const Initializer = ({
  courses,
  events,
  user,
  display,
  lessonProgress,
  platform,
}: {
  courses: Props["courses"];
  events: Props["events"];
  user: Props["user"];
  display: Props["display"];
  lessonProgress: Props["lessonProgress"];
  platform: Props["platform"];
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (courses) {
      dispatch(initialiseCourses(courses));
    }
    if (events) {
      dispatch(initializeEvents(events));
    }
    if (user) {
      dispatch(initializeUser(user));
    }
    if (display) {
      dispatch(initializeDisplay(display));
    }
    if (lessonProgress) {
      dispatch(initializeLessonProgress(lessonProgress));
    }
    if (platform) {
      dispatch(initializePlatform(platform));
    }
  }, [courses, events, user, display, lessonProgress, platform]);

  return null;
};
