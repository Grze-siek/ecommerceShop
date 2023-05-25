import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';

const cartItemsFromStorage = localStorage.getItem('cartItems');
const initialCartItems =
  cartItemsFromStorage && cartItemsFromStorage?.length !== 0
    ? JSON.parse(cartItemsFromStorage)
    : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress');
const initialShippingAddress =
  shippingAddressFromStorage &&
  Object.keys(shippingAddressFromStorage)?.length !== 0
    ? JSON.parse(shippingAddressFromStorage)
    : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod');
const initialPaymentMethod =
  paymentMethodFromStorage &&
  Object.keys(paymentMethodFromStorage)?.length !== 0
    ? JSON.parse(paymentMethodFromStorage)
    : null;

const initialState = {
  cartItems: initialCartItems,
  shippingAddress: initialShippingAddress,
  paymentMethod: initialPaymentMethod,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const addToCart = createAsyncThunk(
  'cart/add',
  async (cartData, thunkAPI) => {
    const { id, quantity: qty } = cartData;
    try {
      const state = thunkAPI.getState();
      const { cartItems } = state.cart;

      const existItem = cartItems.find((x) => Number(x.product) === Number(id));

      if (existItem) {
        // If the item already exists, update the quantity
        const updatedCartItems = cartItems.map((x) =>
          x.product === existItem.product ? { ...x, qty } : x
        );
        return updatedCartItems;
      } else {
        // If the item doesn't exist, add it to the cart
        const item = await cartService.addToCartService(id, qty, cartItems);
        return [...state.cart.cartItems, item];
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { cartItems } = state.cart;
      const updatedCartItems = cartItems.filter(
        (item) => item.product !== productId
      );
      await cartService.removeFromCartService(updatedCartItems);
      return updatedCartItems;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveShippingAddress = createAsyncThunk(
  'cart/shipping_address',
  async (data, thunkAPI) => {
    try {
      return await cartService.saveShippingAddress(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const savePaymentMethod = createAsyncThunk(
  'cart/payment_method',
  async (data, thunkAPI) => {
    try {
      return await cartService.savePaymentMethod(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = [...action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shippingAddress = action.payload;
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(savePaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentMethod = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
