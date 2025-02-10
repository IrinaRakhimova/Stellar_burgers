import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderRequest } from "../../utils/api";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const data = await createOrderRequest(ingredientIds);

      if (data && data.order && data.order.number && data.name) {
        return {
          orderNumber: data.order.number,
          orderName: data.name,
        };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message || "Unknown error");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    orderName: "",
    orderRequest: false,
    orderFailed: false,
    isModalVisible: false,
  },
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
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderNumber = action.payload.orderNumber;
        state.orderName = action.payload.orderName;
        state.isModalVisible = true;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export const { showModal, hideModal } = orderSlice.actions;
export default orderSlice.reducer;