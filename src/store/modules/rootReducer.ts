import { combineReducers } from "@reduxjs/toolkit";

import counter from "./CounterSlice";
import contacts from "./ContactsSlice";
import login from "./LoginSlice";
import message from "./MessageSlice";
import transactions from "./TransactionsSlice";

export default combineReducers({
  counter,
  contacts,
  login,
  message,
  transactions,
});
