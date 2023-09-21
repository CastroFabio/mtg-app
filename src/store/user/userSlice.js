import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fazRequest, setInLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";
import jwt from "jwt-decode";

var util = require("util");

const initialState = {
  accessToken: null,
  currentUser: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  userPoints: 0,
  allUsers: [],
};

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const body = JSON.stringify({ username, password });

      const response = await fazRequest(
        endpointRoutes.login,
        "POST",
        body,
        false
      );

      if (response.ok === true) {
        const { access_token } = await response.json();
        const decodedPayload = jwt(access_token);

        setInLocalStorage("accessToken", access_token);

        const responseBalance = await fazRequest(
          util.format(endpointRoutes.userBalance, decodedPayload.id),
          "GET"
        );
        const balance = await responseBalance.json();

        return {
          decodedPayload,
          access_token,
          points: balance.entities[0].points,
        };
      } else {
        return rejectWithValue("Login failed");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentUserPointBalance = createAsyncThunk(
  "user/fetchCurrentUserPointBalance",
  async () => {
    try {
      const body = null;
      const response = await fazRequest(
        endpointRoutes.login,
        "GET",
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

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const response = await fazRequest(endpointRoutes.user, "GET");
      const data = await response.json();
      return data.entities;
    } catch (error) {
      return error;
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
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
        state.currentUser = action.payload.decodedPayload;
        state.accessToken = action.payload.access_token;
        state.userPoints = action.payload.points;
      })
      .addCase(handleLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = "An error has occurred!";
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginUser, logout } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectCurrentUserError = (state) => state.user.error;
export const selectCurrentUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectCurrentUserAccessToken = (state) => state.user.accessToken;
export const selectCurrentUserPoints = (state) => state.user.userPoints;
export const selectAllUsers = (state) => state.user.allUsers;

export default userSlice.reducer;
