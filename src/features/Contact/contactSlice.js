import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactList: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    createContact: (state, action) => {
      return { ...state, contactList: [...state.contactList, action.payload] };
    },
    updateContact: (state, action) => {
      const index = state.contactList.findIndex(
        (ele) => ele.emailId === action.payload.emailId
      );
      const newContactList = [...state.contactList];
      newContactList.splice(index, 1, action.payload);
      return { ...state, contactList: newContactList };
    },
    deleteContact: (state, action) => {
      return {
        ...state,
        contactList: state.contactList.filter(
          (ele) => ele.emailId !== action.payload.emailId
        ),
      };
    },
  },
});
export const { createContact, deleteContact, updateContact } =
  contactSlice.actions;
export const getAllContacts = (state) => state.contacts.contactList;
export default contactSlice.reducer;
