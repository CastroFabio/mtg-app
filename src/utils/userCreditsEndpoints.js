import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

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

export const fetchUsersCreditByID = async (userID) => {
  const response = await fazRequest(
    util.format(endpointRoutes.userPointsByUserID, userID),
    "GET"
  );
  const data = await response.json();
  return data.entities;
};
