import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginCheckInDataBase,
  registerUser,
} from "../Databse_config/databse_CRUD";
//............to check login credentials && to register user in database...............//
//............using redux tolkit createAsyncThunk function to make async calls to databse for login...............//
export const checkLogin = createAsyncThunk(
  "user/login",
  async (arg, thunkAPI) => {
    const response = await loginCheckInDataBase(arg);
    thunkAPI.dispatch(userActions.setLogin(response.userDocId));
    return;
  }
);

//............using redux tolkit createAsyncThunk function to make async calls to databse for registration...............//

export const registringUser = createAsyncThunk(
  "user/register",
  async (arg, thunkAPI) => {
    const response = await registerUser(arg);
    thunkAPI.dispatch(userActions.setRegister(response.docid));
  }
);

const initial_state = { login: false, user_id: null };

const userSlice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    setLogin: (state, action) => {
      state.login = true;
      state.user_id = action.payload;
    },
    setLogout: (state, action) => {
      state.login = false;
    },
    setRegister: (state, action) => {
      state.login = true;
      state.user_id = action.payload;
    },
  },
});
export const userActions = userSlice.actions; // export actions........
export const userReducer = userSlice.reducer; // export reducer for store......
export const userState = (state) => state.userReducer; // export state......
