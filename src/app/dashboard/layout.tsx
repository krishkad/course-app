import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminProviderInit from "@/redux/admin/AdminProviderInit";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const {
    platform,
    students,
    courses,
    events,
    payments,
    display,
    lessonProgress,
    lessons,
  } = await getData();
  return (
    <AdminProviderInit
      platform={platform}
      students={students}
      all_courses={courses}
      events={events}
      payments={payments}
      display={display}
      lessonProgress={lessonProgress}
      lessons={lessons}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="w-full overflow-hidden">
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-secondary">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AdminProviderInit>
  );
};

export default DashboardLayout;

const getData = async () => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    // Define API URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const platformUrl = `${baseUrl}/api/platform/get`;
    const studentsUrl = `${baseUrl}/api/user/get-all`;
    const coursesUrl = `${baseUrl}/api/course/get-all-admin`;
    const eventsUrl = `${baseUrl}/api/event/get-all-admin`;
    const paymentsUrl = `${baseUrl}/api/payment/get-all`;
    const displayUrl = `${baseUrl}/api/display/get`;
    const lessonProgressUrl = `${baseUrl}/api/lesson-progress/get-all-admin`;
    const lessonsUrl = `${baseUrl}/api/lesson/get-all`;

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    };

    // Fetch both APIs in parallel
    const [
      platformRes,
      studentsRes,
      coursesRes,
      eventsRes,
      paymentRes,
      displayRes,
      lessonProgressRes,
      lessonsRes,
    ] = await Promise.all([
      fetch(platformUrl, fetchOptions),
      fetch(studentsUrl, fetchOptions),
      fetch(coursesUrl, fetchOptions),
      fetch(eventsUrl, fetchOptions),
      fetch(paymentsUrl, fetchOptions),
      fetch(displayUrl, fetchOptions),
      fetch(lessonProgressUrl, fetchOptions),
      fetch(lessonsUrl, fetchOptions),
    ]);

    const [
      platformJson,
      studentsJson,
      coursesJson,
      eventsJson,
      paymentsJson,
      displayJson,
      lessonProgressJson,
      lessonsJson,
    ] = await Promise.all([
      platformRes.json(),
      studentsRes.json(),
      coursesRes.json(),
      eventsRes.json(),
      paymentRes.json(),
      displayRes.json(),
      lessonProgressRes.json(),
      lessonsRes.json(),
    ]);

    console.log({ displayJson });

    // Check success status of both
    const platformData = platformJson.success ? platformJson.data : [];
    const studentsData = studentsJson.success ? studentsJson.data : [];
    const coursesData = coursesJson.success ? coursesJson.data : [];
    const eventsData = eventsJson.success ? eventsJson.data : [];
    const paymentsData = paymentsJson.success ? paymentsJson.data : [];
    const displayData = displayJson.success ? displayJson.data : {};
    const lessonProgressData = lessonProgressJson.success
      ? lessonProgressJson.data
      : [];
    const lessonsData = lessonsJson.success ? lessonsJson.data : [];

    console.log({ lessonsData });
    return {
      platform: platformData,
      students: studentsData,
      courses: coursesData,
      events: eventsData,
      payments: paymentsData,
      display: displayData,
      lessonProgress: lessonProgressData,
      lessons: lessonsData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      platform: [],
      students: [],
      courses: [],
      events: [],
      payments: [],
      display: {},
      lessonProgress: [],
      lessons: [],
    };
  }
};
