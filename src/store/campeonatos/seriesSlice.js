import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const initialState = {
  seriesArray: [],
  serieID: null,
  serieUpdate: { id: null, name: "" },
  serieToRodada: {
    campeonatoID: null,
    nameCampeonato: "",
    serieID: null,
    nameSerie: "",
  },
  error: null,
  loading: false,
};

var util = require("util");

export const fetchSeries = createAsyncThunk(
  "series/fetchSeries",
  async (campeonatoID) => {
    try {
      const response = await fazRequest(
        util.format(endpointRoutes.serie, campeonatoID),
        "GET"
      );
      const data = await response.json();
      return data.entities;
    } catch (error) {
      return error;
    }
  }
);

export const handleDeleteSerie = createAsyncThunk(
  "series/handleDeleteSerie",
  async ({ campeonatoID, id }) => {
    try {
      await fazRequest(
        util.format(endpointRoutes.serieByID, campeonatoID, id),
        "DELETE"
      );
      return id;
    } catch (error) {
      return error;
    }
  }
);

//create action
export const handleCreateSerie = createAsyncThunk(
  "series/handleCreateSerie",
  async (newSerie, { rejectWithValue }) => {
    try {
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const currentDate = `${year}-${month}-${day}`;

      const body = JSON.stringify({
        name: newSerie.tempSerieName,
        date: currentDate,
      });
      const response = await fazRequest(
        util.format(endpointRoutes.serie, newSerie.campeonatoID),
        "POST",
        body
      );
      const data = await response.json();
      return data.entities;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const handleUpdateSerie = createAsyncThunk(
  "Series/handleUpdateSerie",
  async (serieUpdate) => {
    try {
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const currentDate = `${year}-${month}-${day}`;

      const body = JSON.stringify({
        name: serieUpdate.name,
        date: currentDate,
      });
      await fazRequest(
        util.format(
          endpointRoutes.serieByID,
          serieUpdate.campeonatoID,
          serieUpdate.id
        ),
        "PATCH",
        body
      );
      return serieUpdate;
    } catch (error) {
      return error;
    }
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    saveIDSerie: (state, action) => {
      state.serieID = action.payload;
    },
    saveUpdateSerie: (state, action) => {
      const singleSerie = state.seriesArray.filter((serie) => {
        return serie.id === action.payload;
      });

      state.serieUpdate = singleSerie[0];
    },
    firstTimeRenderSerie: (state, action) => {
      state.seriesArray = initialState;
    },
    saveSerieToRodada: (state, action) => {
      state.serieToRodada = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      //Delete serie
      .addCase(handleDeleteSerie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleDeleteSerie.fulfilled, (state, action) => {
        if (action.payload) {
          state.seriesArray = state.seriesArray.filter(
            (serie) => serie.id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(handleDeleteSerie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Show all series
      .addCase(fetchSeries.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.seriesArray = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Create serie
      .addCase(handleCreateSerie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleCreateSerie.fulfilled, (state, action) => {
        state.loading = false;
        state.seriesArray.push(action.payload);
      })
      .addCase(handleCreateSerie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update serie
      .addCase(handleUpdateSerie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUpdateSerie.fulfilled, (state, action) => {
        state.loading = false;
        state.seriesArray = state.seriesArray.map((serie) => {
          return serie.id === action.payload.id
            ? { ...serie, name: action.payload.name }
            : serie;
        });
      })
      .addCase(handleUpdateSerie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  saveIDSerie,
  saveUpdateSerie,
  firstTimeRenderSerie,
  saveSerieToRodada,
} = seriesSlice.actions;

export const selectIDSerie = (state) => state.series.serieID;

export const selectAllSeries = (state) => state.series.seriesArray;

export const selectSeriesLoading = (state) => state.series.loading;

export const selectSerieUpdate = (state) => state.series.serieUpdate;

export const selectSerieToRodada = (state) => state.series.serieToRodada;

export default seriesSlice.reducer;
