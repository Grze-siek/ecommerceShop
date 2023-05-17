import axios from 'axios';
import { addToCart, removeFromCart } from './cartSlice';

const API_URL = '/api/products/';

export const addToCartService = (itemId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(API_URL + itemId);
    console.log('data: ', data);
    const item = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    };
    dispatch(item);

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
    return item;
  } catch (error) {
    // Handle any error if needed
  }
};

export const removeFromCartService = (id, state) => (dispatch, getState) => {
  try {
    dispatch(removeFromCart(id));

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
    return {
      ...state,
      cartItems: state.cartItems.filter((x) => x.product !== id),
    };
  } catch (error) {
    // Handle any error if needed
  }
};

const cartService = {
  addToCartService,
  removeFromCartService,
};

export default cartService;
