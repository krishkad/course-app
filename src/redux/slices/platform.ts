import { PlatformSettings } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialPlatform {
  platform: PlatformSettings;
}

const initialState: initialPlatform = {
  platform: {} as PlatformSettings,
};

export const PlatformSetting = createSlice({
  name: "platform",
  initialState,
  reducers: {
    initializePlatform: (state, action: PayloadAction<PlatformSettings>) => {
      state.platform = action.payload;
    },
  },
});

export const { initializePlatform } = PlatformSetting.actions;
export default PlatformSetting.reducer;
