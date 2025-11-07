import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { User } from "@prisma/client";
import { IPayment } from "@/redux/admin/slice/payment";
import { ICourse } from "@/redux/admin/slice/all-courses";
import { IEvent } from "@/redux/admin/slice/all-events";
import { displayRazorpayAmount } from "./utils";



/**
 * Export transactions with user, Razorpay, and purchase details to Excel
 * Includes colored status cells.
 */
export function exportTransactionsToExcel(
  payments: IPayment[],
  students: User[],
  courses: ICourse[],
  events: IEvent[]
) {
  const data = payments.map((payment) => {
    const student = students.find((s) => s.id === payment.userId);

    // Collect purchased course titles
    const courseNames = payment.purchases
      .filter((p) => p.courseId)
      .map((p) => {
        const course = courses.find((c) => c.id === p.courseId);
        return course ? course.title : null;
      })
      .filter((title): title is string => Boolean(title));

    // Collect purchased event titles
    const eventNames = payment.purchases
      .filter((p) => p.eventId)
      .map((p) => {
        const event = events.find((e) => e.id === p.eventId);
        return event ? event.title : null;
      })
      .filter((title): title is string => Boolean(title));

    return {
      "Transaction ID": payment.id,
      "Razorpay Order ID": payment.razorpay_order_id ?? "—",
      "Razorpay Payment ID": payment.razorpay_payment_id ?? "—",
      "Razorpay Signature": payment.razorpay_signature ?? "—",
      Provider: payment.provider,
      Status: payment.status,
      "Amount (USD)": displayRazorpayAmount(payment.amount),
      Currency: payment.currency,
      "Payment Date": new Date(payment.createdAt).toLocaleString(),

      "Student Name": student
        ? `${student.fname ?? ""} ${student.lname ?? ""}`.trim()
        : "Unknown",
      "Student Email": student?.email ?? "—",
      "Phone Number": student?.phoneNo ?? "—",
      Role: student?.role ?? "USER",
      Profession: student?.profession ?? "—",

      Courses: courseNames.length ? courseNames.join(", ") : "None",
      Events: eventNames.length ? eventNames.join(", ") : "None",
    };
  });

  // Create worksheet and workbook
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transactions");

  // Determine the column index for the "Status" column
  const statusColIndex =
    Object.keys(data[0] || {}).findIndex((key) => key === "Status") + 1;

  // Apply color styles to Status cells
  data.forEach((_, rowIdx) => {
    const cellRef = XLSX.utils.encode_cell({ r: rowIdx + 1, c: statusColIndex - 1 }); // +1 to skip header row
    const cell = ws[cellRef];
    if (!cell) return;

    let fillColor = "FFFFFF"; // default white
    const status = String(cell.v).toUpperCase();

    if (status === "SUCCESS") fillColor = "C6EFCE"; // light green
    else if (status === "FAILED") fillColor = "FFC7CE"; // light red
    else if (status === "PENDING") fillColor = "FFEB9C"; // light yellow

    cell.s = {
      fill: {
        patternType: "solid",
        fgColor: { rgb: fillColor },
      },
      font: { bold: true },
    };
  });

  // NOTE: XLSX-style formatting only applies if the reader supports cell styles.
  // Some basic Excel readers (like Google Sheets) might not render styles.

  // Write and save Excel
  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `Transactions_${new Date().toISOString().split("T")[0]}.xlsx`
  );
}
