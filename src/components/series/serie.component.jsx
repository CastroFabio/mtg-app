import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";

const Serie = ({ serie, mostrarRodadas }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { setSerieID, setSerieName } = useContext(CampeonatoContext);

  const { name, id } = serie;

  const handleClick = () => {
    setSerieID(id);
    setSerieName(name);
    mostrarRodadas();
  };

  return currentAdmin ? (
    <li>
      <a onClick={handleClick}>
        <FaTrashCan /> <FaRegPenToSquare /> {name}
      </a>
    </li>
  ) : (
    <li>
      <a onClick={handleClick}>{name}</a>
    </li>
  );
};

export default Serie;
