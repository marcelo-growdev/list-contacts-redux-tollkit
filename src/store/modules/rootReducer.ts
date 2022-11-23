import { combineReducers } from "@reduxjs/toolkit";

import counter from "./CounterSlice";
import contacts from "./ContactsSlice";
import login from "./LoginSlice";

export default combineReducers({
  counter,
  contacts,
  login,
});
