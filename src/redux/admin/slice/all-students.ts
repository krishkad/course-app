import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentsState {
  students: User[];
}

const initialState: StudentsState = {
  students: [],
};

export const all_students_slice = createSlice({
  name: "all_students",
  initialState,
  reducers: {
    initialize_all_students: (state, action: PayloadAction<User[]>) => {
      state.students = action.payload;
    },
  },
});

export const { initialize_all_students } = all_students_slice.actions;
export default all_students_slice.reducer;
