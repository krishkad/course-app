import ReduxProviderInitializer from "@/redux/provider/redux-provider-initializer";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const { courses, events, users } = await getData();
  return (
    <div className="w-full">
      <ReduxProviderInitializer courses={courses} events={events} user={users}>
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

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: cookieString,
      },
    };

    // Fetch both APIs in parallel
    const [CoursesRes, eventsRes, userRes] = await Promise.all([
      fetch(coursesUrl, fetchOptions),
      fetch(eventsUrl, fetchOptions),
      fetch(userUrl, fetchOptions),
    ]);

    const [CoursesJson, eventsJson, userJson] = await Promise.all([
      CoursesRes.json(),
      eventsRes.json(),
      userRes.json(),
    ]);

    console.log({ userJson });
    // Check success status of both
    const coursesData = CoursesJson.success ? CoursesJson.data : [];
    const eventsData = eventsJson.success ? eventsJson.data : [];
    const userData = userJson.success ? userJson.data : [];

    return {
      courses: coursesData,
      events: eventsData,
      users: userData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      courses: [],
      events: [],
      user: {} as User,
    };
  }
};
