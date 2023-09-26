import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

export const fetchUsersCreditBalance = async () => {
  const response = await fazRequest(endpointRoutes.userBalance, "GET");
  const data = await response.json();
  return data.entities;
};

export const createUserCredit = async ({ userId, points }) => {
  const body = JSON.stringify({
    userId,
    points,
  });
  const response = await fazRequest(endpointRoutes.userPoints, "POST", body);
  const data = await response.json();
  return data.entities;
};
