import React from "react";

import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

import { handleDelete } from "../../utils/campeonatos/campeonatos.utils";

const Campeonato = ({ campeonato, deletarCampeonatoDoArray }) => {
  const { id, name } = campeonato;

  return (
    <li>
      {name}
      <FaTrashCan onClick={() => deletarCampeonatoDoArray(id)} />
      <FaPenToSquare />
    </li>
  );
};

export default Campeonato;
