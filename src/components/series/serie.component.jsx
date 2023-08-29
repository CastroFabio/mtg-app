import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const Serie = ({ serie, mostrarRodadas }) => {
  const { setSerieID, setSerieName, setCampeonatoID } =
    useContext(CampeonatoContext);

  const { name, id } = serie;

  const handleClick = () => {
    setSerieID(id);
    setSerieName(name);
    mostrarRodadas();
  };

  const { admin } = useSelector(selectCurrentUser);

  return admin ? (
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
