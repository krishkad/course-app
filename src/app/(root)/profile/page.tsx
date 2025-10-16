"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

import Footer from "@/components/root/Footer";
import Navigation from "@/components/root/Navigation";
import { cn, displayRazorpayAmount } from "@/lib/utils";
import { ICourse } from "@/redux/slices/courses";
import { RootState } from "@/redux/store";
import { Lesson, Payment } from "@prisma/client";
import { format } from "date-fns";
import {
  Award,
  BookOpen,
  Calendar,
  CreditCard,
  Edit,
  LoaderIcon,
  LogOutIcon,
  Mail,
  Phone,
  UserIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface PaymentCourseId extends Payment {
  courseId: string;
}

const Profile = () => {
  // Mock user data - replace with actual data from backend
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2024",
    location: "San Francisco, CA",
    avatar: "",
    bio: "Passionate learner focused on technology and personal development",
  });
  const user = useSelector((state: RootState) => state.user.user);
  const courses = useSelector((state: RootState) => state.courses.courses);
  const lessonsProgress = useSelector(
    (state: RootState) => state.lessonsProgress.lessonProgress
  );
  const [payments, setPayments] = useState<PaymentCourseId[]>([]);
  const [purchased_courses, setPurchased_courses] = useState<ICourse[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const router = useRouter();

  // const [purchasedCourses] = useState([
  //   {
  //     id: 1,
  //     title: "Complete Web Development Bootcamp",
  //     thumbnail: "/placeholder.svg",
  //     progress: 75,
  //     status: "In Progress",
  //     enrolled: "Feb 2024",
  //     instructor: "Sarah Johnson",
  //     lessonsCompleted: 45,
  //     totalLessons: 60,
  //   },
  //   {
  //     id: 2,
  //     title: "UI/UX Design Masterclass",
  //     thumbnail: "/placeholder.svg",
  //     progress: 100,
  //     status: "Completed",
  //     enrolled: "Jan 2024",
  //     instructor: "Mike Chen",
  //     lessonsCompleted: 40,
  //     totalLessons: 40,
  //   },
  //   {
  //     id: 3,
  //     title: "Data Science Fundamentals",
  //     thumbnail: "/placeholder.svg",
  //     progress: 30,
  //     status: "In Progress",
  //     enrolled: "Mar 2024",
  //     instructor: "Dr. Emily Roberts",
  //     lessonsCompleted: 18,
  //     totalLessons: 60,
  //   },
  // ]);

  const [transactions] = useState([
    {
      id: "TXN-001",
      course: "Complete Web Development Bootcamp",
      amount: "$199.00",
      date: "Feb 15, 2024",
      status: "Completed",
      method: "Credit Card",
    },
    {
      id: "TXN-002",
      course: "UI/UX Design Masterclass",
      amount: "$149.00",
      date: "Jan 20, 2024",
      status: "Completed",
      method: "PayPal",
    },
    {
      id: "TXN-003",
      course: "Data Science Fundamentals",
      amount: "$179.00",
      date: "Mar 5, 2024",
      status: "Completed",
      method: "Credit Card",
    },
  ]);

  useEffect(() => {
    const fetch_profile_data = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `/api/payment/get-user-payments?userId=${user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const res = await response.json();

        if (!res.success) {
          console.log(res.message);
          toast.warning(res.message);
          return;
        }

        setPayments(res.data);
        console.log({ paymentdata: res.data });

        const payment_set = new Set(
          res.data.map((pay: PaymentCourseId) => pay.courseId)
        );

        const success_payments = res.data.filter(
          (payment: PaymentCourseId) => payment.status === "SUCCESS"
        );

        const published_courses = courses.filter((course) =>
          payment_set.has(course.id)
        );

        console.log({ published_courses });
        setPurchased_courses(published_courses);

        const courses_lessons = (
          await Promise.all(
            success_payments.map(async (pay: PaymentCourseId) => {
              try {
                const response = await fetch(
                  `/api/course/get-course?courseId=${pay.courseId}&userId=${user.id}`,
                  {
                    method: "GET",
                    credentials: "include",
                  }
                );

                const courseRes = await response.json();

                if (!courseRes.success) {
                  console.log(courseRes.message);
                  toast.warning(courseRes.message);
                  return [];
                }

                return courseRes.lessons || [];
              } catch (error) {
                console.error("Error fetching course:", error);
                return [];
              }
            })
          )
        ).flat();

        setLessons(courses_lessons);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetch_profile_data();
  }, [user, courses]);

  const getStatusColor = (status: string) => {
    return status === "Completed" ? "default" : "secondary";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        router.refresh();
        return;
      }

      router.refresh();
    } catch (error) {
      console.log("error while log out: ", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // useEffect(() => {
  //   if (purchased_courses || lessons || lessonsProgress) {
  //     console.log({ purchased_courses, lessons, lessonsProgress });
  //   }
  // }, [purchased_courses, lessons, lessonsProgress]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 mt-16">
        {/* Profile Header */}
        <div className="mb-8 md:mb-12">
          <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-xl">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-2xl md:text-3xl font-bold bg-primary text-primary-foreground">
                    {getInitials(`${user.fname} ${user.lname}`)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center md:text-left space-y-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {`${user.fname} ${user.lname}`}
                    </h1>
                    <p className="text-muted-foreground">{userData.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                      <UserIcon className="h-4 w-4" />
                      <span>{user.profession}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="gap-2 mt-4 md:mt-0">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 mt-4 md:mt-0"
                  onClick={handleLogOut}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <LoaderIcon className="w-4 h-4 shrink-0 animate-spin" />
                      Logging out
                    </>
                  ) : (
                    <>
                      <LogOutIcon className="h-4 w-4" />
                      Log Out
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {
                      payments.filter((payment) => payment.status === "SUCCESS")
                        .length
                    }
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {/* {
                      purchased_courses.filter((c) => c.status === "Completed")
                        .length
                    } */}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {/* {
                      purchasedCourses.filter((c) => c.status === "In Progress")
                        .length
                    } */}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    $
                    {displayRazorpayAmount(
                      payments.reduce((total, item) => total + item.amount, 0)
                    )}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-auto p-1">
            <TabsTrigger value="courses" className="gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">My Courses</span>
              <span className="sm:hidden">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="gap-2 py-3">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Transactions</span>
              <span className="sm:hidden">Payments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4 md:space-y-6">
            {purchased_courses.map((course) => {
              const less = lessons.filter(
                (lesson: Lesson) => lesson?.courseId === course.id
              );
              const progress = lessonsProgress.filter(
                (prog) => prog.courseId === course.id
              );

              console.log({ less, progress });

              const is_purchased = payments.find(
                (payment) => payment.courseId === course.id
              );

              if (!is_purchased || is_purchased.status !== "SUCCESS") return;
              return (
                <Card
                  key={course.id}
                  className="border-none shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 lg:w-64 h-48 md:h-auto bg-muted flex-shrink-0">
                      <img
                        src={course?.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant={getStatusColor("completed")}>
                              completed
                            </Badge>
                            <span className="text-sm text-muted-foreground"></span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Instructor: {course.instructor}
                          </p>
                        </div>
                        <Link href={`/courses/${course.slug}`}>
                          <Button className="w-full lg:w-auto cursor-pointer">
                            Continue Learning
                          </Button>
                        </Link>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress: {progress.length} of {less.length} lessons
                          </span>
                          <span className="font-semibold text-foreground">
                            {Math.round((progress.length / less.length) * 100)}%
                          </span>
                        </div>
                        <Progress
                          value={Math.round(
                            (progress.length / less.length) * 100
                          )}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            {/* Desktop Table View */}
            <Card className="border-none shadow-md hidden md:block overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>
                  View all your course purchases and payment details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold text-sm">
                          Transaction ID
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Course
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Amount
                        </th>
                        <th className="text-left p-4 font-semibold text-sm">
                          Date
                        </th>

                        <th className="text-left p-4 font-semibold text-sm">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((transaction, i) => {
                        const pay = payments[i];
                        const trans_course = purchased_courses.filter(
                          (cour) => cour.id === pay?.courseId
                        );
                        return (
                          <tr
                            key={transaction.id}
                            className="border-b hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-4">
                              <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                TX-{transaction.id.slice(0, 6)}
                              </code>
                            </td>
                            <td className="p-4 font-medium">
                              {trans_course[0]?.title}
                            </td>
                            <td className="p-4 font-semibold text-primary">
                              {payments[i]?.amount
                                ? `$${displayRazorpayAmount(
                                    payments[i].amount
                                  )}`
                                : transaction.amount}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {format(transaction?.createdAt, "MMM, dd yyyy")}
                            </td>

                            <td className="p-4">
                              <Badge
                                variant="default"
                                className={cn(
                                  transaction.status === "SUCCESS"
                                    ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                                    : transaction.status === "PENDING"
                                    ? "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
                                    : "bg-red-500/10 text-red-700 hover:bg-red-500/20"
                                )}
                              >
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {payments.map((transaction, i) => {
                const pay = payments[i];
                const trans_course = purchased_courses.filter(
                  (cour) => cour.id === pay?.courseId
                );
                return (
                  <Card key={transaction.id} className="border-none shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">
                            {trans_course[0]?.title}
                          </CardTitle>
                          <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                            {transaction.id}
                          </code>
                        </div>
                        <Badge
                          variant="default"
                          className={cn(
                            transaction.status === "SUCCESS"
                              ? "bg-green-500/10 text-green-700 hover:bg-green-500/20"
                              : transaction.status === "PENDING"
                              ? "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20"
                              : "bg-red-500/10 text-red-700 hover:bg-red-500/20"
                          )}
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Amount
                        </span>
                        <span className="font-semibold text-lg text-primary">
                          {payments[i]?.amount
                            ? `$${displayRazorpayAmount(payments[i].amount)}`
                            : transaction.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Date
                        </span>
                        <span className="text-sm">
                          {format(transaction.createdAt, "MMM, dd yyyy")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
