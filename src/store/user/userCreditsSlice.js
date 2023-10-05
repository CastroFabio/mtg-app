import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUserID: null,
};

const userCredits = createSlice({
  name: "userCredits",
  initialState,
  reducers: {
    saveSelectedUserID: (state, action) => {
      state.selectedUserID = action.payload;
    },
  },
});

export const getSelectedUserID = (state) => state.userCredits.selectedUserID;

export const { saveSelectedUserID } = userCredits.actions;

export default userCredits.reducer;
