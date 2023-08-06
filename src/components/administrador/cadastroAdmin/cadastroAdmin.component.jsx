import CampeonatosAdministrador from "../campeonatosAdmin/campeonatosAdministrador.component";
import SeriesAdministrador from "../seriesAdmin/seriesAdministrador.compenent";
import RodadasAdministrador from "../rodadasAdmin/rodadasAdmin.component";

import { Fragment, useState } from "react";

const CadastroAdmin = () => {
  const [campeonatosAdmin, setCampeonatosAdmin] = useState(true);
  const [seriesAdmin, setSeriesAdmin] = useState(false);
  const [rodadasAdmin, setRodadasAdmin] = useState(false);

  const mostrarCampeonatosAdmin = () => {
    setCampeonatosAdmin(true);
    setSeriesAdmin(false);
    setRodadasAdmin(false);
  };
  const mostrarSeriesAdmin = () => {
    setCampeonatosAdmin(false);
    setSeriesAdmin(true);
    setRodadasAdmin(false);
  };
  const mostrarRodadasAdmin = () => {
    setCampeonatosAdmin(false);
    setSeriesAdmin(false);
    setRodadasAdmin(true);
  };

  return (
    <Fragment>
      <h1>CadastroAdmin</h1>
      {campeonatosAdmin && (
        <CampeonatosAdministrador mostrarSeriesAdmin={mostrarSeriesAdmin} />
      )}
      {seriesAdmin && (
        <SeriesAdministrador mostrarRodadasAdmin={mostrarRodadasAdmin} />
      )}
      {rodadasAdmin && (
        <RodadasAdministrador
          mostrarCampeonatosAdmin={mostrarCampeonatosAdmin}
        />
      )}
    </Fragment>
  );
};

export default CadastroAdmin;
