import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  productList: {
    products: [],
    page: '',
    pages: '',
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  productTopRated: {
    products: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  productDetails: {
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  productDelete: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  productCreate: {
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  productUpdate: {
    product: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  productReview: {
    review: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
};

//Get Products
export const getProducts = createAsyncThunk(
  'product/getAll',
  async (keyword = '', thunkAPI) => {
    try {
      return await productService.getProducts(keyword);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get To Rated Products
export const getTopRatedProducts = createAsyncThunk(
  'product/getTopRated',
  async (_, thunkAPI) => {
    try {
      return await productService.getTopRatedProducts();
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
  'product/get',
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

//Delete Product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (productId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await productService.deleteProduct(productId, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create Product
export const createProduct = createAsyncThunk(
  'product/create',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await productService.createProduct(token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update Product
export const updateProduct = createAsyncThunk(
  'product/update',
  async (product, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await productService.updateProduct(product, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add product Review
export const createProductReview = createAsyncThunk(
  'product/addReview',
  async ({ id: productId, review }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await productService.createProductReview(productId, review, token);
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
    resetProductCreate: (state) => {
      state.productCreate = initialState.productCreate;
    },
    resetProductUpdate: (state) => {
      state.productUpdate = initialState.productUpdate;
    },
    resetProductReview: (state) => {
      state.productReview = initialState.productReview;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productList.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productList.isLoading = false;
        state.productList.isSuccess = true;
        state.productList.products = action.payload.products;
        state.productList.page = action.payload.page;
        state.productList.pages = action.payload.pages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productList.isLoading = false;
        state.productList.isError = true;
        state.productList.message = action.payload;
      })
      .addCase(getTopRatedProducts.pending, (state) => {
        state.productTopRated.isLoading = true;
      })
      .addCase(getTopRatedProducts.fulfilled, (state, action) => {
        state.productTopRated.isLoading = false;
        state.productTopRated.products = action.payload;
      })
      .addCase(getTopRatedProducts.rejected, (state, action) => {
        state.productTopRated.isLoading = false;
        state.productTopRated.isError = true;
        state.productTopRated.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.productDetails.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetails.isLoading = false;
        state.productDetails.isSuccess = true;
        state.productDetails.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.productDetails.isLoading = false;
        state.productDetails.isError = true;
        state.productDetails.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.productDelete.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productDelete.isLoading = false;
        state.productDelete.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productDelete.isLoading = false;
        state.productDelete.isError = true;
        state.productDelete.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.productCreate.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productCreate.isLoading = false;
        state.productCreate.isSuccess = true;
        state.productCreate.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productCreate.isLoading = false;
        state.productCreate.isError = true;
        state.productCreate.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.productUpdate.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productUpdate.isLoading = false;
        state.productUpdate.isSuccess = true;
        state.productUpdate.product = action.payload;
        state.productDetails.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productUpdate.isLoading = false;
        state.productUpdate.isError = true;
        state.productUpdate.message = action.payload;
      })
      .addCase(createProductReview.pending, (state) => {
        state.productReview.isLoading = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.productReview.isLoading = false;
        state.productReview.isSuccess = true;
        state.productReview.review = action.payload;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.productReview.isLoading = false;
        state.productReview.isError = true;
        state.productReview.message = action.payload;
      });
  },
});

export const { resetProductCreate, resetProductUpdate, resetProductReview } =
  productSlice.actions;
export default productSlice.reducer;
