import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { User } from "@prisma/client";
import { IPayment } from "@/redux/admin/slice/payment";
import { ICourse } from "@/redux/admin/slice/all-courses";
import { IEvent } from "@/redux/admin/slice/all-events";



/**
 * Export all students with course/event purchase info into Excel
 */
export function exportStudentsToExcel(
  students: User[],
  payments: IPayment[],
  courses: ICourse[],
  events: IEvent[]
) {
  const data = students
    .filter((student) => student.role !== "ADMIN")
    .map((student) => {
      // ✅ Filter successful payments for this student
      const successfulPayments = payments.filter(
        (p) => p.userId === student.id && p.status === "SUCCESS"
      );

      // ✅ Find purchased courses via courseId lookup
      const purchasedCourses = successfulPayments
        .flatMap((p) => p.purchases)
        .filter((pur) => pur.courseId)
        .map((pur) => {
          const course = courses.find((c) => c.id === pur.courseId);
          return course ? course.title : null;
        })
        .filter((name): name is string => Boolean(name));

      // ✅ Find purchased events via eventId lookup
      const purchasedEvents = successfulPayments
        .flatMap((p) => p.purchases)
        .filter((pur) => pur.eventId)
        .map((pur) => {
          const event = events.find((e) => e.id === pur.eventId);
          return event ? event.title : null;
        })
        .filter((name): name is string => Boolean(name));

      // ✅ Determine premium status
      const isPremium =
        purchasedCourses.length > 0 || purchasedEvents.length > 0;

      return {
        Name: `${student.fname} ${student.lname}`,
        Email: student.email,
        Phone: student.phoneNo,
        Profession: student.profession ?? "—",
        Role: student.role,
        Courses: purchasedCourses.length
          ? purchasedCourses.join(", ")
          : "None",
        Events: purchasedEvents.length
          ? purchasedEvents.join(", ")
          : "None",
        Status: isPremium ? "Premium" : "Free",
        Joined: new Date(student.createdAt).toLocaleString(),
      };
    });

  // ✅ Create worksheet and workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");

  // ✅ Generate Excel file
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // ✅ Save the file
  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `Students_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}
