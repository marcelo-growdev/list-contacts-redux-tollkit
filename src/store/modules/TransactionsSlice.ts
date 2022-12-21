import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "..";

interface Transaction {
  id: number;
  value: number;
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
    deleteTransaction: transactionAdapter.removeOne,
    clearTransaction: transactionAdapter.removeAll,
  },
});

export const { createTransaction, clearTransaction, deleteTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
