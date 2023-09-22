import { useEffect, useState } from "react";
import { saveSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSeries, fetchSeries } from "../../utils/seriesEndpoints";

const Series = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getSeries, setSeries] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const campeonato = useSelector(getSelectedTournament);

  const getSelectedSerie = (id) => getSeries.find((x) => x.id === id);

  const handleDelete = async (id) => {
    await deleteSeries(campeonato.id, id);
    deleted(id);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSeries(campeonato.id);
      setSeries(data);
    };

    getData();
  }, [getDeleted]);

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
    </div>
  );
};

export default Series;
