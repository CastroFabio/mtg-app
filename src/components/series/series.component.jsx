import { useContext, useEffect, useState } from "react";

import Serie from "./serie.component";

import { BASE_URL, fazRequest, getFromLocalStorage } from "../../utils/client";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

var util = require("util");

const Series = ({ mostrarCampeonatos, mostrarRodadas }) => {
  const { campeonatoID, campeonatoName } = useContext(CampeonatoContext);

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fazRequest(
        util.format(endpointRoutes.tournamentSerie, campeonatoID),
        "GET"
      );

      const data = await response.json();
      setSeries(data);
    };
    asyncFn();
  }, []);

  const handleClick = () => {
    mostrarCampeonatos();
  };

  return series[0] ? (
    getFromLocalStorage("admin") ? (
      <div>
        <p>{getFromLocalStorage("admin").toString()} Admin</p>
        <h1>{`${campeonatoName} - Series`}</h1>
        {series.map((serie) => (
          <Serie mostrarRodadas={mostrarRodadas} key={serie.id} serie={serie} />
        ))}
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
        <h1>{`${campeonatoName} - Séries`}</h1>
        {series.map((serie) => (
          <Serie mostrarRodadas={mostrarRodadas} key={serie.id} serie={serie} />
        ))}
      </div>
    )
  ) : (
    <div>
      <h1>{`${campeonatoName} - Séries`}</h1>
      <p>Sem registro de séries</p>
      <button onClick={handleClick}>Campeonato</button>
    </div>
  );
};

export default Series;
