import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

// set up root reducer with multiple slices
const store = configureStore({
  reducer : {
    ui : uiSlice.reducer,
    cart : cartSlice.reducer
  }
})

export default store;