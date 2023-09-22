import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

export const fetchUsers = async () => {
  try {
    const response = await fazRequest(endpointRoutes.user, "GET");
    const data = await response.json();
    return data.entities;
  } catch (error) {
    return error;
  }
};
