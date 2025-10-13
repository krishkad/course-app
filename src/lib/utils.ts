import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify } from "jose";
import { CustomJWTPayload } from "@/types/types";
import { Course, Lesson, LessonProgress, Payment, User } from "@prisma/client";
import { IPayment } from "@/redux/admin/slice/payment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(sentence: string): string {
  return sentence
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters (keep letters, numbers, spaces, hyphens)
    .replace(/\s+/g, "-") // Replace spaces (and multiple spaces) with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function decodeCustomJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as CustomJWTPayload;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export function decodeJwt(token: string) {
  if (!token) {
    return { header: "", payload: "", signature: "" };
  }
  const [headerB64, payloadB64, signature] = token.split(".");

  if (!headerB64 || !payloadB64) {
    return { header: "", payload: "", signature: "" };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const base64UrlDecode = (b64Url: string): any => {
    const base64 = b64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = atob(padded);
    return JSON.parse(decoded);
  };

  try {
    const header = base64UrlDecode(headerB64);
    const payload = base64UrlDecode(payloadB64);

    return {
      header,
      payload,
      signature,
    };
  } catch (error) {
    return { header: "", payload: "", signature: "" };
  }
}

export function displayRazorpayAmount(amountInPaisa: number) {
  // Check if the input is a valid number
  if (isNaN(amountInPaisa) || amountInPaisa === null) {
    return 0;
  }

  // Convert paisa to INR (divide by 100) and format to 2 decimal places
  const amountInINR = (amountInPaisa / 100).toFixed(2);

  // Return the amount as a float
  return parseFloat(amountInINR);
}

export function sortByIdAscending(arr: Lesson[]) {
  return arr.sort((a, b) => a.order - b.order);
}

export function getTopPerformingCourse({
  lessons,
  lessonsProgress,
  courses,
  payments,
}: {
  lessons: Lesson[];
  lessonsProgress: LessonProgress[];
  courses: Course[];
  payments: IPayment[];
}) {
  // Map courseId -> lessons
  const lessonsByCourse: Record<string, Lesson[]> = {};
  for (const lesson of lessons) {
    if (!lessonsByCourse[lesson.courseId]) {
      lessonsByCourse[lesson.courseId] = [];
    }
    lessonsByCourse[lesson.courseId].push(lesson);
  }

  // Map courseId -> set of userIds who purchased
  const studentsPerCourse: Record<string, Set<string>> = {};
  // Map courseId -> revenue
  const revenuePerCourse: Record<string, number> = {};

  for (const payment of payments) {
    for (const purchase of payment.purchases) {
      const courseId = purchase.courseId;

      if (!studentsPerCourse[courseId]) {
        studentsPerCourse[courseId] = new Set();
      }
      studentsPerCourse[courseId].add(payment.userId);

      if (!revenuePerCourse[courseId]) {
        revenuePerCourse[courseId] = 0;
      }
      revenuePerCourse[courseId] += payment.amount;
    }
  }

  // Compute average completion per course
  const completionPerCourse: Record<string, number> = {};

  for (const course of courses) {
    const courseId = course.id;
    const courseLessons = lessonsByCourse[courseId] || [];
    const lessonIds = new Set(courseLessons.map((lesson) => lesson.id));
    const totalLessons = courseLessons.length;

    if (totalLessons === 0) {
      completionPerCourse[courseId] = 0;
      continue;
    }

    const purchasers = studentsPerCourse[courseId];
    if (!purchasers || purchasers.size === 0) {
      completionPerCourse[courseId] = 0;
      continue;
    }

    // Filter lessonProgress to only include progress for lessons in this course
    const relevantProgress = lessonsProgress.filter(
      (lp) => lessonIds.has(lp.lessonId) && purchasers.has(lp.userId)
    );

    // Map of userId -> count of completed lessons
    const userProgress: Record<string, number> = {};
    for (const lp of relevantProgress) {
      if (!userProgress[lp.userId]) {
        userProgress[lp.userId] = 0;
      }
      userProgress[lp.userId]++;
    }

    let totalCompletion = 0;
    let userCount = 0;

    // Only consider users who purchased the course
    for (const userId of purchasers) {
      const completedLessons = userProgress[userId] || 0;
      const percent = (completedLessons / totalLessons) * 100;
      totalCompletion += percent;
      userCount++;
    }

    const avgCompletion = userCount > 0 ? totalCompletion / userCount : 0;
    completionPerCourse[courseId] = Math.round(avgCompletion);
  }

  // Final result
  const topCourses = courses.map((course) => {
    const students = studentsPerCourse[course.id]?.size || 0;
    const revenue = revenuePerCourse[course.id] || 0;
    const completion = completionPerCourse[course.id] || 0;

    return {
      id: course.id,
      title: course.title,
      students,
      revenue,
      completion, // average completion percent
    };
  });

  // Optional: sort by revenue
  topCourses.sort((a, b) => b.revenue - a.revenue);

  return topCourses;
}

export const getPaidStudentsCount = (
  students: User[],
  payments: IPayment[]
): number => {
  if (!students || !payments) {
    return 0;
  }

  const payment_set = new Set(payments.map((payment) => payment.userId));

  const paidStudentsCount = students.filter((student) =>
    payment_set.has(student.id)
  ).length;

  return paidStudentsCount;
};
