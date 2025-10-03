import { Event } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEvent extends Event {
  organizer_name: string
}

interface EventsState {
  events: IEvent[];
}

const initialState: EventsState = {
  events: [] as IEvent[],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    initializeEvents: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
    },
  },
});

export const { initializeEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
