import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";

const Rodada = ({ campeonato }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { rodada } = campeonato;

  return currentAdmin ? (
    <div>
      {rodada.map((jogador) => (
        <p>
          <FaTrashCan /> <FaRegPenToSquare /> {jogador[0]} {jogador[1]}
        </p>
      ))}
    </div>
  ) : (
    <div>
      {rodada.map((jogador) => (
        <p>
          {jogador[0]} {jogador[1]}
        </p>
      ))}
    </div>
  );
};

export default Rodada;
