import React, { useContext } from "react";
import { FaTrashCan, FaRegPenToSquare } from "react-icons/fa6";

import { AdminContext } from "../../context/admin.context";

const Campeonato = ({ campeonato }) => {
  const { currentAdmin } = useContext(AdminContext);
  const { name } = campeonato;
  return currentAdmin ? (
    <p>
      <FaTrashCan /> <FaRegPenToSquare /> {name}
    </p>
  ) : (
    <p>{name}</p>
  );
};

export default Campeonato;
