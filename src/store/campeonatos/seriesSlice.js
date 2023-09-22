import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSerie: null,
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    saveSelectedSerie: (state, action) => {
      state.selectedSerie = action.payload;
    },
  },
});

export const getSelectedSerie = (state) => state.series.selectedSerie;

export const { saveSelectedSerie } = seriesSlice.actions;

export default seriesSlice.reducer;
