import React, { useContext } from "react";

import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";

const Serie = ({ campeonato }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { serie } = campeonato;

  return currentAdmin ? (
    <div>
      {serie.map((partida) => (
        <p>
          <FaTrashCan /> <FaRegPenToSquare /> {partida}
        </p>
      ))}
    </div>
  ) : (
    <div>
      {serie.map((partida) => (
        <p>{partida}</p>
      ))}
    </div>
  );
};

export default Serie;
