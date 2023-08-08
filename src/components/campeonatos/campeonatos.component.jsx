import { useContext } from "react";

import Campeonato from "./campeonato.component";

import { AdminContext } from "../../context/admin.context";

const Campeonatos = ({ mostrarSeries, campeonatosDB }) => {
  const { currentAdmin } = useContext(AdminContext);

  return currentAdmin ? (
    <div>
      <h1>Campeonatos</h1>
      {campeonatosDB.map((campeonato) => (
        <Campeonato key={campeonato.id} campeonato={campeonato} />
      ))}
      <br />
      <form type="submit">
        <label>Nome</label>
        <input type="text" />
        <br />
        <button>Salvar</button>
        <button>Cancelar</button>
      </form>
      <button onClick={mostrarSeries}>Series</button>
    </div>
  ) : (
    <div>
      <h1>Campeonatos</h1>
      {campeonatosDB.map((campeonato) => (
        <Campeonato key={campeonato.id} campeonato={campeonato} />
      ))}
      <button onClick={mostrarSeries}>Series</button>
    </div>
  );
};

export default Campeonatos;
