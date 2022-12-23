import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "./TransactionsSlice";

const initialState: Transaction = {
  id: 0,
  type: "C",
  value: 0,
  note: "",
};

const TransactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    setTransaction(state, action: PayloadAction<Transaction>) {
      return action.payload;
    },
    clearTransaction() {
      return initialState;
    },
  },
});

export const { setTransaction, clearTransaction } = TransactionSlice.actions;
export default TransactionSlice.reducer;
