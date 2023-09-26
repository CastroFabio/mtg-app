import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchSeries = async (campeonatoId) => {
  const response = await fazRequest(
    util.format(endpointRoutes.serie, campeonatoId),
    "GET"
  );
  const data = await response.json();
  return data.entities;
};

export const deleteSeries = async (campeonatoId, id) => {
  await fazRequest(
    util.format(endpointRoutes.serieById, campeonatoId, id),
    "DELETE"
  );
  return id;
};

export const createSeries = async (campeonatoId, serie) => {
  const body = JSON.stringify({
    name: serie.name,
    date: serie.date,
  });
  const response = await fazRequest(
    util.format(endpointRoutes.serie, campeonatoId),
    "POST",
    body
  );
  const data = await response.json();
  return data.entities;
};

export const updateSeries = async (campeonatoId, serie) => {
  const body = JSON.stringify({
    name: serie.name,
    date: serie.date,
  });
  const response = await fazRequest(
    util.format(endpointRoutes.serieById, campeonatoId, serie.id),
    "PATCH",
    body
  );
  const data = await response.json();
  return data.entities;
};
