"use client";

import { Display, Lesson, LessonProgress, User } from "@prisma/client";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminReduxProvider from "./AdminProvider";
import { ICourse, initializeAllCourses } from "./slice/all-courses";
import { IEvent, initialize_all_events } from "./slice/all-events";
import { initialize_all_students } from "./slice/all-students";
import { initialize_display } from "./slice/display";
import { initializePayments, IPayment } from "./slice/payment";
import { initialize_all_lesson_progress } from "./slice/all-lesson-progress";
import { initialize_all_lessons } from "./slice/all-lessons";

interface Props {
  children: ReactNode;
  students: User[];
  all_courses: ICourse[];
  events: IEvent[];
  payments: IPayment[];
  display: Display;
  lessonProgress: LessonProgress[];
  lessons: Lesson[];
}

const AdminProviderInit = ({
  children,
  students,
  all_courses,
  events,
  payments,
  display,
  lessonProgress,
  lessons,
}: Props) => {
  return (
    <AdminReduxProvider>
      <Initializer
        students={students}
        all_courses={all_courses}
        events={events}
        payments={payments}
        display={display}
        lessonProgress={lessonProgress}
        lessons={lessons}
      />
      {children}
    </AdminReduxProvider>
  );
};

export default AdminProviderInit;

const Initializer = ({
  students,
  all_courses,
  events,
  payments,
  display,
  lessonProgress,
  lessons,
}: {
  students: Props["students"];
  all_courses: Props["all_courses"];
  events: Props["events"];
  payments: Props["payments"];
  display: Props["display"];
  lessonProgress: Props["lessonProgress"];
  lessons: Props["lessons"];
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      students ||
      all_courses ||
      events ||
      payments ||
      display ||
      lessonProgress ||
      lessons
    ) {
      dispatch(initialize_all_students(students));
      dispatch(initializeAllCourses(all_courses));
      dispatch(initialize_all_events(events));
      dispatch(initializePayments(payments));
      dispatch(initialize_display(display));
      dispatch(initialize_all_lesson_progress(lessonProgress));
      dispatch(initialize_all_lessons(lessons));
      console.log({ lessonProgress });
    }
  }, [students, all_courses, events, payments, display, lessonProgress]);

  return null;
};
