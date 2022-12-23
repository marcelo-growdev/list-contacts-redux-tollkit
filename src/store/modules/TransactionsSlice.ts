import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "..";

export interface Transaction {
  id: number;
  value: number;
  note?: string;
  type: "C" | "D";
}

const transactionAdapter = createEntityAdapter<Transaction>({
  selectId: (item) => item.id,
});

export const {
  selectAll: selectTransactions,
  selectById: selectTransactionById,
} = transactionAdapter.getSelectors((state: RootState) => state.transactions);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionAdapter.getInitialState(),
  reducers: {
    createTransaction: transactionAdapter.addOne,
    updateTransaction: transactionAdapter.updateOne,
    deleteTransaction: transactionAdapter.removeOne,
    clearTransactions: transactionAdapter.removeAll,
  },
});

export const {
  createTransaction,
  clearTransactions,
  deleteTransaction,
  updateTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
