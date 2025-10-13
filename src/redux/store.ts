// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import CoursesSlice from "./slices/courses";
import EventsSlice from "./slices/events";
import DisplaySlice from "./slices/display";
import LessonsSlice from "./slices/lessons";
import UserSlice from "./slices/user";
import StudentsSlice from "./admin/slice/all-students";
import AllCourses from "./admin/slice/all-courses";
import AllEvents from "./admin/slice/all-events";
import PaymentsSlice from "./admin/slice/payment";
import LessonProgressSlice from "./slices/lessons-progress";
import Display_Slice from "./admin/slice/display";
import AllLessonProgress from "./admin/slice/all-lesson-progress";
import AllLessonsSlice from "./admin/slice/all-lessons"

export const makeStore = () =>
  configureStore({
    reducer: {
      all_events: AllEvents,
      all_lessonProgress: AllLessonProgress,
      all_lessons: AllLessonsSlice,
      all_courses: AllCourses,
      students: StudentsSlice,
      payments: PaymentsSlice,
      display_state: Display_Slice,
      courses: CoursesSlice,
      events: EventsSlice,
      display: DisplaySlice,
      lessons: LessonsSlice,
      user: UserSlice,
      lessonsProgress: LessonProgressSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
