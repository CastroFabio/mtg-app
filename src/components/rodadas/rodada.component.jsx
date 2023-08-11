import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { CampeonatoContext } from "../../context/campeonato.context";
import { getFromLocalStorage } from "../../utils/client";

const Rodada = ({ campeonato }) => {
  const { setRodadaID } = useContext(CampeonatoContext);

  const { userId, points } = campeonato;

  return getFromLocalStorage("admin") ? (
    <li>
      <a>
        <FaTrashCan /> <FaRegPenToSquare /> {userId}
      </a>
    </li>
  ) : (
    <li>
      {userId} {points} pts
    </li>
  );
};

export default Rodada;
