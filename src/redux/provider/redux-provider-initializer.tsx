"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ICourse, initialiseCourses } from "../slices/courses";
import { IEvent, initializeEvents } from "../slices/events";
import ReduxProvider from "./redux-provider";
import { Display, LessonProgress, User } from "@prisma/client";
import { initializeUser } from "../slices/user";
import { initializeDisplay } from "../slices/display";
import { initializeLessonProgress } from "../slices/lessons-progress";

interface Props {
  children: ReactNode;
  courses: ICourse[] | null;
  events: IEvent[] | null;
  user: User | null;
  display: Display;
  lessonProgress: LessonProgress[]
}

const ReduxProviderInitializer = ({
  children,
  courses,
  events,
  user,
  display,
  lessonProgress
}: Props) => {
  return (
    <ReduxProvider>
      <Initializer
        courses={courses}
        events={events}
        user={user}
        display={display}
        lessonProgress={lessonProgress}
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
  lessonProgress
}: {
  courses: Props["courses"];
  events: Props["events"];
  user: Props["user"];
  display: Props["display"];
  lessonProgress:Props["lessonProgress"]
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
  }, [courses, events, user, display, lessonProgress]);

  return null;
};
