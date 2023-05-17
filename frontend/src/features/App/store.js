import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productReducer from '../products/productSlice';
import cartReducer from '../cart/cartSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const preloadedState = {
  cart: { cartItems: cartItemsFromStorage },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  middleware: [thunk],
  preloadedState,
});
