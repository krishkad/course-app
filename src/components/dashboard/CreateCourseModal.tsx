"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Course, CourseTag, Lesson } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown, LoaderIcon, Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import HtmlEditor from "./HtmlEditor";
import { useDispatch } from "react-redux";
import { add_course, update_course } from "@/redux/admin/slice/all-courses";
import { ICourse } from "@/redux/slices/courses";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { professions } from "../root/SearchBox";

const categories = ["Web Development", "Design", "Marketing", "Photography"];

export default function CreateCourseModal({
  createModalOpen,
  setCreateModalOpen,
  editModal,
  edit_course,
}: {
  createModalOpen: boolean;
  setCreateModalOpen: (value: boolean) => void;
  editModal: boolean;
  edit_course?: ICourse;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [lessons, setLessons] = useState([
    {
      id: Date.now(),
      title: "",
      videoDuration: "",
      videoUrl: "",
      order: 1,
      isPaid: false,
      content: "",
    },
  ]);
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [editWhatYouLearn, setEditWhatYouLearn] = useState<string[]>([""]);
  const [editRequirements, setEditRequirements] = useState<string[]>([""]);
  const [updateCourseFile, setUpdateCourseFile] = useState<File | null>(null);

  const [editLessons, setEditLessons] = useState<Lesson[]>([]);
  const [course, setCourse] = useState<Course>({} as Course);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editModal && edit_course) {
      const get_edit_course = async () => {
        try {
          setIsUpdateLoading(true);
          const response = await fetch(
            `/api/course/get-course?courseId=${edit_course.id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const res = await response.json();

          if (!res.success) {
            console.log(res.message);
            return;
          }

          setCourse(res.course as Course);
          setEditLessons(res.lessons as Lesson[]);
          setEditWhatYouLearn(res.course.what_you_learn as string[]);
          setEditRequirements(res.course.requirements as string[]);
          console.log({ edit_lessons: res.lessons });
        } catch (error) {
          console.log("error while getting course: ", error);
        } finally {
          setIsUpdateLoading(false);
        }
      };

      get_edit_course();
    }
  }, [edit_course, editModal]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (editModal) {
      if (file) setUpdateCourseFile(file);
    } else {
      if (file) setCourseImage(file);
    }
  };

  const handleAddLesson = () => {
    setLessons([
      ...lessons,
      {
        id: Date.now(),
        title: "",
        videoDuration: "",
        videoUrl: "",
        order: lessons.length + 1,
        isPaid: false,
        content: "",
      },
    ]);
  };

  const handleRemoveLesson = (id: number | string) => {
    if (editModal) {
      setEditLessons(editLessons.filter((lesson) => lesson.id !== id));
    } else {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const handleLessonChange = (
    id: number | string,
    field: string,
    value: string | boolean | number
  ) => {
    if (!editModal) {
      setLessons(
        lessons.map((lesson) =>
          lesson.id === id ? { ...lesson, [field]: value } : lesson
        )
      );
    } else {
      setEditLessons(
        editLessons.map((lesson) =>
          lesson.id === id ? { ...lesson, [field]: value } : lesson
        )
      );
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (
    arrayName:
      | "whatYouLearn"
      | "requirements"
      | "editWhatYouLearn"
      | "editRequirements",
    index: number,
    value: string
  ) => {
    if (editModal) {
      const updater =
        arrayName === "editWhatYouLearn"
          ? setEditWhatYouLearn
          : setEditRequirements;
      const currentArray =
        arrayName === "editWhatYouLearn"
          ? [...editWhatYouLearn]
          : [...editRequirements];
      currentArray[index] = value;
      updater(currentArray);
    } else {
      const updater =
        arrayName === "whatYouLearn" ? setWhatYouLearn : setRequirements;
      const currentArray =
        arrayName === "whatYouLearn" ? [...whatYouLearn] : [...requirements];
      currentArray[index] = value;
      updater(currentArray);
    }
  };

  const handleAddItem = (
    arrayName:
      | "whatYouLearn"
      | "requirements"
      | "editWhatYouLearn"
      | "editRequirements"
  ) => {
    if (!editModal) {
      const updater =
        arrayName === "whatYouLearn" ? setWhatYouLearn : setRequirements;
      updater((prev) => [...prev, ""]);
    } else {
      const updater =
        arrayName === "editWhatYouLearn"
          ? setEditWhatYouLearn
          : setEditRequirements;
      updater((prev) => [...prev, ""]);
    }
  };

  const handleRemoveItem = (
    arrayName:
      | "whatYouLearn"
      | "requirements"
      | "editRequirements"
      | "editWhatYouLearn",
    index: number
  ) => {
    if (!editModal) {
      const updater =
        arrayName === "whatYouLearn" ? setWhatYouLearn : setRequirements;
      const currentArray =
        arrayName === "whatYouLearn" ? [...whatYouLearn] : [...requirements];
      currentArray.splice(index, 1);
      updater(currentArray);
    } else {
      const updater =
        arrayName === "editWhatYouLearn"
          ? setEditWhatYouLearn
          : setEditRequirements;
      const currentArray =
        arrayName === "editWhatYouLearn"
          ? [...editWhatYouLearn]
          : [...editRequirements];
      currentArray.splice(index, 1);
      updater(currentArray);
    }
  };

  const toggleValue = (tag: string) => {
    setCourse((prev) => ({
      ...prev,
      profession:
        prev.profession && prev.profession.includes(tag)
          ? prev.profession.filter((t) => t !== tag)
          : prev.profession
          ? [...prev.profession, tag]
          : [tag],
    }));
  };

  const handle_publish = async () => {
    try {
      setIsSubmiting(true);
      const formData = new FormData();
      formData.append("file", courseImage as File);
      formData.append("courseDetail", JSON.stringify(course));
      formData.append("lessons", JSON.stringify(lessons));
      formData.append("whatYouLearn", JSON.stringify(whatYouLearn));
      formData.append("requirements", JSON.stringify(requirements));
      const response = await fetch("/api/course/create-course", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      dispatch(add_course(res.data));
      console.log({ created_course: res.data });
    } catch (error) {
      console.log("error publishing coourse: ", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handle_update = async () => {
    try {
      setIsSubmiting(true);
      const formData = new FormData();
      formData.append("updateCourseFile", updateCourseFile as File);
      formData.append("courseDetail", JSON.stringify(course));
      formData.append("editLessons", JSON.stringify(editLessons));
      formData.append("editWhatYouLearn", JSON.stringify(editWhatYouLearn));
      formData.append("editRequirements", JSON.stringify(editRequirements));
      const response = await fetch("/api/course/edit", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.log(res.message);
        return;
      }

      console.log({ edit_course: res.data });
      dispatch(update_course(res.data));
    } catch (error) {
      console.log("error update course: ", error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  // const steps = [
  //   {
  //     title: "Course Info",
  //     content: (
  //       <div className="space-y-6">
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <Label htmlFor="title">Course Title</Label>
  //             <Input
  //               id="title"
  //               name="title"
  //               value={course.title ??""}
  //               onChange={handleOnChange}
  //               placeholder="Advanced React"
  //             />
  //           </div>
  //           <div>
  //             <Label htmlFor="category">Category</Label>
  //             <Select
  //               onValueChange={(value) =>
  //                 setCourse({ ...course, category: value })
  //               }
  //             >
  //               <SelectTrigger>
  //                 <SelectValue placeholder="Select a category" />
  //               </SelectTrigger>
  //               <SelectContent>
  //                 {categories.map((cat) => (
  //                   <SelectItem key={cat} value={cat}>
  //                     {cat}
  //                   </SelectItem>
  //                 ))}
  //               </SelectContent>
  //             </Select>
  //           </div>
  //           <div>
  //             <Label htmlFor="image">Course Cover Image</Label>
  //             <Input
  //               type="file"
  //               accept="image/*"
  //               onChange={handleImageChange}
  //             />
  //             {courseImage && (
  //               <img
  //                 src={URL.createObjectURL(courseImage)}
  //                 alt="Preview"
  //                 className="mt-2 w-full h-32 object-cover rounded-md border"
  //               />
  //             )}
  //           </div>
  //         </div>
  //         <div>
  //           <Label htmlFor="description">Course Description</Label>
  //           <Textarea
  //             id="description"
  //             name="description"
  //             value={course.description ?? ""}
  //             onChange={(e) =>
  //               setCourse({ ...course, description: e.target.value })
  //             }
  //             placeholder="Write course description..."
  //           />
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Lessons",
  //     content: (
  //       <div className="space-y-6">
  //         {lessons.map((lesson, index) => (
  //           <div
  //             key={lesson.id}
  //             className="border p-4 rounded-md relative bg-white shadow-sm"
  //           >
  //             <div className="absolute top-2 right-2">
  //               {lessons.length > 1 && (
  //                 <Button
  //                   variant="ghost"
  //                   size="icon"
  //                   onClick={() => handleRemoveLesson(lesson.id)}
  //                 >
  //                   <X className="w-4 h-4" />
  //                 </Button>
  //               )}
  //             </div>
  //             <Label>Lesson {index + 1} Title</Label>
  //             <Input
  //               value={lesson.title}
  //               onChange={(e) =>
  //                 handleLessonChange(lesson.id, "title", e.target.value)
  //               }
  //             />
  //             <Label className="mt-2 block">Lesson Duration</Label>
  //             <Input
  //               type="time"
  //               step="60"
  //               value={lesson.duration ?? ""}
  //               onChange={(e) =>
  //                 handleLessonChange(lesson.id, "duration", e.target.value)
  //               }
  //             />
  //             <Label className="mt-2 block">Video Url</Label>
  //             <Input
  //               type="text"
  //               step="60"
  //               value={lesson.videoUrl ?? ""}
  //               onChange={(e) =>
  //                 handleLessonChange(lesson.id, "videoUrl", e.target.value)
  //               }
  //             />
  //           </div>
  //         ))}
  //         <Button
  //           variant="outline"
  //           className="w-full"
  //           onClick={handleAddLesson}
  //         >
  //           <Plus className="w-4 h-4 mr-2" /> Add Lesson
  //         </Button>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Pricing",
  //     content: (
  //       <div className="space-y-6">
  //         <div className="flex gap-4">
  //           <Button variant="outline">Free</Button>
  //           <Button variant="default">Paid</Button>
  //         </div>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <Label>Price ($)</Label>
  //             <Input
  //               type="number"
  //               name="price"
  //               value={course.price}
  //               onChange={handleOnChange}
  //               placeholder="49.99"
  //             />
  //           </div>
  //           <div>
  //             <Label>Discount (%)</Label>
  //             <Input type="number" placeholder="10" />
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Preview",
  //     content: (
  //       <div className="space-y-4 text-sm">
  //         <h4 className="font-semibold">Course Summary</h4>
  //         <div className="bg-muted/30 rounded-md p-4">
  //           {courseImage && (
  //             <img
  //               src={URL.createObjectURL(courseImage)}
  //               alt="Preview"
  //               className="mt-2 w-full aspect-video object-cover rounded-md border"
  //             />
  //           )}
  //           <p>
  //             <strong>Title:</strong> Advanced React
  //           </p>
  //           <p>
  //             <strong>Category:</strong> Web Development
  //           </p>
  //           <p>
  //             <strong>Lessons:</strong> {lessons.length}
  //           </p>
  //           <p>
  //             <strong>Price:</strong> $49.99
  //           </p>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  const steps = [
    {
      title: "Course Info",
      content: (
        <div className="space-y-6">
          <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={course.title ?? ""}
                onChange={handleOnChange}
                placeholder="Advanced React"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={course.category}
                onValueChange={(value) =>
                  setCourse({ ...course, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tag">Course Tag</Label>
              <Select
                value={course.tag}
                onValueChange={(value) =>
                  setCourse({ ...course, tag: value as CourseTag })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  {["new", "most_popular", "trending", "best_seller"].map(
                    (tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="keywords">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                name="keywords"
                value={course.keywords?.join(", ") ?? ""}
                onChange={(e) =>
                  setCourse({
                    ...course,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  })
                }
                placeholder="react, nextjs, frontend"
              />
            </div>
            <div>
              <Label htmlFor="duration">Total Course Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={course.duration ?? ""}
                onChange={handleOnChange}
                placeholder="3h 20m"
              />
            </div>
            <div className="w-full">
              <Label>Profession</Label>

              <Select onValueChange={toggleValue} value={""}>
                <SelectTrigger className="w-full justify-between">
                  <p>
                    {course.profession && course.profession.length > 0
                      ? course.profession.join(", ")
                      : "Select professions..."}
                  </p>
                </SelectTrigger>

                {/* 👇 Scrollable content */}
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {["All", ...professions].map((profession) => (
                    <SelectItem
                      key={profession}
                      value={profession}
                      className="flex items-center justify-between"
                      onClick={(e) => {
                        e.preventDefault(); // prevent closing on each click
                        toggleValue(profession);
                      }}
                    >
                      <span>{profession}</span>
                      {course.profession &&
                        course.profession.includes(profession) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image">Course Cover Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {editModal
                ? courseImage && (
                    <img
                      src={URL.createObjectURL(courseImage)}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-md border"
                    />
                  )
                : updateCourseFile && (
                    <img
                      src={URL.createObjectURL(updateCourseFile)}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-md border"
                    />
                  )}
              {editModal && course.thumbnailUrl && (
                <img
                  src={course.thumbnailUrl}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-cover rounded-md border"
                />
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              name="description"
              value={course.description ?? ""}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
              placeholder="Write course description..."
            />
          </div>
        </div>
      ),
    },
    {
      title: "Lessons",
      content: (
        <div className="space-y-6">
          {!editModal
            ? lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="border p-4 rounded-md relative bg-white shadow-sm"
                >
                  <div className="absolute top-2 right-2 flex items-center space-x-1">
                    {lessons.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLesson(lesson.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Lesson Title</Label>
                      <Input
                        value={lesson.title}
                        onChange={(e) =>
                          handleLessonChange(lesson.id, "title", e.target.value)
                        }
                        placeholder="Lesson 1: Introduction"
                      />
                    </div>

                    {/* <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    min={1}
                    value={index + 1}
                    onChange={(e) =>
                      handleLessonChange(
                        lesson.id,
                        "order",
                        Number(e.target.value)
                      )
                    }
                  />
                </div> */}

                    <div>
                      <Label>Video URL</Label>
                      <Input
                        type="url"
                        value={lesson.videoUrl ?? ""}
                        onChange={(e) =>
                          handleLessonChange(
                            lesson.id,
                            "videoUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      {/* <Label>Video Duration</Label>
                  <Input
                    type="time"
                    step="60"
                    value={lesson.duration ?? ""}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "duration", e.target.value)
                    }
                  /> */}
                      <div>
                        <Label htmlFor="duration">Video Duration</Label>
                        <Input
                          id="videoDuration"
                          type="text"
                          value={lesson.videoDuration ?? ""}
                          onChange={(e) =>
                            handleLessonChange(
                              lesson.id,
                              "videoDuration",
                              e.target.value
                            )
                          }
                          placeholder="3h 20m"
                        />
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <Label>Lesson Content (optional)</Label>
                      {/* <Textarea
                    value={lesson.content ?? ""}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "content", e.target.value)
                    }
                    placeholder="Write content or notes for this lesson..."
                  /> */}
                      <HtmlEditor
                        value={lesson.content ?? ""}
                        onChange={(value: string) =>
                          handleLessonChange(lesson.id, "content", value)
                        }
                        // disabled={!!lesson.videoUrl}
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Label htmlFor={`isPaid-${lesson.id}`}>Is Paid?</Label>
                      <Switch
                        id={`isPaid-${lesson.id}`}
                        checked={lesson.isPaid}
                        onCheckedChange={(checked) =>
                          handleLessonChange(lesson.id, "isPaid", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))
            : editLessons
                .slice()
                .reverse()
                .map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="border p-4 rounded-md relative bg-white shadow-sm"
                  >
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      {lessons.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveLesson(lesson.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Lesson Title</Label>
                        <Input
                          value={lesson.title}
                          onChange={(e) =>
                            handleLessonChange(
                              lesson.id,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Lesson 1: Introduction"
                        />
                      </div>

                      {/* <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    min={1}
                    value={index + 1}
                    onChange={(e) =>
                      handleLessonChange(
                        lesson.id,
                        "order",
                        Number(e.target.value)
                      )
                    }
                  />
                </div> */}

                      <div>
                        <Label>Video URL</Label>
                        <Input
                          type="url"
                          value={lesson.videoUrl ?? ""}
                          onChange={(e) =>
                            handleLessonChange(
                              lesson.id,
                              "videoUrl",
                              e.target.value
                            )
                          }
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        {/* <Label>Video Duration</Label>
                  <Input
                    type="time"
                    step="60"
                    value={lesson.duration ?? ""}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "duration", e.target.value)
                    }
                  /> */}
                        <div>
                          <Label htmlFor="duration">Video Duration</Label>
                          <Input
                            id="duration"
                            type="text"
                            value={lesson.videoDuration ?? ""}
                            onChange={(e) =>
                              handleLessonChange(
                                lesson.id,
                                "videoDuration",
                                e.target.value
                              )
                            }
                            placeholder="3h 20m"
                          />
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2">
                        <Label>Lesson Content (optional)</Label>
                        {/* <Textarea
                    value={lesson.content ?? ""}
                    onChange={(e) =>
                      handleLessonChange(lesson.id, "content", e.target.value)
                    }
                    placeholder="Write content or notes for this lesson..."
                  /> */}
                        <HtmlEditor
                          value={lesson.content ?? ""}
                          onChange={(value: string) =>
                            handleLessonChange(lesson.id, "content", value)
                          }
                          disabled={!!lesson.videoUrl}
                        />
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Label htmlFor={`isPaid-${lesson.id}`}>Is Paid?</Label>
                        <Switch
                          id={`isPaid-${lesson.id}`}
                          checked={lesson.isPaid}
                          onCheckedChange={(checked) =>
                            handleLessonChange(lesson.id, "isPaid", checked)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleAddLesson}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Lesson
          </Button>
        </div>
      ),
    },
    {
      title: "Pricing",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                name="price"
                value={course.price ?? ""}
                onChange={handleOnChange}
                placeholder="49.99"
              />
            </div>
            {/* <div>
              <Label>Discount (%)</Label>
              <Input
                type="number"
                name="discount"
                value={course.discount ?? ""}
                onChange={handleOnChange}
                placeholder="10"
              />
            </div> */}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="published">Publish Now?</Label>
            <Switch
              id="published"
              checked={course.published ?? false}
              onCheckedChange={(checked) =>
                setCourse({ ...course, published: checked })
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "InstructorInfo",
      content: (
        <div className="space-y-6">
          {!editModal ? (
            <div className="space-y-6">
              {/* === What You Learn Section === */}
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  What You Will Learn
                </h2>
                {whatYouLearn.map((line, index) => (
                  <div
                    key={`learn-${index}`}
                    className="border p-4 rounded-md relative bg-white shadow-sm"
                  >
                    <div className="absolute top-2 right-2">
                      {whatYouLearn.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveItem("whatYouLearn", index)
                          }
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`learn-${index}`}>Line {index + 1}</Label>
                      <Input
                        id={`learn-${index}`}
                        value={line}
                        onChange={(e) =>
                          handleArrayChange(
                            "whatYouLearn",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="E.g. Understand React Hooks"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => handleAddItem("whatYouLearn")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add More
                </Button>
              </div>

              {/* === Requirements Section === */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                {requirements.map((item, index) => (
                  <div
                    key={`req-${index}`}
                    className="border p-4 rounded-md relative bg-white shadow-sm"
                  >
                    <div className="absolute top-2 right-2">
                      {requirements.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveItem("requirements", index)
                          }
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`req-${index}`}>
                        Requirement {index + 1}
                      </Label>
                      <Input
                        id={`req-${index}`}
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "requirements",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="E.g. Basic JavaScript knowledge"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => handleAddItem("requirements")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add More
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 mt-6">
              {/* === What You Will Learn Section === */}
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  What You Will Learn
                </h2>
                {editWhatYouLearn.map((line, index) => (
                  <div
                    key={`learn-${index}`}
                    className="border p-4 rounded-md relative bg-white shadow-sm"
                  >
                    <div className="absolute top-2 right-2">
                      {editWhatYouLearn.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveItem("editWhatYouLearn", index)
                          }
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`learn-${index}`}>Line {index + 1}</Label>
                      <Input
                        id={`learn-${index}`}
                        value={line}
                        onChange={(e) =>
                          handleArrayChange(
                            "editWhatYouLearn",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="E.g. Understand React Hooks"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => handleAddItem("editWhatYouLearn")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add More
                </Button>
              </div>

              {/* === Requirements Section === */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                {editRequirements.map((item, index) => (
                  <div
                    key={`req-${index}`}
                    className="border p-4 rounded-md relative bg-white shadow-sm"
                  >
                    <div className="absolute top-2 right-2">
                      {editRequirements.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveItem("editRequirements", index)
                          }
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`req-${index}`}>
                        Requirement {index + 1}
                      </Label>
                      <Input
                        id={`req-${index}`}
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "editRequirements",
                            index,
                            e.target.value
                          )
                        }
                        placeholder="E.g. Basic JavaScript knowledge"
                      />
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => handleAddItem("editRequirements")}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add More
                </Button>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Preview",
      content: (
        <div className="space-y-4 text-sm">
          <h4 className="font-semibold">Course Summary</h4>
          <div className="bg-muted/30 rounded-md p-4">
            {!editModal && courseImage && (
              <img
                src={URL.createObjectURL(courseImage)}
                alt="Preview"
                className="mt-2 w-full aspect-video object-cover rounded-md border"
              />
            )}
            {editModal && updateCourseFile !== null ? (
              <img
                src={URL.createObjectURL(updateCourseFile)}
                alt="Preview"
                className="mt-2 w-full aspect-video object-cover rounded-md border"
              />
            ) : editModal ? (
              <img
                src={course.thumbnailUrl}
                alt="Preview"
                className="mt-2 w-full aspect-video object-cover rounded-md border"
              />
            ) : null}
            <p className="mt-4">
              <strong>Title:</strong> {course.title}
            </p>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>
              <strong>Tag:</strong> {course.tag}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            <p>
              <strong>Keywords:</strong> {course.keywords?.join(", ")}
            </p>
            <p>
              <strong>Profession:</strong> {course.profession?.join(", ")}
            </p>
            <p>
              <strong>Lessons:</strong> {lessons.length}
            </p>
            <p>
              <strong>Price:</strong> ${course.price}
            </p>
            <p>
              <strong>Published:</strong> {course.published ? "Yes" : "No"}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  useEffect(() => {
    console.log({ editWhatYouLearn, editRequirements });
  }, [editRequirements, editWhatYouLearn]);

  return (
    <Dialog
      open={createModalOpen}
      onOpenChange={(value) => {
        if (!value) {
          setCurrentStep(0);
          setCreateModalOpen(value);
        }
      }}
    >
      <DialogContent className="w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editModal ? "Update Course" : "Create New Course"}
          </DialogTitle>
        </DialogHeader>

        {!isUpdateLoading ? (
          <div className="relative w-full min-h-[350px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            <LoaderIcon className="w-5 h-5 shrink-0 animate-spin" />
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setCreateModalOpen(false);
              }}
            >
              Save Draft
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                disabled={isSubmiting}
                onClick={() => {
                  if (editModal) {
                    console.log({ course, editLessons });
                    handle_update();
                    setCreateModalOpen(false);
                    setCurrentStep(0);
                  } else {
                    handle_publish();
                    setCreateModalOpen(false);
                    setCourse({} as ICourse);
                    setCourseImage(null);
                    setLessons([
                      {
                        id: Date.now(),
                        title: "",
                        videoDuration: "",
                        videoUrl: "",
                        order: 1,
                        isPaid: false,
                        content: "",
                      },
                    ]);
                    setWhatYouLearn([""]);
                    setRequirements([""]);
                    setCurrentStep(0);
                    console.log({ course, lessons });
                  }
                }}
              >
                {editModal ? "Update Course" : "Publish Course"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
