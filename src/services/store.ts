import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./slices/burgerConstructorSlice";
import orderReducer from "./slices/orderSlice";
import ingredientsReducer from "./slices/ingredientsSlice";
import userDataReducer from "./slices/userDataSlice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    userData: userDataReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
