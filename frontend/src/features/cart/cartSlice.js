import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  cartItems: [],
  shippingAddress: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ itemId, qty }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const existItem = state.cartItems.find((x) => x.product === itemId);

      if (existItem) {
        // If the item already exists, update the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? x.qty + existItem.qty : x
          ),
        };
      } else {
        // If the item doesn't exist, add it to the cart
        const { item } = await cartService.addToCartService(itemId, qty);

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
      return await cartService.removeFromCartService(productId, state);
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
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
