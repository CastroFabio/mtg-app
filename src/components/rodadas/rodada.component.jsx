import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { CampeonatoContext } from "../../context/campeonato.context";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "../../store/user/user.selector";

const Rodada = ({ campeonato }) => {
  const { setRodadaID } = useContext(CampeonatoContext);

  const { admin } = useSelector(selectCurrentUser);

  const { userId, points } = campeonato;

  return admin ? (
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
