import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCampeonatos,
  handleDeleteCampeonato,
  handleUpdateCampeonato,
  saveUpdateCampeonato,
  selectCampeonatoUpdate,
  selectIDCampeonato,
} from "../../store/campeonatos/campeonatosSlice";

import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";

const EditarCampeonato = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const campeonato = useSelector(selectCampeonatoUpdate);

  useEffect(() => {
    dispatch(saveUpdateCampeonato(campeonato.id));
  }, []);

  const [campeonatoUpdated, setCampeonatoUpdated] = useState({
    id: campeonato.id,
    name: "",
  });

  const onDeleteCampeonatoClick = () => {
    dispatch(handleDeleteCampeonato(campeonato.id));
  };

  const getCampeonatoData = (e) => {
    setCampeonatoUpdated({ ...campeonatoUpdated, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleUpdateCampeonato(campeonatoUpdated));
    setCampeonatoUpdated({ ...campeonatoUpdated, name: " " });
    dispatch(fetchCampeonatos());
    navigate("/campeonato");
  };

  return (
    <div>
      <h1>{campeonato.name}</h1>
      <h2>{campeonato.id}</h2>
      <FaTrashCan onClick={onDeleteCampeonatoClick} />
      <form onSubmit={handleSubmit}>
        <label>Mudar nome do campeonato</label>
        <br />
        <input
          type="text"
          name="name"
          value={campeonatoUpdated.name}
          onChange={getCampeonatoData}
        />
      </form>
    </div>
  );
};

export default EditarCampeonato;
