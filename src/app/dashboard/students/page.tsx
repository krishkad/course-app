"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaidStudentsCount } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { User } from "@prisma/client";
import { format } from "date-fns";
import {
  Download,
  Eye,
  MoreHorizontal,
  Search,
  UserMinus
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Mock data
const students = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/api/placeholder/32/32",
    joinedDate: "2024-01-15",
    type: "Premium",
    coursesEnrolled: 5,
    completionRate: 78,
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    avatar: "/api/placeholder/32/32",
    joinedDate: "2024-02-08",
    type: "Free",
    coursesEnrolled: 2,
    completionRate: 45,
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    avatar: "/api/placeholder/32/32",
    joinedDate: "2024-01-22",
    type: "Premium",
    coursesEnrolled: 8,
    completionRate: 92,
    lastActive: "3 hours ago",
    status: "active",
  },
  {
    id: 4,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatar: "/api/placeholder/32/32",
    joinedDate: "2024-03-01",
    type: "Free",
    coursesEnrolled: 1,
    completionRate: 23,
    lastActive: "1 week ago",
    status: "inactive",
  },
  {
    id: 5,
    name: "Jessica Wilson",
    email: "jessica.wilson@email.com",
    avatar: "/api/placeholder/32/32",
    joinedDate: "2024-02-15",
    type: "Premium",
    coursesEnrolled: 6,
    completionRate: 67,
    lastActive: "5 hours ago",
    status: "active",
  },
];

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const all_students = useSelector(
    (state: RootState) => state.students.students
  );
  const all_courses = useSelector(
    (state: RootState) => state.all_courses.all_courses
  );
  const payments = useSelector((state: RootState) => state.payments.payments);
  const [display_students, setDisplay_students] = useState<User[]>([]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || student.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  useEffect(() => {
    if (all_students) {
      setDisplay_students(all_students);
    }
  }, [all_students]);

  const stats = [
    {
      label: "Total Students",
      value: all_students.filter((student) => student.role !== "ADMIN").length,
      change: "+12.5%",
    },
    { label: "Active This Week", value: "1,234", change: "+5.2%" },
    { label: "Premium Members", value: `${getPaidStudentsCount(all_students, payments)}`, change: "+8.1%" },
    { label: "Course Completions", value: "1,567", change: "+15.3%" },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 space-y-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">
              Manage and monitor student progress
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="gap-0">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-success">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Students</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Professon</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Joined</TableHead>
                    {/* <TableHead>Status</TableHead> */}
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {display_students
                    .slice()
                    .reverse()
                    .map((student) => {
                      if (student.role === "ADMIN") return;
                      // const student_course = all_courses.find((course) => student )
                      const payment_count = payments.filter(
                        (payment) => student.id === payment.userId && payment.status === "SUCCESS"
                      ).length;
                      return (
                        <TableRow
                          key={student.id}
                          className="hover:bg-muted/50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage
                                  src={student.fname}
                                  alt={student.fname}
                                />
                                <AvatarFallback>
                                  {student.fname.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-foreground">
                                  {student.fname} {student.lname}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment_count <= 0 ? "secondary" : "default"
                              }
                            >
                              {/* {student.type} */}
                              {payment_count <= 0 ? "Free" : "Premium"}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.profession}</TableCell>
                          <TableCell>{payment_count ?? 0}</TableCell>

                          <TableCell className="text-muted-foreground">
                            {format(
                              new Date(student.createdAt),
                              "MMM dd yyyy - h:mm a"
                            )}
                          </TableCell>
                          {/* <TableCell>
                        <Badge
                          variant={
                            student.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <UserMinus className="w-4 h-4 mr-2" />
                                  Remove Student
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
