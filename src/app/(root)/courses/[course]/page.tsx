import CourseDetail from "@/components/root/CourseDetails";
import { decodeJwt } from "@/lib/utils";
import { cookies } from "next/headers";
import React from "react";

const SingleCoursePage = async ({
  params,
}: {
  params: Promise<{ course: string }>;
}) => {
    const {course } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get("course-app-authentication")?.value;

    const {header, payload, signature} = decodeJwt(token|| "");
  return <CourseDetail courseId={course} userId={payload.id} />;
};

export default SingleCoursePage;
