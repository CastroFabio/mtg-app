import { useEffect, useState } from "react";

import Campeonato from "./campeonato.component";

import { fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

var util = require("util");

const Campeonatos = ({ mostrarSeries }) => {
  const [campeonatos, setCampeonatos] = useState([]);
  const [newName, setNewName] = useState("");
  const [idCampeonatoForUpdate, setIDCampeonatoForUpdate] = useState(null);

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

  const handleUpdate = async (id) => {
    const body = JSON.stringify({ name: newName });
    console.log(body);
    await fazRequest(
      util.format(endpointRoutes.tournamentUpdate, id),
      "PATCH",
      body
    );
    getCampeonatos();
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
                />
              </li>
            );
          })}
        </ul>
        <br />
        <form type="submit">
          <label>Nome</label>
          <input
            placeholder="Novo nome"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onSubmit={handleUpdate(idCampeonatoForUpdate)}
            type="text"
          />
          {idCampeonatoForUpdate}
          {newName}
          <br />
          <button>Salvar</button>
          <button>Cancelar</button>
        </form>
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
