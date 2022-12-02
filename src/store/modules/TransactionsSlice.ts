import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface Transaction {
  id: number;
  value: number;
  type: "C" | "D";
}

const adapter = createEntityAdapter<Transaction>({
  selectId: (item) => item.id,
});

export const { selectAll: selectTransactions, selectById } =
  adapter.getSelectors((state: RootState) => state.transactions);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: adapter.getInitialState(),
  reducers: {
    addOneTransaction: adapter.addOne,
    removeOneTransaction: adapter.removeOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
});

export const { addOneTransaction, addMany, updateOne } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
