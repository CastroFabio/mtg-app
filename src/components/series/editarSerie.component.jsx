import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelectedSerie } from "../../store/campeonatos/seriesSlice";

import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { updateSeries } from "../../utils/seriesEndpoints";
import formatDate from "../../utils/formatDate";

const EditarSerie = () => {
  const navigate = useNavigate();

  const campeonato = useSelector(getSelectedTournament);

  const serie = useSelector(getSelectedSerie);

  const [getSerieName, setSerieName] = useState(serie.name);
  const [getSerieDate, setSerieDate] = useState(formatDate(serie.date));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSeries(campeonato.id, {
      id: serie.id,
      name: getSerieName,
      date: getSerieDate,
    });
    navigate("/serie");
  };

  return (
    <section>
      <h2>{serie.id}</h2>
      <h1>{serie.name}</h1>

      <form onSubmit={handleSubmit}>
        <label>Mudar nome da série</label>
        <br />
        <br />
        <input
          type="text"
          name="name"
          value={getSerieName}
          onChange={(e) => setSerieName(e.target.value)}
        />
        <input
          type="text"
          name="date"
          value={getSerieDate}
          onChange={(e) => setSerieDate(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default EditarSerie;
