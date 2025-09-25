import CourseDetail from "@/components/root/CourseDetails";
import React from "react";

const SingleCoursePage = async ({
  params,
}: {
  params: Promise<{ course: string }>;
}) => {
    const {course } = await params;
  return <CourseDetail courseId={course} />;
};

export default SingleCoursePage;
