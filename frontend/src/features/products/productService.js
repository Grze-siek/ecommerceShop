import axios from 'axios';

const API_URL = '/api/products/';

const getProducts = async (keyword) => {
  const response = await axios.get(API_URL + keyword);

  return response.data;
};

const getTopRatedProducts = async () => {
  const response = await axios.get(API_URL + 'top/');

  return response.data;
};

const getProduct = async (productId) => {
  const response = await axios.get(API_URL + `${productId}/`);

  return response.data;
};

const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `delete/${productId}/`, config);

  return response.data;
};

const createProduct = async (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'create/', {}, config);

  return response.data;
};

const updateProduct = async (product, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `update/${product._id}/`,
    product,
    config
  );

  return response.data;
};

const createProductReview = async (productId, review, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `${productId}/reviews/`,
    review,
    config
  );

  return response.data;
};

const productService = {
  getProducts,
  getTopRatedProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};

export default productService;
