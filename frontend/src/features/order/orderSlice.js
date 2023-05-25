import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderService';
import { resetCart } from '../cart/cartSlice';

const initialState = {
  myOrderList: {
    orders: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
  },
  createOrder: {},
  orderDetails: {},
  paymentStatus: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  deliverStatus: {
    orders: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Get My Order List
export const getMyOrderList = createAsyncThunk(
  'order/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await orderService.getMyOrders(token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create New Order
export const createOrder = createAsyncThunk(
  'order/create',
  async (order, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      const createdOrder = await orderService.createOrder(order, token);

      // Reset the cartItems state to an empty array
      thunkAPI.dispatch(resetCart());
      console.log('createsOrder: ', createdOrder);
      return createdOrder;
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get order details
export const getOrderDetails = createAsyncThunk(
  'order/details',
  async (id, thunkAPI) => {
    try {
      console.log('id: ', id);
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await orderService.getOrderDetails(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update payment for order
export const updateOrderPay = createAsyncThunk(
  'order/pay',
  async (id, paymentResult, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      const updatedOrderDetails = await orderService.updateOrderPayment(
        id,
        paymentResult,
        token
      );
      return updatedOrderDetails;
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update deliver status for order
export const updateOrderDeliver = createAsyncThunk(
  'order/deliver',
  async (order, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      const updatedOrderDetails = await orderService.updateOrderDeliver(
        order,
        token
      );
      return updatedOrderDetails;
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.myOrderList = initialState.myOrderList;
      state.createOrder = initialState.createOrder;
      state.orderDetails = initialState.orderDetails;
      state.orders = initialState.orders;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrderList.pending, (state) => {
        state.myOrderList.isLoading = true;
      })
      .addCase(getMyOrderList.fulfilled, (state, action) => {
        state.myOrderList.isLoading = false;
        state.myOrderList.isSuccess = true;
        state.myOrderList.orders = action.payload;
      })
      .addCase(getMyOrderList.rejected, (state, action) => {
        state.myOrderList.isLoading = false;
        state.myOrderList.isError = true;
        state.myOrderList.message = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createOrder = action.payload;
        state.cart = {
          ...state.cart,
          cartItems: [], // Set cartItems to an empty array
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orderDetails.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateOrderPay.pending, (state) => {
        state.paymentStatus.isLoading = true;
      })
      .addCase(updateOrderPay.fulfilled, (state, action) => {
        state.paymentStatus.isLoading = false;
        state.paymentStatus.isSuccess = true;
        state.paymentStatus = action.payload;
      })
      .addCase(updateOrderPay.rejected, (state, action) => {
        state.paymentStatus.isLoading = false;
        state.paymentStatus.isError = true;
        state.paymentStatus.message = action.payload;
      })
      .addCase(updateOrderDeliver.pending, (state) => {
        state.deliverStatus.isLoading = true;
      })
      .addCase(updateOrderDeliver.fulfilled, (state, action) => {
        state.deliverStatus.isLoading = false;
        state.deliverStatus.isSuccess = true;
        state.deliverStatus.orders = action.payload;
      })
      .addCase(updateOrderDeliver.rejected, (state, action) => {
        state.deliverStatus.isLoading = false;
        state.deliverStatus.isError = true;
        state.deliverStatus.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
