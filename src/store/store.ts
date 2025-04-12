import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "../slices/burgerConstructorSlice";
import orderReducer from "../slices/orderSlice";
import ingredientsReducer from "../slices/ingredientsSlice";
import userDataReducer from "../slices/userDataSlice";
import wsReducer from "../slices/wsSlice";
import { wsMiddleware } from "../utils/wsMiddleware";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    userData: userDataReducer,
    websocket: wsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
