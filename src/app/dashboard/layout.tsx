import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminProviderInit from "@/redux/admin/AdminProviderInit";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { students, courses, events, payments } = await getData();
  return (
    <AdminProviderInit
      students={students}
      all_courses={courses}
      events={events}
      payments={payments}
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
        <SidebarInset>
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
    const studentsUrl = `${baseUrl}/api/user/get-all`;
    const coursesUrl = `${baseUrl}/api/course/get-all-admin`;
    const eventsUrl = `${baseUrl}/api/event/get-all-admin`;
    const paymentsUrl = `${baseUrl}/api/payment/get-all`;

    // Define fetch options
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    };

    // Fetch both APIs in parallel
    const [studentsRes, coursesRes, eventsRes, paymentRes] = await Promise.all([
      fetch(studentsUrl, fetchOptions),
      fetch(coursesUrl, fetchOptions),
      fetch(eventsUrl, fetchOptions),
      fetch(paymentsUrl, fetchOptions),
    ]);

    const [studentsJson, coursesJson, eventsJson, paymentsJson] =
      await Promise.all([
        studentsRes.json(),
        coursesRes.json(),
        eventsRes.json(),
        paymentRes.json(),
      ]);


    // Check success status of both
    const studentsData = studentsJson.success ? studentsJson.data : [];
    const coursesData = coursesJson.success ? coursesJson.data : [];
    const eventsData = eventsJson.success ? eventsJson.data : [];
    const paymentsData = paymentsJson.success ? paymentsJson.data : [];

    return {
      students: studentsData,
      courses: coursesData,
      events: eventsData,
      payments: paymentsData,
    };
  } catch (error) {
    console.error("Error while fetching data:", error);
    return {
      students: [],
      courses: [],
      events: [],
      payments: [],
    };
  }
};
