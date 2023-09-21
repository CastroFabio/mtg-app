import { useEffect } from "react";
import {
  fetchSeries,
  handleDeleteSerie,
  saveSerieToRodada,
  saveUpdateSerie,
  selectAllSeries,
  selectSerieToRodada,
  selectSeriesLoading,
} from "../../store/campeonatos/seriesSlice";

import { selectCampeonatoToSeries } from "../../store/campeonatos/campeonatosSlice";

import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRodadas } from "../../store/campeonatos/rodadasSlice";

const Series = () => {
  const seriesArray = useSelector(selectAllSeries);
  const campeonato = useSelector(selectCampeonatoToSeries);
  const isLoading = useSelector(selectSeriesLoading);
  const { campeonatoID, nameCampeonato, serieID, nameSerie } =
    useSelector(selectSerieToRodada);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSeries(campeonato.id));
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/criarSerie")}>
        <FaCirclePlus />
        Criar Série
      </button>

      <h1>{campeonato.name} - Séries</h1>
      {seriesArray &&
        seriesArray.map(({ id, name }) => {
          return (
            <div key={id}>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    saveSerieToRodada({
                      campeonatoID: campeonato.id,
                      nameCampeonato: campeonato.name,
                      serieID: id,
                      nameSerie: name,
                    })
                  );
                  dispatch(fetchRodadas({ campeonatoID, serieID }));

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
