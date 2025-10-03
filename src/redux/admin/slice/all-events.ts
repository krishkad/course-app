import { Event } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEvent extends Event {
  organizer_name: string;
}

interface EventsState {
  all_events: IEvent[];
}

const initialState: EventsState = {
  all_events: [],
};

export const all_events = createSlice({
  name: "all_events",
  initialState,
  reducers: {
    initialize_all_events: (state, action: PayloadAction<IEvent[]>) => {
      state.all_events = action.payload;
    },
    add_event: (state, action: PayloadAction<IEvent>) => {
      state.all_events.push(action.payload);
    },
  },
});

export const { initialize_all_events, add_event } = all_events.actions;
export default all_events.reducer;
