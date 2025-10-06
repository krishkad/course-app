"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ICourse, initialiseCourses } from "../slices/courses";
import { IEvent, initializeEvents } from "../slices/events";
import ReduxProvider from "./redux-provider";
import { User } from "@prisma/client";
import { initializeUser } from "../slices/user";

interface Props {
  children: ReactNode;
  courses: ICourse[] | null;
  events: IEvent[] | null;
  user: User | null;
}

const ReduxProviderInitializer = ({
  children,
  courses,
  events,
  user,
}: Props) => {
  return (
    <ReduxProvider>
      <Initializer courses={courses} events={events} user={user} />
      {children}
    </ReduxProvider>
  );
};

export default ReduxProviderInitializer;

const Initializer = ({
  courses,
  events,
  user,
}: {
  courses: Props["courses"];
  events: Props["events"];
  user: Props["user"];
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
  }, [courses, events]);

  return null;
};
