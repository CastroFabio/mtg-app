import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

var util = require("util");

export const getCampeonatos = async () => {
  const response = await fazRequest(endpointRoutes.tournament, "GET");
  const data = await response.json();

  return data;
};

export const handleCreate = async (tempCampeonatoName) => {
  const body = JSON.stringify({ name: tempCampeonatoName });
  await fazRequest(util.format(endpointRoutes.tournament), "POST", body);
};

export const handleUpdate = async (id, tempCampeonatoName) => {
  const body = JSON.stringify({ name: tempCampeonatoName });
  await fazRequest(
    util.format(endpointRoutes.tournamentUpdate, id),
    "PATCH",
    body
  );
};

export const handleDelete = async (id) => {
  await fazRequest(util.format(endpointRoutes.tournamentDelete, id), "DELETE");
};
