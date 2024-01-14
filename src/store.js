import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/user/UserSlice";

//go to main and wrap App with  'Provider store={store}' (from react-redux)
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
});
