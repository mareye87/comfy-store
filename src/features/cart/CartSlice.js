import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      console.log(state.cartItems);
      //if item is already in the cart just increase the amount

      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.productAmount += product.productAmount;
      } else {
        //if not then add product to the cart
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.productAmount;
      state.cartTotal += product.productAmount * product.price;

      //u can use function like this
      cartSlice.caseReducers.calculateTotals(state);
      //instead of repeating these lines
      //   state.tax = state.cartTotal * 0.1;
      //   state.orderTotal = state.cartTotal + state.tax + state.shipping;
      //   localStorage.setItem("cart", JSON.stringify(state));

      toast.success("Item added to the cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      //destructure payload to get cartID
      const { cartID } = action.payload;
      //find item with same id for later updates
      const product = state.cartItems.find((i) => i.cartID === cartID);
      //remove item
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      //update rest of the cart
      state.numItemsInCart -= product.productAmount;
      state.cartTotal -= product.productAmount * product.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from the cart");
    },
    editItem: (state, action) => {
      //in edit we can change the amount of item
      const { cartID, productAmount } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      // this formula edits amount of items in the cart
      state.numItemsInCart += productAmount - product.productAmount;
      state.cartTotal +=
        product.price * (productAmount - product.productAmount);
      product.productAmount = productAmount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Amount of item changes!");
    },

    //this function saves from repeating those 3 lines
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.tax + state.shipping;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
