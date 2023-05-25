import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Get Products
export const getProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Product
export const getProduct = createAsyncThunk(
  'products/get',
  async (productId, thunkAPI) => {
    try {
      return await productService.getProduct(productId);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => {
      state.products = initialState.products;
      state.product = initialState.product;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
