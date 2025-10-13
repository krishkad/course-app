import { Lesson } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AllLessonsState {
  lessons: Lesson[];
}

const initialState: AllLessonsState = {
  lessons: [],
};

export const all_lessonsSlice = createSlice({
  name: "all_lessons",
  initialState,
  reducers: {
    initialize_all_lessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
  },
});

export const { initialize_all_lessons } = all_lessonsSlice.actions;
export default all_lessonsSlice.reducer;
