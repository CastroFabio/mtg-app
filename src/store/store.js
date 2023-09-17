import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import campeonatosReducer from "./campeonatos/campeonatosSlice";
import userReducer from "./user/userSlice";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  campeonatos: campeonatosReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);
