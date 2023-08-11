import { useEffect, useState } from "react";

import Campeonato from "./campeonato.component";

import { BASE_URL, fazRequest, getFromLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const Campeonatos = ({ mostrarSeries }) => {
  const [campeonatos, setCampeonatos] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fazRequest(endpointRoutes.tournament, "GET");

      const data = await response.json();
      setCampeonatos(data);
    };
    asyncFn();
  }, []);

  return campeonatos.length ? (
    getFromLocalStorage("admin") ? (
      <div>
        <h1>Campeonatos</h1>
        <ul>
          {campeonatos.map((campeonato) => (
            <Campeonato
              key={campeonato.id}
              campeonato={campeonato}
              mostrarSeries={mostrarSeries}
            />
          ))}
        </ul>
        <br />
        <form type="submit">
          <label>Nome</label>
          <input type="text" />
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
