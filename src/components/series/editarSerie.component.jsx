import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

import {
  handleDeleteSerie,
  handleUpdateSerie,
  saveUpdateSerie,
  selectSerieUpdate,
} from "../../store/campeonatos/seriesSlice";

import { selectCampeonatoToSeries } from "../../store/campeonatos/campeonatosSlice";

const EditarSerie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serie = useSelector(selectSerieUpdate);
  const campeonato = useSelector(selectCampeonatoToSeries);

  useEffect(() => {
    dispatch(saveUpdateSerie(serie.id));
  }, []);

  const [serieUpdated, setSerieUpdated] = useState({
    id: serie.id,
    name: "",
    campeonatoID: campeonato.id,
  });

  const onDeleteSerieClick = () => {
    dispatch(handleDeleteSerie(serie.id));
  };

  const getSerieData = (e) => {
    setSerieUpdated({ ...serieUpdated, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleUpdateSerie(serieUpdated));
    setSerieUpdated({ ...serieUpdated, name: " " });
    navigate("/serie");
  };

  return (
    <div>
      <h1>{serie.name}</h1>
      <h2>{serie.id}</h2>
      <FaTrashCan onClick={onDeleteSerieClick} />
      <form onSubmit={handleSubmit}>
        <label>Mudar nome da série</label>
        <br />
        <input
          type="text"
          name="name"
          value={serieUpdated.name}
          onChange={getSerieData}
        />
      </form>
    </div>
  );
};

export default EditarSerie;
