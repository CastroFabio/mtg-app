import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { CampeonatoContext } from "../../context/campeonato.context";
import { fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";
import { useNavigate } from "react-router-dom";

const Campeonato = ({
  campeonato,
  mostrarSeries,
  handleDelete,
  setIDCampeonatoForUpdate,
}) => {
  const { setCampeonatoID, setCampeonatoName } = useContext(CampeonatoContext);

  const { name, id } = campeonato;

  const handleClick = () => {
    setCampeonatoID(id);
    setCampeonatoName(name);
    mostrarSeries();
  };

  return getFromLocalStorage("admin") ? (
    <div>
      <a onClick={handleClick}>{name}</a>
      <a onClick={() => handleDelete(id)}>
        <FaTrashCan />
      </a>
      <a onClick={() => setIDCampeonatoForUpdate(id)}>
        <FaRegPenToSquare />
      </a>
    </div>
  ) : (
    <div>
      <a onClick={handleClick}>{name}</a>
    </div>
  );
};

export default Campeonato;
