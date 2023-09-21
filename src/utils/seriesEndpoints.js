
import { fazRequest } from "./client";
import { endpointRoutes } from "./endpoitsRoutes";

var util = require("util");

export const fetchSeries = async(campeonatoID) =>  {
      try {
        const response = await fazRequest(
          util.format(endpointRoutes.serie, campeonatoID),
          "GET"
        );
        const data = await response.json();
        return data.entities;
      } catch (error) {
        return error;
      }
    }