import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContactsType, ContactType } from "../../types";

const initialState: ContactsType = [];

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<ContactType>) {
      state.push(action.payload);
    },
    deleteContact(state, action: PayloadAction<ContactType>) {
      const index = state.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.phone === action.payload.phone
      );

      if (index >= 0) {
        state.splice(index, 1);
      }
    },
    clear() {
      return initialState;
    },
  },
});

export const { addContact, deleteContact, clear } = contactsSlice.actions;
export default contactsSlice.reducer;
