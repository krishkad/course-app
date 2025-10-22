import { Course, Rating } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICourse extends Course {
  instructor: string;
  Rating?: Rating[]
}

interface CourseState {
  courses: ICourse[];
}

const initialState: CourseState = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    initialiseCourses: (state, action: PayloadAction<ICourse[]>) => {
      state.courses = action.payload;
    },
  },
});

export const { initialiseCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
