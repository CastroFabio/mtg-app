import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { campeonatosReducer } from "./campeonatos/campeonatos.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  campeonatos: campeonatosReducer,
});
