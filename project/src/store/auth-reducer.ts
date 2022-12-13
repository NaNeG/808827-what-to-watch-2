import { createSlice } from '@reduxjs/toolkit';
import { ReducerType } from '../const';
import { dropToken, saveToken } from '../services/token';
import { UserState } from '../types/app-state.type';
import AuthStatus from '../types/auth-status.enum';
import { checkAuth, login, logout } from './action';

const initialState: UserState = {
  authorizationStatus: AuthStatus.NoAuth,
  avatar: null,
};

export const userReducer = createSlice({
  name: ReducerType.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.avatar = null;
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthStatus.Authorized;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthStatus.Authorized;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
      });
  },
});
