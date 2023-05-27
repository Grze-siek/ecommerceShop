import axios from 'axios';

const API_URL = '/api/orders';

const getMyOrders = async (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + '/myorders/', config);

  return response.data;
};

const createOrder = async (order, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + '/add/', order, config);
  localStorage.removeItem('cartItems');

  return response.data;
};

const getOrderDetails = async (id, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `/${id}/`, config);
  return response.data;
};

const updateOrderPayment = async (id, paymentResult, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${id}/pay/`,
    paymentResult,
    config
  );

  return response.data;
};

const updateOrderDeliver = async (order, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/${order._id}/deliver/`,
    {},
    config
  );

  return response.data;
};

const getOrders = async (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/orders/', config);

  return response.data;
};

const orderService = {
  getMyOrders,
  createOrder,
  getOrderDetails,
  updateOrderPayment,
  updateOrderDeliver,
  getOrders,
};

export default orderService;
