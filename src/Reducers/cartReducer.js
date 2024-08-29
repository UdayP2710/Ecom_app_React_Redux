import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handelAddToCart,
  updateCart,
  removeItemFromCart,
  setItemCountDB,
} from "../Databse_config/databse_CRUD";
export const setInitialStateOfCart = createAsyncThunk(
  "cart/initialState",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await updateCart({ id: arg, dispatch, cartAction });
  }
);

export const addCartItemToDatabse = createAsyncThunk(
  "cart/add",
  async (arg, thunkAPI) => {
    await handelAddToCart(arg);
    thunkAPI.dispatch(cartAction.addToCart(arg));
  }
);

export const setItemCountInDatabase = createAsyncThunk(
  "cart/setCount",
  async (arg, thunkAPI) => {
    await setItemCountDB(arg);
    thunkAPI.dispatch(cartAction.setItemCount());
  }
);

export const removeItemFromDatabse = createAsyncThunk(
  "cart/remove",
  async (arg, thunkAPI) => {
    await removeItemFromCart(arg);
    thunkAPI.dispatch(cartAction.removeFromCart());
  }
);

const cart_initialstate = { cart: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState: cart_initialstate,
  reducers: {
    setInitialState: (state, action) => {
      console.log("inside initiale action");
      console.log(action.payload);
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      state.cart.push(action.payload.product);
    },
    setItemCount: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
});

export const cartReducers = cartSlice.reducer;
export const cartAction = cartSlice.actions;
export const cartState = (state) => state.cartReducers;
