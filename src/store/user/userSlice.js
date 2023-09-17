import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fazRequest, setInLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";
import jwt from "jwt-decode";

const initialState = {
  accessToken: null,
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  status: "idle" | "pending" | "succeeded" | "failed",
  error: null,
};

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async ({ username, password }) => {
    try {
      const body = JSON.stringify({ username, password });

      const response = await fazRequest(
        endpointRoutes.login,
        "POST",
        body,
        false
      );

      if (response.ok) {
        const { access_token } = await response.json();
        const decodedPayload = jwt(access_token);

        setInLocalStorage("accessToken", access_token);

        return [decodedPayload, access_token];
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
        state.currentUser = action.payload[0];
        state.accessToken = action.payload[1];
      })
      .addCase(handleLogin.pending, (state, action) => {
        state.status = "pending";
        state.loading = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = "An error has occurred!";
        state.loading = false;
        state.isLoggedIn = false;
      });
  },
});

export const { loginUser, logout } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectCurrentUserStatus = (state) => state.user.status;
export const selectCurrentUserError = (state) => state.user.error;
export const selectCurrentUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectCurrentUserAccessToken = (state) => state.user.accessToken;

export default userSlice.reducer;
