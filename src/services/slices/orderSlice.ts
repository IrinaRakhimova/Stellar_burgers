import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createOrderRequest } from "../../utils/api";

type Order = {
  number: number;
  name: string;
};

type OrderResponse = {
  order: Order;
};

type ThunkError = {
  message: string;
};

type OrderState = {
  orderNumber: number | null;
  orderName: string;
  orderRequest: boolean;
  orderFailed: boolean;
  isModalVisible: boolean;
};

export const createOrderThunk = createAsyncThunk<
  OrderResponse,
  string[],
  { rejectValue: ThunkError }
>("order/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    const data = await createOrderRequest(ingredientIds);

    if (
      data &&
      data.order &&
      typeof data.order.number === "number" &&
      typeof data.order.name === "string"
    ) {
      return {
        order: {
          number: data.order.number,
          name: data.order.name,
        },
      };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message || "Unknown error",
      });
    } else {
      return rejectWithValue({
        message: "An unknown error occurred",
      });
    }
  }
});

const initialState: OrderState = {
  orderNumber: null,
  orderName: "",
  orderRequest: false,
  orderFailed: false,
  isModalVisible: false,
};

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
      });
  },
});

export const { showModal, hideModal } = orderSlice.actions;
export default orderSlice.reducer;
