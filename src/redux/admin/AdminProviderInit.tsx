"use client";

import { User } from "@prisma/client";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminReduxProvider from "./AdminProvider";
import { ICourse, initializeAllCourses } from "./slice/all-courses";
import { IEvent, initialize_all_events } from "./slice/all-events";
import { initialize_all_students } from "./slice/all-students";
import { initializePayments, IPayment } from "./slice/payment";

interface Props {
  children: ReactNode;
  students: User[];
  all_courses: ICourse[];
  events: IEvent[];
  payments: IPayment[];
}

const AdminProviderInit = ({
  children,
  students,
  all_courses,
  events,
  payments,
}: Props) => {
  return (
    <AdminReduxProvider>
      <Initializer
        students={students}
        all_courses={all_courses}
        events={events}
        payments={payments}
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
}: {
  students: Props["students"];
  all_courses: Props["all_courses"];
  events: Props["events"];
  payments: Props["payments"];
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (students || all_courses || events || payments) {
      dispatch(initialize_all_students(students));
      dispatch(initializeAllCourses(all_courses));
      dispatch(initialize_all_events(events));
      dispatch(initializePayments(payments));
      console.log({ all_courses });
      console.log({ payments });
    }
  }, [students, all_courses, events, payments]);

  return null;
};
