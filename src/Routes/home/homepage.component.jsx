import Campeonatos from "../../components/campeonatos/campeonatos.component";
import Rodadas from "../../components/rodadas/rodadas.component";
import Series from "../../components/series/series.component";

import { Fragment, useState } from "react";

const Home = () => {
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

  return (
    <Fragment>
      {campeonatos && <Campeonatos mostrarSeries={mostrarSeries} />}
      {series && (
        <Series
          mostrarRodadas={mostrarRodadas}
          mostrarCampeonatos={mostrarCampeonatos}
        />
      )}
      {rodadas && <Rodadas mostrarCampeonatos={mostrarCampeonatos} />}
    </Fragment>
  );
};

export default Home;
