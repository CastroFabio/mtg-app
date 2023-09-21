import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const initialState = {
  rodadasArray: [],
  rodadaID: null,
  rodadaUpdate: { id: null, name: "" },
  error: null,
  loading: false,
};

var util = require("util");

export const fetchRodadas = createAsyncThunk(
  "rodadas/fetchRodadas",
  async (rodada) => {
    try {
      const response = await fazRequest(
        util.format(endpointRoutes.round, rodada.campeonatoID, rodada.serieID),
        "GET"
      );
      const data = await response.json();
      return data.entities;
    } catch (error) {
      return error;
    }
  }
);

const rodadasSlice = createSlice({
  name: "rodadas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      //Show all rodadas
      .addCase(fetchRodadas.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRodadas.fulfilled, (state, action) => {
        state.loading = false;
        state.rodadasArray = action.payload;
      })
      .addCase(fetchRodadas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllRodadas = (state) => state.series.rodadasArray;

export default rodadasSlice.reducer;
