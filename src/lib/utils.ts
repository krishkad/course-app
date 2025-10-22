import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify } from "jose";
import { ActivityItem, CustomJWTPayload } from "@/types/types";
import {
  Course,
  Lesson,
  LessonProgress,
  Payment,
  Rating,
  User,
} from "@prisma/client";
import { IPayment } from "@/redux/admin/slice/payment";
import { ICourse } from "@/redux/slices/courses";
import { IEvent } from "@/redux/slices/events";

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
      const courseId = purchase.courseId!;

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

export const getRating = (ratings: Rating[]): number => {
  if (ratings.length <= 0) return 0;
  const rated_stars = ratings.reduce(
    (total, rating) => total + rating.rating,
    0
  );
  const total_stars = ratings.length;
  const avg = rated_stars / total_stars;

  return avg;
};

const getTimeAgo = (createdAt: string | Date): string => {
  const now = new Date();
  const past = new Date(createdAt);
  const diffMs = now.getTime() - past.getTime();

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

export const generateRecentActivity = (
  payments: IPayment[],
  users: User[],
  courses: ICourse[],
  events: IEvent[]
): ActivityItem[] => {
  return [...payments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) // newest first
    .map((payment) => {
      const user = users.find((u) => u.id === payment.userId);
      const course = courses.find(
        (c) => c.id === payment.purchases[0].courseId
      );
      const event = events.find((c) => c.id === payment.purchases[0].eventId);

      return {
        id: payment.id,
        type: event?.title ? "enrollment" : "purchase",
        user: user?.fname ?? "Unknown User",
        course: course?.title
          ? course?.title
          : event?.title
          ? event.title
          : "Unknown Course",
        time: getTimeAgo(payment.createdAt),
        avatar: "/api/placeholder/32/32",
      };
    });
};

export const getUserGrowthRate = (users: User[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentCount = 0;
  let lastCount = 0;

  for (const user of users) {
    const createdDate = new Date(user.createdAt);
    const userMonth = createdDate.getMonth();
    const userYear = createdDate.getFullYear();

    if (userYear === currentYear && userMonth === currentMonth) {
      currentCount++;
    } else if (userYear === lastMonthYear && userMonth === lastMonth) {
      lastCount++;
    }
  }

  if (lastCount === 0) {
    return currentCount > 0 ? 100 : 0; // Avoid divide-by-zero
  }

  const growth = ((currentCount - lastCount) / lastCount) * 100;
  return growth;
};
