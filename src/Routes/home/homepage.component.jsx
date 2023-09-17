import { Fragment, useState } from "react";

import Campeonatos from "../../components/campeonatos/campeonatos.component";
import Rodadas from "../../components/rodadas/rodadas.component";
import Series from "../../components/series/series.component";
import { fetchCampeonatos } from "../../store/campeonatos/campeonatosSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [campeonatos, setCampeonatos] = useState(true);
  const [series, setSeries] = useState(false);
  const [rodadas, setRodadas] = useState(false);

  const dispatch = useDispatch();

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
