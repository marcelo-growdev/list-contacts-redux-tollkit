import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { apiDelete, apiGet, apiPost } from "../../api";
import { ProductType } from "../../types";
import { ProductSaveType } from "../../types/ProductType";
import { setMessage } from "./MessageSlice";

const adapter = createEntityAdapter<ProductType>({
  selectId: (item) => item.id,
});

export const { selectAll: selectProducts, selectById } = adapter.getSelectors(
  (state: RootState) => state.products
);

export const productsGetAll = createAsyncThunk("products/getAll", async () => {
  const { data } = await apiGet("/products");

  if (data.success === "OK") {
    const { products } = data.data;
    return products;
  }

  return false;
});

export const productAdd = createAsyncThunk(
  "products/addOne",
  async (product: ProductSaveType, { dispatch }) => {
    const { data } = await apiPost("/products", product);

    if (data.success === "OK") {
      dispatch(setMessage({ msg: data.msg, type: "success" }));
      dispatch(productsGetAll());
    }

    return true;
  }
);

export const productDelete = createAsyncThunk(
  "products/deleteOne",
  async (id: number, { dispatch }) => {
    const { data } = await apiDelete(`/products/${id}`);

    if (data.success === "OK") {
      dispatch(setMessage({ msg: data.msg, type: "success" }));
      dispatch(productsGetAll());
    }
    return true;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsGetAll.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(
        productsGetAll.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          adapter.setAll(state, action.payload);
        }
      )
      .addCase(productsGetAll.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(productDelete.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(productDelete.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Excluiu");
      })
      .addCase(productDelete.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(productAdd.pending, (state, action) => {
        console.log("Executou a requisição...");
      })
      .addCase(productAdd.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Add");
      })
      .addCase(productAdd.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { addOne, addMany, updateOne } = productsSlice.actions;
export default productsSlice.reducer;
