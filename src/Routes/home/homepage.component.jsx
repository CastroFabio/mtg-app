import Campeonatos from "../../components/campeonatos/campeonatos.component";
import Rodadas from "../../components/rodadas/rodadas.component";
import Series from "../../components/series/series.component";

import { campeonatosDB } from "../../assets/mockDB";

import { Fragment, useContext, useState } from "react";

import { AdminContext } from "../../context/admin.context";

const Home = (props) => {
  const [campeonatos, setCampeonatos] = useState(true);
  const [series, setSeries] = useState(false);
  const [rodadas, setRodadas] = useState(false);

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

  const { setCurrentAdmin, currentAdmin } = useContext(AdminContext);

  const toggleAdministrador = () => {
    setCurrentAdmin(!currentAdmin);
  };

  return (
    <div>
      {currentAdmin ? (
        <button onClick={toggleAdministrador}>Administrador? Sim</button>
      ) : (
        <button onClick={toggleAdministrador}>Administrador? Não</button>
      )}

      <Fragment>
        {campeonatos && (
          <Campeonatos
            mostrarSeries={mostrarSeries}
            campeonatosDB={campeonatosDB}
          />
        )}
        {series && (
          <Series
            mostrarRodadas={mostrarRodadas}
            campeonatosDB={campeonatosDB}
          />
        )}
        {rodadas && (
          <Rodadas
            mostrarCampeonatos={mostrarCampeonatos}
            campeonatosDB={campeonatosDB}
          />
        )}
      </Fragment>
    </div>
  );
};

export default Home;
