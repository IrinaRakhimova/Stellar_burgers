import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  handleForgotPassword,
  resetPassword,
  logOut,
  getUserData,
  updateUserData,
} from "../../utils/api";
import Cookies from "js-cookie";

const initialState = {
  name: "",
  email: "",
  password: "",
  success: false,
  error: null,
  token: "",
  userDataRequest: false,
  successLogout: false,
  isAuth: false,
  order: null, 
  orderRequest: false, 
  orderError: null, 
};

const createApiThunk = (type, apiCall) =>
  createAsyncThunk(type, async (arg, { rejectWithValue }) => {
    try {
      return await apiCall(arg);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const registerUserThunk = createApiThunk(
  "userData/registerUser",
  registerUser
);
export const logInThunk = createApiThunk("userData/logIn", loginUser);
export const forgotPasswordThunk = createApiThunk(
  "userData/handleForgotPassword",
  handleForgotPassword
);
export const resetPasswordThunk = createApiThunk(
  "userData/resetPassword",
  resetPassword
);
export const logOutThunk = createApiThunk("userData/exit", logOut);
export const getUserDataThunk = createApiThunk(
  "userData/getUserData",
  getUserData
);
export const updateUserDataThunk = createApiThunk(
  "userData/updateUserData",
  updateUserData
);


const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        Cookies.set("accessToken", action.payload.accessToken, { expires: 1 });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 7,
        });
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        Cookies.set("accessToken", action.payload.accessToken, { expires: 1 });
        Cookies.set("refreshToken", action.payload.refreshToken, {
          expires: 7,
        });
        state.error = null;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "LogIn failed";
      });
  },
});

export const { setName, setEmail, setPassword, setToken, resetSuccess } =
  userDataSlice.actions;

export default userDataSlice.reducer;
