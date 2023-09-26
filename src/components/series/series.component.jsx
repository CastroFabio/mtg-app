import { useEffect, useState } from "react";
import { saveSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSeries, fetchSeries } from "../../utils/seriesEndpoints";
import { fetchPontuacaoCampeonatos } from "../../utils/campeonatosEndpoints";
import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

const Series = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getSeries, setSeries] = useState(null);
  const [getPontuacaoCampeonato, setPontuacaoCampeonato] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const campeonato = useSelector(getSelectedTournament);

  dispatch(setUrl({ title: "Series", url: `${campeonato.name}` }));
  dispatch(setButtonAction("/criarSerie"));

  const getSelectedSerie = (id) => getSeries.find((x) => x.id === id);

  const handleDelete = async (id) => {
    await deleteSeries(campeonato.id, id);
    deleted(id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let [dataSeries, dataPontuacaoCampeonato] = await Promise.all([
          fetchSeries(campeonato.id),
          fetchPontuacaoCampeonatos(campeonato.id),
        ]);

        setSeries(dataSeries);
        setPontuacaoCampeonato(dataPontuacaoCampeonato);
      } catch (err) {
        setError(err);
      }
    };

    getData();
  }, [getDeleted]);

  if (getSeries == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <h1>{campeonato.name} - Séries</h1>
      {getSeries &&
        getSeries.map(({ id, name, date }) => {
          return (
            <div key={id}>
              <a
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await dispatch(saveSelectedSerie(getSelectedSerie(id)));
                  navigate("/rodada");
                }}
              >
                {name} - {date}
              </a>
              <FaPenToSquare
                onClick={async () => {
                  await dispatch(saveSelectedSerie(getSelectedSerie(id)));
                  navigate("/editarSerie");
                }}
              />
              <FaTrashCan
                onClick={() => {
                  handleDelete(id);
                }}
              />
            </div>
          );
        })}

      <h1>Pontuacao</h1>
      {getPontuacaoCampeonato &&
        getPontuacaoCampeonato.map(({ userId, userName, points }) => {
          return (
            <div key={userId}>
              {userName} - {points}
            </div>
          );
        })}
    </section>
  );
};

export default Series;
