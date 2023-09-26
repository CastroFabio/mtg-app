import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchCampeonatos = async () => {
  const response = await fazRequest(endpointRoutes.tournament, "GET");
  const data = await response.json();
  return data.entities;
};

export const fetchPontuacaoCampeonatos = async (id) => {
  const response = await fazRequest(
    util.format(endpointRoutes.tournamentPontuacao, id),
    "GET"
  );
  const data = await response.json();
  return data.entities;
};

export const deleteCampeonatos = async (id) => {
  await fazRequest(util.format(endpointRoutes.tournamentById, id), "DELETE");
  return id;
};

export const createCampeonatos = async (campeonato) => {
  const body = JSON.stringify({ name: campeonato.name });
  const response = await fazRequest(
    util.format(endpointRoutes.tournament),
    "POST",
    body
  );
  const data = await response.json();
  return data.entities;
};

export const updateCampeonatos = async (campeonato) => {
  const body = JSON.stringify({ name: campeonato.name });
  const response = await fazRequest(
    util.format(endpointRoutes.tournamentById, campeonato.id),
    "PATCH",
    body
  );
  const data = await response.json();
  return data.entities;
};
