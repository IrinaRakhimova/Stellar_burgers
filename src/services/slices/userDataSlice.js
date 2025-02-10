import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const BASE_URL = "https://norma.nomoreparties.space/api";

const initialState = {
  name: "",
  email: "",
  password: "",
  success: false,
  error: null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  token: "",
};

export const registerUser = createAsyncThunk(
  'userData/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const logIn = createAsyncThunk(
  'userData/logIn',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'LogIn failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const handleForgotPassword = createAsyncThunk(
  'userData/handleForgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password reset failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'userData/resetPassword',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password reset failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const logOut = createAsyncThunk(
  'userData/exit',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password reset failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

export const getUserData = createAsyncThunk(
  'userData/getUserData',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL + '/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Password reset failed');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
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
      .addCase(registerUser.fulfilled, (state, action) => {
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
        Cookies.set("accessToken", action.payload.accessToken, { expires: 1 });
        Cookies.set("refreshToken", action.payload.refreshToken, { expires: 7 });
      })
      .addCase(logIn.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(handleForgotPassword.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(handleForgotPassword.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.success = true;
        state.error = null;
        Cookies.remove("accessToken"); 
        Cookies.remove("refreshToken");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.success = true;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload || 'Registration failed';
      })
      ;
  },
});

export const { setName, setEmail, setPassword, setToken, resetSuccess } = userDataSlice.actions;

export default userDataSlice.reducer;