"use client";

import CreateCourseModal from "@/components/dashboard/CreateCourseModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { displayRazorpayAmount } from "@/lib/utils";
import { ICourse, remove_course } from "@/redux/admin/slice/all-courses";
import { RootState } from "@/redux/store";
import {
  Clock,
  DollarSign,
  Edit,
  Eye,
  HandCoinsIcon,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
  WalletIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const categories = [
  "Web Development",
  "Design",
  "Data Science",
  "Marketing",
  "Business",
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [edit_course, setEdit_course] = useState<ICourse>({} as ICourse);
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);

  const dispatch = useDispatch();
  const all_courses = useSelector(
    (state: RootState) => state.all_courses.all_courses
  );
  const payments = useSelector((state: RootState) => state.payments.payments);

  const filteredCourses = all_courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const publishedCourses = filteredCourses.filter(
    (course) => course.published === true
  );
  const draftCourses = filteredCourses.filter(
    (course) => course.published === false
  );

  useEffect(() => {
    if (all_courses) {
      console.log({ all_courses });
    }
  }, [all_courses]);

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await fetch(
        `/api/course/delete-course?courseId=${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      dispatch(remove_course(courseId));
    } catch (error) {
      console.log("error deleting course: ", error);
    }
  };

  const CourseCard = ({
    course,
    enrolled,
    revenue,
  }: {
    course: ICourse;
    enrolled: number;
    revenue: number;
  }) => (
    <Card className="group hover:shadow-card-hover transition-all duration-200 py-0">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardContent className="p-4 pt-0">
        <div className="flex items-start justify-between mb-2">
          <Badge variant={course.published === true ? "default" : "secondary"}>
            {course.published ? "Published" : "Draft"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setEdit_course(course);
                  setEditModalOpen(true);
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDeleteCourse(course.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span className="">By {course.instructor}</span>
          <Badge variant="outline">{course.category}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {enrolled}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {course.price}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
          </div>
          {course.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm">{course.rating}</span>
            </div>
          )}
          <div className="flex items-center">
            <WalletIcon className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-sm">{displayRazorpayAmount(revenue)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 space-y-6 pt-8">
        {/* Header */}
        <div className="flex max-sm:flex-col max-sm:items-start justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground">Manage your course catalog</p>
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="max-sm:w-full max-sm:h-10 mt-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Filters */}
        {/* <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Course Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card> */}

        {/* Course Tabs */}
        <Tabs defaultValue="published" className="space-y-6">
          <div className="flex max-sm:items-start max-sm:flex-col-reverse max-sm:gap-3 items-center justify-between">
            <TabsList>
              <TabsTrigger value="published">
                Published ({publishedCourses.length})
              </TabsTrigger>
              <TabsTrigger value="drafts">
                Drafts ({draftCourses.length})
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center jusity-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64 bg-background"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full sm:w-40 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <TabsContent value="published" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedCourses.slice().reverse().map((course, i) => {
                const enrolled = payments.reduce((total, pay) => {
                  const matches = pay.purchases.filter(
                    (purchase) => purchase.courseId === course.id
                  ).length;
                  return total + matches;
                }, 0);
                const revenue = payments.reduce((total, payment, index) => {
                  const courseRevenue = payment.purchases
                    .filter((purchase) => purchase.courseId === course.id)
                    .reduce((sum, purchase) => sum + payments[index].amount, 0);

                  return total + courseRevenue;
                }, 0);

                console.log({ revenue });

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrolled={enrolled}
                    revenue={revenue}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftCourses.map((course) => {
                const enrolled = payments.reduce((total, pay) => {
                  const matches = pay.purchases.filter(
                    (purchase) => purchase.courseId === course.id
                  ).length;
                  return total + matches;
                }, 0);

                const revenue = payments.reduce((total, payment, index) => {
                  const courseRevenue = payment.purchases
                    .filter((purchase) => purchase.courseId === course.id)
                    .reduce((sum, purchase) => sum + payments[index].amount, 0);

                  return total + courseRevenue;
                }, 0);
                return (
                  <CourseCard
                    key={course.id}
                    enrolled={enrolled}
                    course={course}
                    revenue={revenue}
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <CreateCourseModal
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          editModal={false}
        />

        <CreateCourseModal
          createModalOpen={editModalOpen}
          setCreateModalOpen={setEditModalOpen}
          editModal={true}
          edit_course={edit_course}
        />
      </div>
    </div>
  );
}
