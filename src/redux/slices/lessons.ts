import { Lesson } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonsState {
  lessons: Lesson[];
}

const initialState: LessonsState = {
  lessons: [],
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    initialiseLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
  },
});

export const { initialiseLessons } = lessonsSlice.actions;
export default lessonsSlice.reducer;
