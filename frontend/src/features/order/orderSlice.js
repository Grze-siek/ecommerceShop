import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderService';
import { resetCart } from '../cart/cartSlice';

const initialState = {
  orderList: {
    orders: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
  },
  myOrderList: {
    orders: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
  },
  orderCreate: {
    order: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
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
};

//Get My Order List
export const getMyOrderList = createAsyncThunk(
  'order/me/getAll',
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

//Get List of all orders
export const getOrderList = createAsyncThunk(
  'order/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await orderService.getOrders(token);
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
    resetOrderPay: (state) => {
      state.paymentStatus = initialState.paymentStatus;
    },
    resetOrderDeliver: (state) => {
      state.deliverStatus = initialState.deliverStatus;
    },
    resetOrderCreate: (state) => {
      state.orderCreate = initialState.orderCreate;
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
        state.orderCreate.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderCreate.isLoading = false;
        state.orderCreate.isSuccess = true;
        state.orderCreate.order = action.payload;
        state.cart = {
          ...state.cart,
          cartItems: [],
        };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderCreate.isLoading = false;
        state.orderCreate.isError = true;
        state.orderCreate.message = action.payload;
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
      })
      .addCase(getOrderList.pending, (state) => {
        state.orderList.isLoading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList.isLoading = false;
        state.orderList.isSuccess = true;
        state.orderList.orders = action.payload;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.orderList.isLoading = false;
        state.orderList.isError = true;
        state.orderList.message = action.payload;
      });
  },
});

export const { resetOrderPay, resetOrderDeliver, resetOrderCreate } =
  orderSlice.actions;
export default orderSlice.reducer;
