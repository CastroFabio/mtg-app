import React, { useContext } from "react";
import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { CampeonatoContext } from "../../context/campeonato.context";
import { BASE_URL, fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const Campeonato = ({ campeonato, mostrarSeries }) => {
  const { campeonatoID, setCampeonatoID, setCampeonatoName } =
    useContext(CampeonatoContext);

  const { name, id } = campeonato;

  //terminar
  const handleDelete = async (id) => {
    const response = await fazRequest(endpointRoutes.tournament, "DELETE");
  };

  const handleClick = () => {
    setCampeonatoID(id);
    setCampeonatoName(name);
    mostrarSeries();
  };

  return getFromLocalStorage("admin") ? (
    <li>
      <a>
        <FaTrashCan />
      </a>{" "}
      <a>
        <FaRegPenToSquare />
      </a>{" "}
      <a onClick={handleClick}>{name}</a>
    </li>
  ) : (
    <li>
      <a onClick={handleClick}>{name}</a>
    </li>
  );
};

export default Campeonato;
