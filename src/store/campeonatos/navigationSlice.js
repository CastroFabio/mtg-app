import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
  buttonAction: null,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setButtonAction: (state, action) => {
      state.buttonAction = action.payload;
    },
  },
});

export const getUrl = (state) => state.navigation?.url;
export const getButtonAction = (state) => state.navigation?.buttonAction;

export const { setUrl, setButtonAction } = navigationSlice.actions;

export default navigationSlice.reducer;
