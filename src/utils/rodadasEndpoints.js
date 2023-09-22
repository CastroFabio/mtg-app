import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchRodadas = async (campeonatoId, serieId) => {
  try {
    const response = await fazRequest(
      util.format(endpointRoutes.round, campeonatoId, serieId),
      "GET"
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};

export const deleteRodadas = async (campeonatoId, serieId, id) => {
  try {
    await fazRequest(
      util.format(endpointRoutes.roundById, campeonatoId, serieId, id),
      "DELETE"
    );
    return id;
  } catch (error) {
    return error;
  }
};

export const createRodadas = async (campeonatoId, serieId, rodada) => {
  try {
    const body = JSON.stringify({
      userId: rodada.userId,
      points: rodada.points,
    });
    const response = await fazRequest(
      util.format(endpointRoutes.round, campeonatoId, serieId),
      "POST",
      body
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};
