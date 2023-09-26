import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeries } from "../../utils/seriesEndpoints";
import { useSelector } from "react-redux";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";

const CriarSerie = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const [getSerieName, setSerieName] = useState("");
  const [getSerieDate, setSerieDate] = useState(new Date());

  const navigate = useNavigate();

  const campeonato = useSelector(getSelectedTournament);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createSeries(campeonato.id, {
        name: getSerieName,
        date: getSerieDate,
      });
      navigate("/serie");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Criar nova serie</label>
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

export default CriarSerie;
