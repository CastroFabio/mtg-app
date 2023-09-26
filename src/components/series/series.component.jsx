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
import SeriesCard from "./seriesCard.component";

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

  const handleDelete = async (campeonatoId, id) => {
    await deleteSeries(campeonatoId, id);
    deleted(id);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setUrl({ title: "Series", url: `${campeonato.name}` }));
        dispatch(setButtonAction("/criarSerie"));
        let [dataSeries, dataPontuacaoCampeonato] = await Promise.all([
          fetchSeries(campeonato.id),
          fetchPontuacaoCampeonatos(campeonato.id),
        ]);

        console.log(dataSeries);
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
    <div className="series">
      <div className="campeonatos">
        {getSeries &&
          getSeries.map((serie) => {
            return (
              <div key={serie.id}>
                <SeriesCard
                  campeonato={campeonato}
                  serie={serie}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
      </div>

      <div className="pontuacao">
        <h1>Pontuação no campeonato</h1>
        {getPontuacaoCampeonato &&
          getPontuacaoCampeonato.map(({ userId, userName, points }) => {
            return (
              <div key={userId}>
                {userName} - {points}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Series;
