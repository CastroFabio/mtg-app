import { Fragment, useContext, useEffect, useState } from "react";

import Campeonato from "./campeonato.component";

import { FaCircleChevronDown, FaCirclePlus } from "react-icons/fa6";

import { fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";
import { CampeonatoContext } from "../../context/campeonato.context";

var util = require("util");

const Campeonatos = ({ mostrarSeries }) => {
  const [campeonatos, setCampeonatos] = useState([]);
  const [tempCampeonatoName, setTempCampeonatoName] = useState("");
  const [idCampeonatoForUpdate, setIDCampeonatoForUpdate] = useState(null);
  const [changed, setChanged] = useState(false);
  const [edit, setEdit] = useState(false);
  const [criarCampeonato, setCriarCampeonato] = useState(true);

  const { campeonatoName } = useContext(CampeonatoContext);

  useEffect(() => {
    const asyncFn = async () => {
      getCampeonatos();
    };
    asyncFn();
  }, []);

  const getCampeonatos = async () => {
    const response = await fazRequest(endpointRoutes.tournament, "GET");

    const data = await response.json();
    setCampeonatos(data);
  };

  const handleDelete = async (id) => {
    await fazRequest(
      util.format(endpointRoutes.tournamentDelete, id),
      "DELETE"
    );
    getCampeonatos();
  };

  const handleCreate = async () => {
    const body = JSON.stringify({ name: tempCampeonatoName });
    await fazRequest(util.format(endpointRoutes.tournament), "POST", body);
    setTempCampeonatoName("");
    getCampeonatos();
  };

  const handleUpdate = async (id) => {
    const body = JSON.stringify({ name: tempCampeonatoName });
    await fazRequest(
      util.format(endpointRoutes.tournamentUpdate, id),
      "PATCH",
      body
    );
    setChanged(false);
    setTempCampeonatoName("");
    getCampeonatos();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreate();
    }
  };

  return campeonatos.length ? (
    getFromLocalStorage("admin") ? (
      <div>
        <h1>Campeonatos</h1>
        <ul>
          {campeonatos.map((campeonato) => {
            return (
              <li key={campeonato.id}>
                <Campeonato
                  handleDelete={handleDelete}
                  campeonato={campeonato}
                  mostrarSeries={mostrarSeries}
                  setIDCampeonatoForUpdate={setIDCampeonatoForUpdate}
                  setTempCampeonatoName={setTempCampeonatoName}
                  setEdit={setEdit}
                />
              </li>
            );
          })}
        </ul>
        <br />
        {criarCampeonato ? (
          <div>
            <FaCircleChevronDown />
            <br />
            <label>Criar Campeonato </label>
            <input
              placeholder="Novo nome"
              onChange={(e) => {
                setTempCampeonatoName(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              value={tempCampeonatoName}
              type="text"
            />
            <br />
            <Fragment>
              <button onClick={handleCreate}>Criar</button>
              <button
                onClick={() => {
                  setTempCampeonatoName("");
                }}
              >
                Cancelar
              </button>
            </Fragment>
          </div>
        ) : (
          <FaCirclePlus />
        )}
        {edit ? (
          <div>
            <label>Editar Campeonato </label>
            <input
              placeholder="Novo nome"
              onChange={(e) => {
                setTempCampeonatoName(e.target.value);
                setChanged(true);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              value={tempCampeonatoName}
              type="text"
            />
            <br />
            {changed ? (
              <Fragment>
                <button
                  onClick={() => {
                    handleUpdate(idCampeonatoForUpdate);
                  }}
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setTempCampeonatoName(campeonatoName);
                    setChanged(false);
                  }}
                >
                  Cancelar
                </button>
              </Fragment>
            ) : null}
          </div>
        ) : null}
      </div>
    ) : (
      <div>
        <h1>Campeonatos</h1>
        {campeonatos.map((campeonato) => (
          <Campeonato
            key={campeonato.id}
            campeonato={campeonato}
            mostrarSeries={mostrarSeries}
          />
        ))}
      </div>
    )
  ) : (
    <div>
      <h1>Campeonatos</h1>
      <p>Sem registro de Campeonatos</p>
    </div>
  );
};

export default Campeonatos;
