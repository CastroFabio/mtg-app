import React, { useContext, useDebugValue, useEffect } from "react";
import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { CampeonatoContext } from "../../context/campeonato.context";
import { BASE_URL, fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";
import { useNavigate } from "react-router-dom";

var util = require("util");

const Campeonato = ({ campeonato, mostrarSeries }) => {
  const { setCampeonatoID, setCampeonatoName } = useContext(CampeonatoContext);

  const { name, id } = campeonato;

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("aaaaa...", id);
    setCampeonatoID(id);
    setCampeonatoName(name);
    mostrarSeries();
  };

  const handleDelete = async (id) => {
    console.log("deleting...", id);
    navigate("/");
    await fazRequest(
      util.format(endpointRoutes.tournamentDelete, id),
      "DELETE"
    );
  };

  return getFromLocalStorage("admin") ? (
    <div>
      <a onClick={handleClick}>{name}</a>
      <a onClick={() => handleDelete(id)}>
        <FaTrashCan />
      </a>
      <FaRegPenToSquare />
    </div>
  ) : (
    <div>
      <a onClick={handleClick}>{name}</a>
    </div>
  );
};

export default Campeonato;
