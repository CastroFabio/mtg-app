import { useContext, useState, useEffect } from "react";

import Rodada from "./rodada.component";

import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

import { AdminContext } from "../../context/admin.context";
import { CampeonatoContext } from "../../context/campeonato.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

var util = require("util");

const Rodadas = ({ mostrarCampeonatos }) => {
  const { campeonatoID, serieID, campeonatoName, serieName } =
    useContext(CampeonatoContext);

  const [rodadasUsers, setRodadasUsers] = useState([]);

  const { admin } = useSelector(selectCurrentUser);

  useEffect(() => {
    const asyncFn = async () => {
      const response = await fazRequest(
        util.format(
          endpointRoutes.tournamentSerieRodada,
          campeonatoID,
          serieID
        ),
        "GET"
      );

      const data = await response.json();
      setRodadasUsers(data);
    };
    asyncFn();
  }, []);

  const handleClick = () => {
    mostrarCampeonatos();
  };

  return (
    <div>
      {rodadasUsers.length ? (
        admin ? (
          <div>
            <h1>{`${campeonatoName} - ${serieName} - Rodadas`}</h1>
            {rodadasUsers.map((campeonato) => (
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
            <h1>{`${campeonatoName} - ${serieName} - Rodadas`}</h1>
            {rodadasUsers.map((campeonato) => (
              <Rodada key={campeonato.id} campeonato={campeonato} />
            ))}
          </div>
        )
      ) : (
        <div>
          <h1>{`${campeonatoName} - ${serieName} - Rodadas`}</h1>
          <p>Não há registro de usuários.</p>
        </div>
      )}
      <button onClick={handleClick}>Campeonato</button>
    </div>
  );
};
export default Rodadas;
