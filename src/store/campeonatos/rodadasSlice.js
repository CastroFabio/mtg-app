import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRound: null,
};

const roundsSlice = createSlice({
  name: "rounds",
  initialState,
  reducers: {
    saveSelectedRound: (state, action) => {
      state.selectedRound = action.payload;
    },
  },
});

export const getSelectedRound = (state) => state.rounds.selectedRound;

export const { saveSelectedRound } = roundsSlice.actions;

export default roundsSlice.reducer;
