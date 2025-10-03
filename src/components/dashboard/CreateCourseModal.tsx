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
import { Course } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

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
  edit_course?: Course;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for back
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [lessons, setLessons] = useState([
    { id: Date.now(), title: "", duration: "", vidoeUrl: "" },
  ]);
  const [course, setCourse] = useState<Course>({} as Course);

  useEffect(() => {
    if (editModal) {
      setCourse(edit_course as Course);
    }
  }, [edit_course, editModal]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCourseImage(file);
  };

  const handleAddLesson = () => {
    setLessons([...lessons, { id: Date.now(), title: "", duration: "", vidoeUrl: "" }]);
  };

  const handleRemoveLesson = (id: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const handleLessonChange = (id: number, field: string, value: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, [field]: value } : lesson
      )
    );
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
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

  const steps = [
    {
      title: "Course Info",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={course.title}
                onChange={handleOnChange}
                placeholder="Advanced React"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setCourse({ ...course, category: value })
                }
              >
                <SelectTrigger>
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
              <Label htmlFor="image">Course Cover Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {courseImage && (
                <img
                  src={URL.createObjectURL(courseImage)}
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
              value={course.description}
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
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="border p-4 rounded-md relative bg-white shadow-sm"
            >
              <div className="absolute top-2 right-2">
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
              <Label>Lesson {index + 1} Title</Label>
              <Input
                value={lesson.title}
                onChange={(e) =>
                  handleLessonChange(lesson.id, "title", e.target.value)
                }
              />
              <Label className="mt-2 block">Lesson Duration</Label>
              <Input
                type="time"
                step="60"
                value={lesson.duration}
                onChange={(e) =>
                  handleLessonChange(lesson.id, "duration", e.target.value)
                }
              />
              <Label className="mt-2 block">Video Url</Label>
              <Input
                type="text"
                step="60"
                value={lesson.duration}
                onChange={(e) =>
                  handleLessonChange(lesson.id, "videoUrl", e.target.value)
                }
              />
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
          <div className="flex gap-4">
            <Button variant="outline">Free</Button>
            <Button variant="default">Paid</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Price ($)</Label>
              <Input type="number" placeholder="49.99" />
            </div>
            <div>
              <Label>Discount (%)</Label>
              <Input type="number" placeholder="10" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Preview",
      content: (
        <div className="space-y-4 text-sm">
          <h4 className="font-semibold">Course Summary</h4>
          <div className="bg-muted/30 rounded-md p-4">
            <p>
              <strong>Title:</strong> Advanced React
            </p>
            <p>
              <strong>Category:</strong> Web Development
            </p>
            <p>
              <strong>Lessons:</strong> {lessons.length}
            </p>
            <p>
              <strong>Price:</strong> $49.99
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

  return (
    <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
      <DialogContent className="w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Create New Course
          </DialogTitle>
        </DialogHeader>

        <div className="relative min-h-[350px]">
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

        <DialogFooter className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Save Draft
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={() => setCreateModalOpen(false)}>
                Publish Course
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
