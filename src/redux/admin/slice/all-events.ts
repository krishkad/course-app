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
    remove_events: (state, action: PayloadAction<string>) => {
      const updated_events = state.all_events.filter(
        (event) => event.id !== action.payload
      );
      state.all_events = updated_events;
    },
    update_event: (state, action: PayloadAction<IEvent>) => {
      const updated_events = state.all_events.map((event) => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            ...action.payload, // assuming `updatedData` contains the fields to update
          };
        }
        return event;
      });
      state.all_events = updated_events;
    },
  },
});

export const { initialize_all_events, add_event, remove_events, update_event } =
  all_events.actions;
export default all_events.reducer;
