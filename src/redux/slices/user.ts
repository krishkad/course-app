import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: Partial<User>;
}

const initialState: UserState = {
  user: {} as User,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
    },
  },
});

export const { initializeUser } = userSlice.actions;
export default userSlice.reducer;
