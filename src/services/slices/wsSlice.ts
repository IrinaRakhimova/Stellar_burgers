import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
  orders: any | null;
  connected: boolean;
  error: string | null;
}

const initialState: WebSocketState = {
  orders: null,
  connected: false,
  error: null,
};

const wsSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    wsConnect: (state) => {
      state.connected = true;
      state.error = null;
    },
    wsDisconnect: (state) => {
      state.connected = false;
      state.orders = null;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<any>) => {
      state.orders = action.payload;
    },
  },
});

export const { wsConnect, wsDisconnect, wsError, wsMessage } = wsSlice.actions;
export default wsSlice.reducer;