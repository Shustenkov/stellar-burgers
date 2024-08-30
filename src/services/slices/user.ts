import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { USER_SLICE_NAME } from './sliceNames';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state.data,
    getUserLoginErrorSelector: (state) => state.loginUserError,
    getUserLoginRequestSelector: (state) => state.loginUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = action.error.message || '';
      })

      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserError = action.error.message || '';
        state.loginUserRequest = false;
      })

      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserRequest = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loginUserRequest = false;
      });
  }
});

export const {
  getUserSelector,
  getUserLoginErrorSelector,
  getUserLoginRequestSelector
} = userSlice.selectors;

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => getUserApi()
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    logoutApi().then((data) => {
      if (data?.success) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
        return data;
      }
      return Promise.reject(data);
    });
  }
);
