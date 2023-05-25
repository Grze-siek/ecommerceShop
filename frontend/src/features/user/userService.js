import axios from 'axios';

const API_URL = '/api/users';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

//Register User
const register = async (userData) => {
  const response = await axios.post(
    API_URL + '/register/',
    { name: userData.name, email: userData.email, password: userData.password },
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Login User
const login = async ({ email, password }) => {
  const response = await axios.post(
    API_URL + '/login/',
    { username: email, password: password },
    config
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//Logout user
const logout = () => localStorage.removeItem('user');

//Get User Details
const getUserDetails = async (id, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${id}/`, config);

  return response.data;
};

//Update User Profile
const updateUserProfile = async (updatedUser, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + '/profile/update/',
    updatedUser,
    config
  );

  localStorage.setItem('user', JSON.stringify(response.data));

  return response.data;
};

//Get User List
const getUserList = async (token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//Delete User
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/delete/${id}/`, config);

  return response.data;
};

//Update User By Admin
const updateUser = async (user, token) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `/update/${user._id}/`,
    user,
    config
  );

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUserDetails,
  updateUserProfile,
  getUserList,
  deleteUser,
  updateUser,
};

export default authService;
