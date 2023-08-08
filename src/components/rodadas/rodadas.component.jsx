import { useContext } from "react";

import Rodada from "./rodada.component";

import { AdminContext } from "../../context/admin.context";

const Rodadas = ({ campeonatosDB, mostrarCampeonatos }) => {
  const { currentAdmin } = useContext(AdminContext);

  return (
    <div>
      {currentAdmin ? (
        <div>
          <h1>Campeonato X - Serie X - Rodadas</h1>
          {campeonatosDB
            .filter(({ id }) => id < 2)
            .map((campeonato) => (
              <Rodada key={campeonato.id} campeonato={campeonato} />
            ))}
          <br />
          <form type="submit">
            <label>Nome</label>
            <input type="text" />
            <br />
            <label>Pontos</label>
            <input type="text" />
            <br />
            <button>Salvar</button>
            <button>Cancelar</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Campeonato X - Serie X - Rodadas</h1>
          {campeonatosDB
            .filter(({ id }) => id < 2)
            .map((campeonato) => (
              <Rodada key={campeonato.id} campeonato={campeonato} />
            ))}
        </div>
      )}

      <button onClick={mostrarCampeonatos}>Campeonatos</button>
    </div>
  );
};
export default Rodadas;
