import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCampeonatoMap } from "../../store/campeonatos/campeonatos.selector";

import { setCampeonatosMap } from "../../store/campeonatos/campeonatos.action";

import {
  getCampeonatos,
  handleDelete,
} from "../../utils/campeonatos/campeonatos.utils";
import Campeonato from "./campeonato.component";

const Campeonatos = () => {
  useEffect(() => {
    const asyncFn = async () => {
      await getCampeonatosArray();
    };
    asyncFn();
  }, []);

  const getCampeonatosArray = async () => await getCampeonatos();

  const deletarCampeonatoDoArray = async (id) => await handleDelete(id);

  const { campeonatosMap } = useSelector(selectCampeonatoMap);

  return (
    <div>
      <h1>Campeonatos</h1>
      {campeonatosMap.map((campeonato) => {
        return (
          <ul key={campeonato.id}>
            <Campeonato campeonato={campeonato} />
          </ul>
        );
      })}
    </div>
  );
};

export default Campeonatos;
