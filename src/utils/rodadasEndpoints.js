import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchRodadas = async (campeonatoId, serieId) => {
  const response = await fazRequest(
    util.format(endpointRoutes.round, campeonatoId, serieId),
    "GET"
  );
  const data = await response.json();
  return data.entities;
};

export const deleteRodadas = async (campeonatoId, serieId, id) => {
  await fazRequest(
    util.format(endpointRoutes.roundById, campeonatoId, serieId, id),
    "DELETE"
  );
  return id;
};

export const createRodadas = async (campeonatoId, serieId, rodada) => {
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
};
