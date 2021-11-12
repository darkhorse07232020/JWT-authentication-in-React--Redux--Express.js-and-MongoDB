import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginAPI, registerAPI, autoLoginAPI, signInWithGoogle } from 'services/auth';
import { setErrorByType } from 'store/error-handling';

const loginUser = createAsyncThunk('user/login', async (data: UserInfo, thunkAPI) => {
  try {
    const response = await loginAPI(data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error: any) {
    setErrorByType(thunkAPI, error.response.data, error.response.status, 'login');
    return null;
  }
});

const loginGoogle = createAsyncThunk('user/login/google', async (data: UserInfo, thunkAPI) => {
  try {
    const response = await signInWithGoogle(data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error: any) {
    setErrorByType(thunkAPI, error.response.data, error.response.status, 'login');
    return null;
  }
});

const logOutUser = createAsyncThunk('user/logOut', () => {
  localStorage.removeItem('token');
  return null;
});

const autoLoginUser = createAsyncThunk('user/autologin', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const response = await autoLoginAPI();
    return response.data.user;
  } catch (error: any) {
    setErrorByType(thunkAPI, error.response.data, error.response.status, 'autoLogin');
    return null;
  }
});

const registerUser = createAsyncThunk('user/register', async (data: UserInfo, thunkAPI) => {
  try {
    const response = await registerAPI(data);
    const { message } = response.data;
    return message;
  } catch (error: any) {
    setErrorByType(thunkAPI, error.response.data, error.response.status, 'register');
    return null;
  }
});

export { loginUser, registerUser, logOutUser, autoLoginUser, loginGoogle };
