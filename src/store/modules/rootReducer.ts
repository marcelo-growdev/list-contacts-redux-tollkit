import { combineReducers } from "@reduxjs/toolkit";

import contacts from "./ContactsSlice";
import login from "./LoginSlice";
import message from "./MessageSlice";
import products from "./ProductsSlice";
import counter from "./CounterSlice";
import transactions from "./TransactionsSlice";
import transaction from "./TransactionSlice";

export default combineReducers({
  counter,
  contacts,
  login,
  message,
  products,
  transactions,
  transaction,
});
