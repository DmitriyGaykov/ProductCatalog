import {User} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorageKeys} from "../../config.ts";

interface AuthState {
  currentUser?: User | null;
  accessToken?: string | null;
  expiresAt?: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  expiresAt: null,
}

type SignInParams = {
  accessToken: string;
  expiresAt: string;
  user: User;
}

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInParams>) => {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
      state.currentUser = action.payload.user;

      localStorage.setItem(LocalStorageKeys.AccessTokenKey, action.payload.accessToken);
      localStorage.setItem(LocalStorageKeys.ExpiresAtKey, action.payload.expiresAt);
      localStorage.setItem(LocalStorageKeys.UserKey, JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.currentUser = null;

      localStorage.removeItem(LocalStorageKeys.AccessTokenKey);
      localStorage.removeItem(LocalStorageKeys.ExpiresAtKey);
      localStorage.removeItem(LocalStorageKeys.UserKey);
    }
  }
})

export const {
  signIn,
  logout
} = authSlice.actions;

export const authReducer = authSlice.reducer;