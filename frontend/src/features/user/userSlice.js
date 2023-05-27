import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

//Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userLogin: {
    userInfo: user ? user : null,
    isLoading: false,
    isError: false,
    message: '',
  },
  userRegister: {
    user: null,
    isError: false,
    isLoading: false,
    message: '',
  },
  userDetails: {
    user: {},
    isError: false,
    isLoading: false,
    message: '',
  },
  userUpdateProfile: {
    updatedProfile: {},
    isError: false,
    isLoading: false,
    message: '',
  },
  userUpdateByAdmin: {
    updatedUser: {},
    isError: false,
    isLoading: false,
    message: '',
  },
  userList: {
    users: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  deletedUser: {
    isSuccess: false,
    message: '',
  },
};

//Register new user
export const register = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;

    return thunkAPI.rejectWithValue(message);
  }
});

//Logout user
export const logout = createAsyncThunk('user/logout', async () => {
  await userService.logout();
});

export const getUserDetails = createAsyncThunk(
  'user/details',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await userService.getUserDetails(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/update',
  async (updatedUser, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await userService.updateUserProfile(updatedUser, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserList = createAsyncThunk(
  'user/getAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await userService.getUserList(token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await userService.deleteUser(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/admin/update',
  async (user, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { token } = state.user.userLogin.userInfo;
      return await userService.updateUser(user, token);
    } catch (error) {
      const message =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserUpdateProfile: (state) => {
      state.userUpdateProfile = initialState.userUpdateProfile;
    },
    resetUserRegister: (state) => {
      state.userUpdateProfile = initialState.userUpdateProfile;
    },
    resetUserUpdate: (state) => {
      return {
        ...state,
        userUpdateByAdmin: initialState.userUpdateByAdmin,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.userRegister.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userRegister.isLoading = false;
        state.userRegister = initialState.userRegister;
        state.userLogin.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.userRegister.isLoading = false;
        state.userRegister.isError = true;
        state.userRegister.message = action.payload;
        state.userRegister.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userLogin = initialState.userLogin;
        state.userList = initialState.userList;
        state.userDetails = initialState.userDetails;
      })
      .addCase(login.pending, (state) => {
        state.userLogin.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userLogin.isLoading = false;
        state.userLogin.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userLogin.isLoading = false;
        state.userLogin.isError = true;
        state.userLogin.message = action.payload;
        state.userLogin.userInfo = null;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.userDetails.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails.isLoading = false;
        state.userDetails.isSuccess = true;
        state.userDetails.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails.isLoading = false;
        state.userDetails.isError = true;
        state.userDetails.message = action.payload;
        state.userDetails.user = null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.userUpdateProfile.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userUpdateProfile.isLoading = false;
        state.userUpdateProfile.isSuccess = true;
        state.userUpdateProfile.updatedProfile = action.payload;
        state.userLogin.userInfo = action.payload;
        state.userDetails.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userUpdateProfile.isLoading = false;
        state.userUpdateProfile.isError = true;
        state.userUpdateProfile.message = action.payload;
      })
      .addCase(getUserList.pending, (state) => {
        state.userList.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList.isLoading = false;
        state.isSuccess = true;
        state.userList.users = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.userList.isLoading = false;
        state.userList.isError = true;
        state.userList.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deletedUser.isSuccess = true;
        state.deletedUser.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.userUpdateByAdmin.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdateByAdmin.isLoading = false;
        state.userUpdateByAdmin.isSuccess = true;
        state.userUpdateByAdmin.updatedUser = action.payload;
        state.userDetails.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateByAdmin.isLoading = false;
        state.userUpdateByAdmin.isError = true;
        state.userUpdateByAdmin.message = action.payload;
      });
  },
});

export const { resetUserUpdate, resetUserUpdateProfile } = userSlice.actions;
export default userSlice.reducer;
