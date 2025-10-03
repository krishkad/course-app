"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ICourse, initialiseCourses } from "../slices/courses";
import { IEvent, initializeEvents } from "../slices/events";
import ReduxProvider from "./redux-provider";



interface Props {
  children: ReactNode;
  courses: ICourse[] | null;
  events: IEvent[] | null;
}

const ReduxProviderInitializer = ({ children, courses, events }: Props) => {
  return (
    <ReduxProvider>
      <Initializer courses={courses} events={events} />
      {children}
    </ReduxProvider>
  );
};

export default ReduxProviderInitializer;

const Initializer = ({
  courses,
  events,
}: {
  courses: Props["courses"];
  events: Props["events"];
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (courses) {
      dispatch(initialiseCourses(courses));
    }
    if (events) {
      dispatch(initializeEvents(events));
    }
  }, [courses, events]);

  return null;
};
