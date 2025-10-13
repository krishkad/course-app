import { Display } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DisplayState {
  display: Display;
}

const initialState: DisplayState = {
  display: {} as Display,
};

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    initialize_display: (state, action: PayloadAction<Display>) => {
      state.display = action.payload;
    },
  },
});

export const { initialize_display } = displaySlice.actions;
export default displaySlice.reducer;
