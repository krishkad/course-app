import { Course } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICourse extends Course {
  instructor: string;
}

interface AllCoursesState {
  all_courses: ICourse[];
}

const initialState: AllCoursesState = {
  all_courses: [],
};

export const all_courses = createSlice({
  name: "all_courses",
  initialState,
  reducers: {
    initializeAllCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.all_courses = action.payload;
    },
    add_course: (state, action: PayloadAction<ICourse>) => {
      state.all_courses.push(action.payload);
    },
  },
});

export const { initializeAllCourses, add_course } = all_courses.actions;
export default all_courses.reducer;
