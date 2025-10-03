import ReduxProviderInitializer from "@/redux/provider/redux-provider-initializer";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const { courses, events } = await getData();
  return (
    <div className="w-full">
      <ReduxProviderInitializer courses={courses} events={events}>
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

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      cache: "no-store",
    };

    // Fetch both APIs in parallel
    const [CoursesRes, eventsRes] = await Promise.all([
      fetch(coursesUrl, fetchOptions),
      fetch(eventsUrl, fetchOptions),
    ]);

    const [CoursesJson, eventsJson] = await Promise.all([
      CoursesRes.json(),
      eventsRes.json(),
    ]);

    // Check success status of both
    const coursesData = CoursesJson.success ? CoursesJson.data : [];
    const eventsData = eventsJson.success ? eventsJson.data : [];

    return {
      courses: coursesData,
      events: eventsData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      courses: [],
      events: [],
    };
  }
};
