import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchUsers = async () => {
  const response = await fazRequest(endpointRoutes.user, "GET");
  const data = await response.json();
  return data.entities;
};

export const fetchUserById = async (id) => {
  const response = await fazRequest(
    util.format(endpointRoutes.userById, id),
    "GET"
  );
  const data = await response.json();
  return data.entities;
};
