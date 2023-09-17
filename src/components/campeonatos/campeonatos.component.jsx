import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

import {
  fetchCampeonatos,
  handleDeleteCampeonato,
  saveIDCampeonato,
  saveUpdateCampeonato,
  selectAllCampeonatos,
  selectCampeonatosLoading,
} from "../../store/campeonatos/campeonatosSlice";

const Campeonatos = () => {
  const campeonatosArray = useSelector(selectAllCampeonatos);
  const isLoading = useSelector(selectCampeonatosLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCampeonatos());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <button onClick={() => navigate("/criarCampeonato")}>
        <FaCirclePlus />
        Criar Campeonato
      </button>
      <h1>Campeonatos</h1>
      {campeonatosArray &&
        campeonatosArray.map(({ id, name }) => {
          return (
            <div key={id}>
              <a>{name}</a>{" "}
              <FaPenToSquare
                onClick={() => {
                  dispatch(saveIDCampeonato(id));
                  dispatch(saveUpdateCampeonato(id));
                  navigate("/editarCampeonato");
                }}
              />
              <FaTrashCan
                onClick={() => {
                  dispatch(handleDeleteCampeonato(id));
                }}
              />
            </div>
          );
        })}
    </section>
  );
};

export default Campeonatos;
