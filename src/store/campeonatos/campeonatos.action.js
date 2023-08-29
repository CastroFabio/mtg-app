import { createAction } from "../../utils/createAction";
import { CAMPEONATOS_ACTION_TYPES } from "./campeonatos.types";

export const setCampeonatosMap = (campeonatosMap) =>
  createAction(CAMPEONATOS_ACTION_TYPES.SET_CAMPEONATOS_MAP, campeonatosMap);
