import { useEffect, useState } from "react";
import {
  handleDeleteSerie,
  saveSerieToRodada,
  saveUpdateSerie,
  selectAllSeries,
  selectSerieToRodada,
  selectSeriesLoading,
} from "../../store/campeonatos/seriesSlice";

import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";

import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRodadas } from "../../store/campeonatos/rodadasSlice";
import { fetchAllUsers } from "../../store/user/userSlice";
import { fetchSeries } from "../../utils/seriesEndpoints";

const Series = () => {
  const campeonato = useSelector(getSelectedTournament);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getSeries, setSeries] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSeries(campeonato.id);
      setSeries(data);
    };

    getData();
  }, []);

  if (getSeries == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/criarSerie")}>
        <FaCirclePlus />
        Criar Série
      </button>

      <h1>{campeonato.name} - Séries</h1>
      {getSeries &&
        getSeries.map(({ id, name }) => {
          return (
            <div key={id}>
              <a
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  console.log("1");
                  dispatch(
                    saveSerieToRodada({
                      campeonatoID: campeonato.id,
                      nameCampeonato: campeonato.name,
                      serieID: id,
                      nameSerie: name,
                    })
                  );

                  // await dispatch(fetchRodadas({ campeonatoID, serieID }));
                  // await dispatch(fetchAllUsers({ campeonatoID, serieID }));

                  navigate("/rodada");
                }}
              >
                {name}
              </a>
              <FaPenToSquare
                onClick={() => {
                  dispatch(saveUpdateSerie(id));
                  navigate("/editarSerie");
                }}
              />
              <FaTrashCan
                onClick={() => {
                  const deleteSerie = { campeonatoID: campeonato.id, id };
                  dispatch(handleDeleteSerie(deleteSerie));
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Series;
