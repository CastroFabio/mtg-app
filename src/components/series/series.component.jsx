import { useDispatch,  useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

import {
  fetchSeries,
  handleDeleteSerie,
  saveUpdateSerie,
  selectAllSeries,
  selectSeriesLoading,
} from "../../store/campeonatos/seriesSlice";

const Series = () => {
  const seriesArray = useSelector(selectAllSeries);
  const isLoading = useSelector(selectSeriesLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSeries());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <button onClick={() => navigate("/criarSerie")}>
        <FaCirclePlus />
        Criar Serie
      </button>
      <h1>Series</h1>
      {seriesArray &&
        seriesArray.map(({ id, name }) => {
          return (
            <div key={id}>
              <a onClick={navigate()}>{name}</a>
              <FaPenToSquare
                onClick={() => {
                  dispatch(saveUpdateSerie(id));
                  navigate("/editarSerie");
                }}
              />
              <FaTrashCan
                onClick={() => {
                  dispatch(handleDeleteSerie(id));
                }}
              />
            </div>
          );
        })}
    </section>
  );
};

export default Series;
