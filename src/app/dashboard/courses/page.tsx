"use client";

import CreateCourseModal from "@/components/dashboard/CreateCourseModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ICourse } from "@/redux/admin/slice/all-courses";
import { RootState } from "@/redux/store";
import { Course } from "@prisma/client";
import {
  Clock,
  DollarSign,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

  // const CreateCourseModal = () => (
  //   <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
  //     <DialogContent className="w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">
  //       <DialogHeader>
  //         <DialogTitle>Create New Course</DialogTitle>
  //         <DialogDescription asChild>
  //           <div className="flex items-center space-x-2 mt-2">
  //             <div className="flex space-x-1">
  //               {[1, 2, 3, 4].map((step) => (
  //                 <div
  //                   key={step}
  //                   className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
  //                     step <= currentStep
  //                       ? "bg-primary text-primary-foreground"
  //                       : "bg-muted text-muted-foreground"
  //                   }`}
  //                 >
  //                   {step}
  //                 </div>
  //               ))}
  //             </div>
  //             <span className="text-sm text-muted-foreground">
  //               Step {currentStep} of 4
  //             </span>
  //           </div>
  //         </DialogDescription>
  //       </DialogHeader>

  //       <div className="space-y-6">
  //         {currentStep === 1 && (
  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold">Course Information</h3>
  //             <div className="space-y-4">
  //               <div className="space-y-1">
  //                 <Label htmlFor="title">Course Title</Label>
  //                 <Input id="title" placeholder="Enter course title" />
  //               </div>
  //               <div className="space-y-1">
  //                 <Label htmlFor="description">Description</Label>
  //                 <Textarea
  //                   id="description"
  //                   placeholder="Enter course description"
  //                 />
  //               </div>
  //               <div className="grid grid-cols-2 gap-4">
  //                 <div className="space-y-1">
  //                   <Label htmlFor="category">Category</Label>
  //                   <Select>
  //                     <SelectTrigger className="w-full">
  //                       <SelectValue placeholder="Select category" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       {categories.map((category) => (
  //                         <SelectItem key={category} value={category}>
  //                           {category}
  //                         </SelectItem>
  //                       ))}
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //                 <div className="space-y-1">
  //                   <Label htmlFor="duration">Duration (hours)</Label>
  //                   <Input id="duration" type="number" placeholder="0" />
  //                 </div>
  //               </div>
  //               <div className="space-y-1">
  //                 <Label htmlFor="cover">Course Cover Image</Label>
  //                 <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-32 flex items-center justify-center">
  //                   <div className="text-center">
  //                     <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
  //                     <p className="text-sm text-muted-foreground">
  //                       Click to upload or drag and drop
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         )}

  //         {currentStep === 2 && (
  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold">Curriculum</h3>
  //             <div className="space-y-4">
  //               <div className="border rounded-lg p-4">
  //                 <div className="flex items-center justify-between mb-2">
  //                   <h4 className="font-medium">Module 1: Introduction</h4>
  //                   <Button variant="ghost" size="sm">
  //                     <X className="w-4 h-4" />
  //                   </Button>
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Input placeholder="Module title" />
  //                   <div className="flex space-x-2">
  //                     <Input placeholder="Lesson 1 title" className="flex-1" />
  //                     <Button variant="outline" size="sm">
  //                       Add Lesson
  //                     </Button>
  //                   </div>
  //                 </div>
  //               </div>
  //               <Button variant="outline" className="w-full">
  //                 <Plus className="w-4 h-4 mr-2" />
  //                 Add Module
  //               </Button>
  //             </div>
  //           </div>
  //         )}

  //         {currentStep === 3 && (
  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold">Pricing & Access</h3>
  //             <div className="space-y-4">
  //               <div className="flex items-center space-x-4">
  //                 <Button variant="outline" size="sm">
  //                   Free
  //                 </Button>
  //                 <Button variant="default" size="sm">
  //                   Paid
  //                 </Button>
  //               </div>
  //               <div className="grid grid-cols-2 gap-4">
  //                 <div className="space-y-1">
  //                   <Label htmlFor="price">Price ($)</Label>
  //                   <Input id="price" type="number" placeholder="0.00" />
  //                 </div>
  //                 <div className="space-y-1">
  //                   <Label htmlFor="discount">Discount (%)</Label>
  //                   <Input id="discount" type="number" placeholder="0" />
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         )}

  //         {currentStep === 4 && (
  //           <div className="space-y-4">
  //             <h3 className="text-lg font-semibold">Preview & Publish</h3>
  //             <div className="bg-muted/50 rounded-lg p-4">
  //               <h4 className="font-medium mb-2">Course Summary</h4>
  //               <div className="space-y-2 text-sm text-muted-foreground">
  //                 <p>Title: Advanced React Development</p>
  //                 <p>Category: Web Development</p>
  //                 <p>Duration: 12 hours</p>
  //                 <p>Price: $89</p>
  //                 <p>Modules: 4</p>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>

  //       <DialogFooter>
  //         <div className="flex justify-between w-full">
  //           <Button
  //             variant="outline"
  //             onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
  //             disabled={currentStep === 1}
  //           >
  //             Previous
  //           </Button>
  //           <div className="space-x-2">
  //             <Button
  //               variant="outline"
  //               onClick={() => setCreateModalOpen(false)}
  //             >
  //               Save Draft
  //             </Button>
  //             {currentStep < 4 ? (
  //               <Button
  //                 onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
  //               >
  //                 Next
  //               </Button>
  //             ) : (
  //               <Button onClick={() => setCreateModalOpen(false)}>
  //                 Publish Course
  //               </Button>
  //             )}
  //           </div>
  //         </div>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // );

  const CourseCard = ({
    course,
    enrolled,
  }: {
    course: ICourse;
    enrolled: number;
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
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
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
              {publishedCourses.map((course, i) => {
                const enrolled = payments.reduce((total, pay) => {
                  const matches = pay.purchases.filter(
                    (purchase) => purchase.courseId === course.id
                  ).length;
                  return total + matches;
                }, 0);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrolled={enrolled}
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftCourses.map((course) => {
                const enrolled = payments.map(
                  (pay) =>
                    pay.purchases.filter(
                      (purchase) => purchase.courseId === course.id
                    ).length
                );
                return (
                  <CourseCard
                    key={course.id}
                    enrolled={enrolled[0]}
                    course={course}
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
      </div>
    </div>
  );
}
