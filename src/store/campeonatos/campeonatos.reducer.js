import { CAMPEONATOS_ACTION_TYPES } from "./campeonatos.types";

export const CAMPEONATOS_INITIAL_STATE = {
  campeonatosMap: {},
  campeonatoTemporario: {},
};

export const campeonatosReducer = (
  state = CAMPEONATOS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CAMPEONATOS_ACTION_TYPES.SET_CAMPEONATOS_MAP:
      return { ...state, campeonatosMap: payload };
    case CAMPEONATOS_ACTION_TYPES.SET_TEMP_CAMPEONATOS_NAME:
      return { ...state, campeonatoTemporario: payload };
    default:
      return state;
  }
};
