import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTournament: null,
};

const campeonatosSlice = createSlice({
  name: "campeonatos",
  initialState,
  reducers: {
    saveSelectedTournament: (state, action) => {
      state.selectedTournament = action.payload;
    },
  },
});

export const getSelectedTournament = (state) =>
  state.campeonatos.selectedTournament;

export const { saveSelectedTournament } = campeonatosSlice.actions;

export default campeonatosSlice.reducer;
