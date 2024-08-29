import { configureStore } from "@reduxjs/toolkit";
import { cartReducers } from "./Reducers/cartReducer";
import { userReducer } from "./Reducers/userReducer";
import { orderReducer } from "./Reducers/orderReducer";
export const store = configureStore({
  reducer: { userReducer, cartReducers, orderReducer },
});
