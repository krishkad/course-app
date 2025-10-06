import { LessonProgress } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonProgressState {
  lessonProgress: LessonProgress[];
}

const initialState: LessonProgressState = {
  lessonProgress: [],
};

export const lesssonProgressSlice = createSlice({
  name: "lessonProgress",
  initialState,
  reducers: {
    initializeLessonProgress: (
      state,
      action: PayloadAction<LessonProgress[]>
    ) => {
      state.lessonProgress = action.payload;
    },
    add_lessonProgress: (state, action: PayloadAction<LessonProgress>) => {
      state.lessonProgress.push(action.payload);
    },
  },
});

export const { initializeLessonProgress, add_lessonProgress } =
  lesssonProgressSlice.actions;
export default lesssonProgressSlice.reducer;
