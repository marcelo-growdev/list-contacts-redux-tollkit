import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConuterType {
  value: number;
}

const initialState: ConuterType = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    aumentar: (state) => {
      state.value = state.value + 1;
    },
    diminuir: (state) => {
      if (state.value === 0) {
        return;
      }

      state.value = state.value - 1;
    },
    aumentarComValor: (state, action: PayloadAction<number>) => {
      state.value = state.value + action.payload;
    },
  },
});

export const { aumentar, diminuir, aumentarComValor } = counterSlice.actions;
export default counterSlice.reducer;
