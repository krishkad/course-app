import { LessonProgress } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AllLessonProgressState {
  lessonProgress: LessonProgress[];
}

const initialState: AllLessonProgressState = {
  lessonProgress: [],
};

export const all_lessons_progress = createSlice({
  name: "all_lesson_progress",
  initialState,
  reducers: {
    initialize_all_lesson_progress: (
      state,
      action: PayloadAction<LessonProgress[]>
    ) => {
      state.lessonProgress = action.payload;
    },
  },
});

export const { initialize_all_lesson_progress } = all_lessons_progress.actions;
export default all_lessons_progress.reducer;
