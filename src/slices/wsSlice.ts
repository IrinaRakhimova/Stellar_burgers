import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketResponse {
  orders: Order[];
  total: number;
  totalToday: number;
}

interface WebSocketState {
  allOrders: Order[];
  userOrders: Order[];
  total: number | null;
  totalToday: number | null;
  connected: boolean;
  error: string | null;
}

export const initialState: WebSocketState = {
  allOrders: [],
  userOrders: [],
  total: null,
  totalToday: null,
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
      state.allOrders = [];
      state.userOrders = [];
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (
      state,
      action: PayloadAction<{ type: "all" | "my"; data: WebSocketResponse }>
    ) => {
      if (action.payload.type === "all") {
        state.allOrders = action.payload.data.orders || [];
        state.total = action.payload.data.total || 0;
        state.totalToday = action.payload.data.totalToday || 0;
      } else {
        state.userOrders = action.payload.data.orders || [];
      }
    },
  },
});

export const { wsConnect, wsDisconnect, wsError, wsMessage } = wsSlice.actions;
export default wsSlice.reducer;
