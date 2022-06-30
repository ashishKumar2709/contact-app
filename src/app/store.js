import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/Contact/contactSlice.js";

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
