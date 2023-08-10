import React, { useContext } from "react";
import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";
import { BASE_URL, fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const Campeonato = ({ campeonato, mostrarSeries }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { setCampeonatoID, setCampeonatoName } = useContext(CampeonatoContext);

  const { name, campID } = campeonato;

  //terminar
  const handleDelete = async (id) => {
    const response = await fazRequest(endpointRoutes.tournament, "DELETE");
  };

  const handleClick = () => {
    setCampeonatoID(campID);
    setCampeonatoName(name);
    mostrarSeries();
  };

  return currentAdmin ? (
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
