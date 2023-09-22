import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchSeries = async (campeonatoId) => {
  try {
    const response = await fazRequest(
      util.format(endpointRoutes.serie, campeonatoId),
      "GET"
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};

export const deleteSeries = async (campeonatoId, id) => {
  try {
    await fazRequest(
      util.format(endpointRoutes.serieByID, campeonatoId, id),
      "DELETE"
    );
    return id;
  } catch (error) {
    return error;
  }
};

export const createSeries = async (campeonatoId, serie) => {
  try {
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
  } catch (error) {
    return error;
  }
};

export const updateSeries = async (campeonatoId, serie) => {
  try {
    const body = JSON.stringify({
      name: serie.name,
      date: serie.date,
    });
    const response = await fazRequest(
      util.format(endpointRoutes.serieByID, campeonatoId, serie.id),
      "PATCH",
      body
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};
