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
    remove_course: (state, action: PayloadAction<string>) => {
      const updated_courses = state.all_courses.filter(
        (course) => course.id !== action.payload
      );
      state.all_courses = updated_courses;
    },
    update_course: (state, action: PayloadAction<ICourse>) => {
      const updated_courses = state.all_courses.map((course) => {
        if (course.id === action.payload.id) {
          return {
            ...course,
            ...action.payload, // assuming `updatedData` contains the fields to update
          };
        }
        return course;
      });
      state.all_courses = updated_courses;
    },
  },
});

export const {
  initializeAllCourses,
  add_course,
  remove_course,
  update_course,
} = all_courses.actions;
export default all_courses.reducer;
