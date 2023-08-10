import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";

const Rodada = ({ campeonato }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { setRodadaID } = useContext(CampeonatoContext);

  const { userId, points } = campeonato;

  return currentAdmin ? (
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
