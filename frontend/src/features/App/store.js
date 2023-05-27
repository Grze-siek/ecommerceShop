import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productReducer from '../products/productSlice';
import cartReducer from '../cart/cartSlice';
import userReducer from '../user/userSlice';
import orderReducer from '../order/orderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
  middleware: [thunk],
});
