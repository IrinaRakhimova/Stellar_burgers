import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logOut,
  getUserData,
  updateUserData,
} from "../../utils/api";

const initialState: UserDataState = {
  name: "",
  email: "",
  success: false,
  error: null,
  request: false,
  token: "",
  successLogout: false,
  isAuth: false,
  order: null,
  resetPassword: false,
};

const createApiThunk = <T, R>(type: string, apiCall: (arg: T) => Promise<R>) =>
  createAsyncThunk(type, async (arg: T, { rejectWithValue }) => {
    try {
      return await apiCall(arg);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  });

export const registerUserThunk = createApiThunk(
  "userData/registerUser",
  registerUser
);
export const logInThunk = createApiThunk("userData/logIn", loginUser);
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
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    setResetPassword: (state, action: PayloadAction<boolean>) => {
      state.resetPassword = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRequest: (state, action: PayloadAction<boolean>) => {
      state.request = action.payload;
    },
    setSuccess: (state) => {
      state.success = true;
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
        state.request = false;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.success = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Неизвестная ошибка";
      })
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.error = null;
        state.request = false;
      })
      .addCase(logInThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(logInThunk.rejected, (state, action) => {
        state.success = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Неизвестная ошибка";
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.isAuth = true;
        state.error = null;
        state.request = false;
      })
      .addCase(getUserDataThunk.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Неизвестная ошибка";
      });
  },
});

export const {
  setName,
  setEmail,
  setToken,
  resetSuccess,
  setResetPassword,
  setError,
  setRequest,
  setSuccess,
} = userDataSlice.actions;

export default userDataSlice.reducer;
