import { useContext } from "react";

import Serie from "./serie.component";

import { AdminContext } from "../../context/admin.context";

const Series = ({ mostrarRodadas, campeonatosDB }) => {
  const { currentAdmin } = useContext(AdminContext);

  return currentAdmin ? (
    <div>
      <h1>Campeonato X - Series X </h1>
      {campeonatosDB
        .filter(({ id }) => id < 2)
        .map((campeonato) => (
          <Serie key={campeonato.id} campeonato={campeonato} />
        ))}
      <br />
      <form type="submit">
        <label>Nome</label>
        <input type="text" />
        <br />
        <button>Salvar</button>
        <button>Cancelar</button>
      </form>
      <button onClick={mostrarRodadas}>Series</button>
    </div>
  ) : (
    <div>
      <h1>Campeonato X - Series X </h1>
      {campeonatosDB
        .filter(({ id }) => id < 2)
        .map((campeonato) => (
          <Serie key={campeonato.id} campeonato={campeonato} />
        ))}
      <button onClick={mostrarRodadas}>Series</button>
    </div>
  );
};

export default Series;
