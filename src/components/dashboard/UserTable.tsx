"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  displayRazorpayAmount,
  generateRecentActivity,
  getTopPerformingCourse,
} from "@/lib/utils";
import Link from "next/link";

export function UserTable() {
  const payments = useSelector((state: RootState) => state.payments.payments);
  const courses = useSelector(
    (state: RootState) => state.all_courses.all_courses
  );
  const students = useSelector((state: RootState) => state.students.students);
  const events = useSelector((state: RootState) => state.all_events.all_events);
  const lessons = useSelector((state: RootState) => state.all_lessons.lessons);
  const lessonsProgress = useSelector(
    (state: RootState) => state.all_lessonProgress.lessonProgress
  );
  const [topCourses, setTopCourses] = useState<
    {
      id: string;
      title: string;
      students: number;
      revenue: number;
      completion: number;
    }[]
  >(
    [] as {
      id: string;
      title: string;
      students: number;
      revenue: number;
      completion: number;
    }[]
  );
  const users = [
    {
      fname: "John",
      lname: "Doe",
      email: "john.doe@example.com",
      profession: "Software Engineer",
      courseTitle: "Advanced React",
      payment: "$199.99",
    },
    {
      fname: "Jane",
      lname: "Smith",
      email: "jane.smith@example.com",
      profession: "Data Scientist",
      courseTitle: "Machine Learning Basics",
      payment: "$149.99",
    },
    {
      fname: "Alex",
      lname: "Johnson",
      email: "alex.johnson@example.com",
      profession: "Product Manager",
      courseTitle: "Agile Project Management",
      payment: "$249.99",
    },
    {
      fname: "Emily",
      lname: "Brown",
      email: "emily.brown@example.com",
      profession: "UX Designer",
      courseTitle: "UI/UX Design Principles",
      payment: "$179.99",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "enrollment",
      user: "Sarah Johnson",
      course: "Advanced React Development",
      time: "2 hours ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 2,
      type: "purchase",
      user: "Mike Chen",
      course: "Full-Stack JavaScript",
      time: "4 hours ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 3,
      type: "completion",
      user: "Emily Davis",
      course: "UI/UX Design Fundamentals",
      time: "6 hours ago",
      avatar: "/api/placeholder/32/32",
    },
    {
      id: 4,
      type: "enrollment",
      user: "Alex Thompson",
      course: "Data Science Basics",
      time: "1 day ago",
      avatar: "/api/placeholder/32/32",
    },
  ];

  // const topCourses = [
  //   {
  //     id: 1,
  //     title: "Advanced React Development",
  //     students: 245,
  //     revenue: "$12,350",
  //     completion: 78,
  //   },
  //   {
  //     id: 2,
  //     title: "Full-Stack JavaScript",
  //     students: 189,
  //     revenue: "$9,450",
  //     completion: 65,
  //   },
  //   {
  //     id: 3,
  //     title: "UI/UX Design Fundamentals",
  //     students: 156,
  //     revenue: "$7,800",
  //     completion: 82,
  //   },
  //   {
  //     id: 4,
  //     title: "Data Science Basics",
  //     students: 134,
  //     revenue: "$6,700",
  //     completion: 71,
  //   },
  // ];

  useEffect(() => {
    if (payments || courses || lessons || lessonsProgress) {
      const topCourses = getTopPerformingCourse({
        courses,
        lessons,
        lessonsProgress,
        payments: payments.filter((payment) => payment.status === "SUCCESS"),
      });
      setTopCourses(topCourses);
    }
  }, [payments, courses, lessons, lessonsProgress]);

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Overview of registered users and their course details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Profession</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {user.fname}
                      </TableCell>
                      <TableCell>{user.lname}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.profession}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card> */}
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generateRecentActivity(payments, students, courses, events).map(
                (activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.type === "enrollment" && "Enrolled in"}
                        {activity.type === "purchase" && "Purchased"}
                        {activity.type === "completion" && "Completed"}
                        {" " + activity.course}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                    <Badge
                      variant={
                        activity.type === "enrollment"
                          ? "default"
                          : activity.type === "purchase"
                          ? "secondary"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
        {/* Top Performing Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Top Performing Courses
              <Link href={"/dashboard/courses"}>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses
                .filter((topCourse) => topCourse.revenue > 0)
                .map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">
                        {course.title}
                      </h4>
                      <Badge variant="outline">
                        {course.students} students
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Revenue: ${displayRazorpayAmount(course.revenue)}
                      </span>
                      <span>Completion: {course.completion}%</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Recent Enrollment</CardTitle>
          <CardDescription>
            Overview of registered users and their course details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead className="text-right">Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{user.fname}</TableCell>
                    <TableCell>{user.lname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.profession}</TableCell>
                    <TableCell>{user.courseTitle}</TableCell>
                    <TableCell className="text-right">{user.payment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}
