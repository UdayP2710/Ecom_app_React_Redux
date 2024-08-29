// import { createContext, useContext, useEffect, useState } from "react";
// import { useLoginContext } from "./Authcontext";
// import { addDoc, onSnapshot, collection } from "firebase/firestore";
// import { db } from "../Databse_config/firebase";
// import { toast } from "react-toastify";

// const OrderContext = createContext();
// export function useOrderContext() {
//   const order = useContext(OrderContext);
//   return order;
// }
// export function OrderContexProvider({ children }) {
//   const [order, setOrder] = useState([]);
//   const { login } = useLoginContext();
//   async function updateOrderState() {
//     if (login.status) {
//       const coll_ref = collection(db, "users", login.id, "orders");
//       const unsub = onSnapshot(coll_ref, (snap) => {
//         const allorders = snap.docs.map((item) => {
//           return { ...item.data(), id: item.id };
//         });
//         setOrder([...allorders]);
//       });
//     }
//   }
//   async function addOrderToDataBase(product) {
//     const coll_ref = collection(db, "users", login.id, "orders");
//     const doc_ref = await addDoc(coll_ref, {
//       ...product,
//       Order_on: new Date().toDateString(),
//     });
//     toast.success("Order Has Been Placed.....");
//   }

//   // function to short the large title string.............
//   function shortenTitle(title, maxlength) {
//     if (title.length <= maxlength) {
//       return title; // If the title is shorter than maxLength, return it as is
//     }
//     return title.slice(0, maxlength) + "...";
//   }
//   useEffect(() => {
//     updateOrderState();
//   }, [login]);
//   return (
//     <OrderContext.Provider
//       value={{ order, setOrder, addOrderToDataBase, shortenTitle }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// }
import {
  updateOrderState,
  addOrderToDatabase,
} from "../Databse_config/databse_CRUD";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const InitialStateOfOrderList = createAsyncThunk(
  "order/initialState",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    await updateOrderState({ ...arg, dispatch, setInitialState });
  }
);
export const addOrderToDbAsync = createAsyncThunk(
  "order/add",
  async (arg, thunkAPI) => {
    await addOrderToDatabase(arg);
    thunkAPI.dispatch(addOrder({ ...arg.item, total_price: arg.total_price }));
  }
);

const INITIAL_STATE = { order: [] };
const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    setInitialState: (state, action) => {
      state.order = action.payload;
    },
    addOrder: (state, action) => {
      state.order.push(action.payload);
    },
  },
});
export const orderReducer = orderSlice.reducer;
export const orderState = (state) => state.orderReducer;
export const { addOrder, setInitialState } = orderSlice.actions;
