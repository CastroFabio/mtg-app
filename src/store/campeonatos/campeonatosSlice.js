import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const initialState = {
  campeonatosArray: [],
  campeonatoID: null,
  campeonatoUpdate: { id: null, name: "" },
  error: null,
  loading: false,
};

var util = require("util");

export const fetchCampeonatos = createAsyncThunk(
  "campeonatos/fetchCampeonatos",
  async () => {
    try {
      const response = await fazRequest(endpointRoutes.tournament, "GET");
      const data = await response.json();
      return data.entities;
    } catch (error) {
      return error;
    }
  }
);

export const handleDeleteCampeonato = createAsyncThunk(
  "campeonatos/handleDeleteCampeonato",
  async (id, { rejectWithValue }) => {
    try {
      await fazRequest(
        util.format(endpointRoutes.tournamentByID, id),
        "DELETE"
      );
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//create action
export const handleCreateCampeonato = createAsyncThunk(
  "campeonatos/handleCreateCampeonato",
  async (tempCampeonatoName, { rejectWithValue }) => {
    try {
      const body = JSON.stringify(tempCampeonatoName);
       const response = await fazRequest(
        util.format(endpointRoutes.tournament),
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
export const handleUpdateCampeonato = createAsyncThunk(
  "campeonatos/handleUpdateCampeonato",
  async (campeoantoUpdated) => {
    try {
      const body = JSON.stringify({ name: campeoantoUpdated.name });
      await fazRequest(
        util.format(endpointRoutes.tournamentByID, campeoantoUpdated.id),
        "PATCH",
        body
      );
      return campeoantoUpdated;
    } catch (error) {
      return error;
    }
  }
);

const campeonatosSlice = createSlice({
  name: "campeonatos",
  initialState,
  reducers: {
    saveIDCampeonato: (state, action) => {
      state.campeonatoID = action.payload;
    },
    saveUpdateCampeonato: (state, action) => {
      const singleCampeonato = state.campeonatosArray.filter(
        (campeonato) => campeonato.id === action.payload
      );

      state.campeonatoUpdate = singleCampeonato[0];
    },
  },
  extraReducers(builder) {
    builder
      //Delete tournament
      .addCase(handleDeleteCampeonato.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleDeleteCampeonato.fulfilled, (state, action) => {
        if (action.payload) {
          state.campeonatosArray = state.campeonatosArray.filter(
            (campeonato) => campeonato.id !== action.payload
          );
        }
        state.loading = false;
      })
      .addCase(handleDeleteCampeonato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Show all tournaments
      .addCase(fetchCampeonatos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCampeonatos.fulfilled, (state, action) => {
        state.loading = false;
        state.campeonatosArray = action.payload;
      })
      .addCase(fetchCampeonatos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Create tournament
      .addCase(handleCreateCampeonato.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleCreateCampeonato.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleCreateCampeonato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update tournament
      .addCase(handleUpdateCampeonato.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleUpdateCampeonato.fulfilled, (state, action) => {
        state.loading = false;
        state.campeonatosArray = state.campeonatosArray.map((campeonato) => {
          return campeonato.id === action.payload.id
            ? { ...campeonato, name: action.payload.name }
            : campeonato;
        });
      })
      .addCase(handleUpdateCampeonato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveIDCampeonato, saveUpdateCampeonato } =
  campeonatosSlice.actions;

export const selectIDCampeonato = (state) => state.campeonatos.idCampeonato;

export const selectAllCampeonatos = (state) =>
  state.campeonatos.campeonatosArray;

export const selectCampeonatosLoading = (state) => state.campeonatos.loading;

export const selectCampeonatoUpdate = (state) =>
  state.campeonatos.campeonatoUpdate;

export default campeonatosSlice.reducer;
