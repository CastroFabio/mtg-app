import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const initialState = {
  seriesArray: [],
  serieID: null,
  serieUpdate: { id: null, name: "" },
  error: null,
  loading: false,
};

var util = require("util");

export const fetchSeries = createAsyncThunk("series/fetchSeries", async () => {
  try {
    const response = await fazRequest(endpointRoutes.serie, "GET");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
});

export const handleDeleteSerie = createAsyncThunk(
  "series/handleDeleteSerie",
  async (id, { rejectWithValue }) => {
    try {
      await fazRequest(util.format(endpointRoutes.serieByID, id), "DELETE");
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//create action
export const handleCreateSerie = createAsyncThunk(
  "series/handleCreateSerie",
  async (tempSerieName, { rejectWithValue }) => {
    try {
      const body = JSON.stringify(tempSerieName);
      return await fazRequest(util.format(endpointRoutes.serie), "POST", body);
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
      const body = JSON.stringify({ name: serieUpdate.name });
      await fazRequest(
        util.format(endpointRoutes.serieByID, serieUpdate.id),
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
      const singleSerie = state.seriesArray.filter(
        (serie) => serie.id === action.payload
      );

      state.serieUpdate = singleSerie[0];
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

export const { saveIDSerie, saveUpdateSerie } = seriesSlice.actions;

export const selectIDSerie = (state) => state.series.idserie;

export const selectAllSeries = (state) => state.series.seriesArray;

export const selectSeriesLoading = (state) => state.series.loading;

export const selectSerieUpdate = (state) => state.series.serieUpdate;

export default seriesSlice.reducer;
