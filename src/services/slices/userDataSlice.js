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

const initialState = {
  name: "",
  email: "",
  success: false,
  error: null,
  token: "",
  userDataRequest: false,
  successLogout: false,
  isAuth: false,
  order: null, 
  orderRequest: false, 
  orderError: null,
  resetPassword: false, 
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setResetPassword: (state, action) => { 
      state.resetPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
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
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.error = null;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "LogIn failed";
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.resetPassword = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "LogIn failed";
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || "LogIn failed";
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch user data";
      })
      ;
  },
});

export const { setName, setEmail, setToken, resetSuccess, setResetPassword } =
  userDataSlice.actions;

export default userDataSlice.reducer;
