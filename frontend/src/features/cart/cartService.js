import axios from 'axios';

export const addToCartService = async (itemId, qty, cartItems) => {
  try {
    const { data } = await axios.get(`/api/products/${itemId}`);

    const item = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };

    const updatedCartItems = [...cartItems, item]; // Add the new item to the existing cart items

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    return item;
  } catch (error) {
    // Handle any error if needed
    console.log(error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const removeFromCartService = (updatedCartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  } catch (error) {
    console.log(error);
  }
};

export const saveShippingAddress = async (data) => {
  try {
    localStorage.setItem('shippingAddress', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savePaymentMethod = async (data) => {
  try {
    localStorage.setItem('paymentMethod', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cartService = {
  addToCartService,
  removeFromCartService,
  saveShippingAddress,
  savePaymentMethod,
};

export default cartService;
