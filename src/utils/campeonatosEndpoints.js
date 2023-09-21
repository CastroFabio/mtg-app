import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchCampeonatos = async () => {
  try {
    const response = await fazRequest(endpointRoutes.tournament, "GET");
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};

export const deleteCampeonatos = async (id) => {
  try {
    await fazRequest(util.format(endpointRoutes.tournamentByID, id), "DELETE");
    return id;
  } catch (error) {
    return error;
  }
};

export const createCampeonatos = async (name) => {
  try {
    const body = JSON.stringify({ name });
    const response = await fazRequest(
      util.format(endpointRoutes.tournament),
      "POST",
      body
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};

export const updateCampeonatos = async (id, name) => {
  try {
    const body = JSON.stringify({ name });
    const response = await fazRequest(
      util.format(endpointRoutes.tournamentByID, id),
      "PATCH",
      body
    );
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};
