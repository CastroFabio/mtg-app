import CadastroAdmin from "../../components/administrador/cadastroAdmin/cadastroAdmin.component";
import Campeonatos from "../../components/campeonatos/campeonato.component";
import Rodada from "../../components/rodada/rodada.component";
import Series from "../../components/serie/serie.component";

import { Fragment, useState } from "react";

const Home = () => {
  const [campeonatos, setCampeonatos] = useState(true);
  const [series, setSeries] = useState(false);
  const [rodadas, setRodadas] = useState(false);

  const [admin, setAdmin] = useState(false);

  const administradorOnline = () => {
    setAdmin(!admin);
  };

  const mostrarCampeonatos = () => {
    setCampeonatos(true);
    setSeries(false);
    setRodadas(false);
  };
  const mostrarSeries = () => {
    setCampeonatos(false);
    setSeries(true);
    setRodadas(false);
  };
  const mostrarRodadas = () => {
    setCampeonatos(false);
    setSeries(false);
    setRodadas(true);
  };

  return (
    <div>
      <div>
        <button onClick={administradorOnline}>Administrador?</button>
        {admin ? (
          <CadastroAdmin />
        ) : (
          <Fragment>
            {campeonatos && <Campeonatos mostrarSeries={mostrarSeries} />}
            {series && <Series mostrarRodadas={mostrarRodadas} />}
            {rodadas && <Rodada mostrarCampeonatos={mostrarCampeonatos} />}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
