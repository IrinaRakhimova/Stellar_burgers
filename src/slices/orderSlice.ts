import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createOrderRequest, fetchOrderByNumber } from "../utils/api";
import { RootState } from "../store/store";

interface OrderResponse {
  order: Order;
}

interface ThunkError {
  message: string;
}

interface OrderState {
  order: Order | null;
  orderNumber: number | null;
  orderName: string;
  orderRequest: boolean;
  orderFailed: boolean;
  isModalVisible: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orderNumber: null,
  orderName: "",
  orderRequest: false,
  orderFailed: false,
  isModalVisible: false,
  loading: false,
  error: null,
};

export const createOrderThunk = createAsyncThunk<
  OrderResponse,
  string[],
  { rejectValue: ThunkError }
>("order/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    const data = await createOrderRequest(ingredientIds);

    if (data?.order?.number && typeof data.order.name === "string") {
      return { order: data.order };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: unknown) {
    return rejectWithValue({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

export const fetchOrderByNumberThunk = createAsyncThunk<
  Order,
  number,
  { rejectValue: string; state: RootState }
>(
  "order/fetchOrderByNumber",
  async (orderNumber, { getState, rejectWithValue }) => {
    const state = getState();

    const existingOrder =
      state.websocket.allOrders.find(
        (order: { number: number }) => order.number === orderNumber
      ) ||
      state.websocket.userOrders.find(
        (order: { number: number }) => order.number === orderNumber
      );

    if (existingOrder) {
      return existingOrder;
    }

    try {
      const response = await fetchOrderByNumber(orderNumber);
      if (response.orders.length > 0) {
        return response.orders[0];
      } else {
        return rejectWithValue("Order not found");
      }
    } catch (error: unknown) {
      return rejectWithValue("Failed to fetch order");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isModalVisible = true;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
    },
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
        state.isModalVisible = true;
      })
      .addCase(
        createOrderThunk.fulfilled,
        (state, action: PayloadAction<OrderResponse>) => {
          state.orderRequest = false;
          state.orderNumber = action.payload.order.number;
          state.orderName = action.payload.order.name;
          state.isModalVisible = true;
        }
      )
      .addCase(createOrderThunk.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      })

      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(fetchOrderByNumberThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { showModal, hideModal, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
