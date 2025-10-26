import ReduxProviderInitializer from "@/redux/provider/redux-provider-initializer";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

export const dynamic = "force-dynamic"; // Add this to force dynamic rendering

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const { courses, events, users, display, lessonProgress } = await getData();
  return (
    <div className="w-full">
      <ReduxProviderInitializer
        courses={courses}
        events={events}
        user={users}
        display={display}
        lessonProgress={lessonProgress}
      >
        <main className="w-full">{children}</main>
      </ReduxProviderInitializer>
    </div>
  );
};

export default RootLayout;

const getData = async () => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // Define API URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const coursesUrl = `${baseUrl}/api/course/get-all`;
    const eventsUrl = `${baseUrl}/api/event/get-all`;
    const userUrl = `${baseUrl}/api/user/get-user`;
    const displayUrl = `${baseUrl}/api/display/get`;
    const lessonProgressUrl = `${baseUrl}/api/lesson-progress/get-all`;

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieString,
      },
    };

    // Fetch both APIs in parallel
    const [CoursesRes, eventsRes, userRes, displayRes, lessonProgressRes] =
      await Promise.all([
        fetch(coursesUrl, fetchOptions),
        fetch(eventsUrl, fetchOptions),
        fetch(userUrl, fetchOptions),
        fetch(displayUrl, fetchOptions),
        fetch(lessonProgressUrl, fetchOptions),
      ]);

    const [CoursesJson, eventsJson, userJson, displayJson, lessonProgressJson] =
      await Promise.all([
        CoursesRes.json(),
        eventsRes.json(),
        userRes.json(),
        displayRes.json(),
        lessonProgressRes.json(),
      ]);

    // Check success status of both
    const displayData = displayJson.success ? displayJson.data : {};
    const coursesData = displayData.view_courses
      ? CoursesJson.success
        ? CoursesJson.data
        : []
      : [];
    const lessonProgressData = displayData.view_courses
      ? lessonProgressJson.success
        ? lessonProgressJson.data
        : []
      : [];
    const eventsData = displayData.view_events
      ? eventsJson.success
        ? eventsJson.data
        : []
      : [];
    const userData = userJson.success ? userJson.data : {};

    console.log({ courses: coursesData });

    return {
      courses: coursesData,
      events: eventsData,
      users: userData,
      display: displayData,
      lessonProgress: lessonProgressData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      courses: [],
      events: [],
      user: {} as User,
      display: {},
      lessonProgress: [],
    };
  }
};
