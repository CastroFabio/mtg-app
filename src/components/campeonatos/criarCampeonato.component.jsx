import { useState } from "react";
import {
  fetchCampeonatos,
  handleCreateCampeonato,
} from "../../store/campeonatos/campeonatosSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CriarCampeonato = () => {
  const [tempCampeonatoName, setTempCampeonatoName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCampenatoData = (e) => {
    setTempCampeonatoName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleCreateCampeonato({ name: tempCampeonatoName }));
    setTempCampeonatoName(" ");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Criar campeonato novo</label>
      <input
        type="text"
        name="name"
        value={tempCampeonatoName}
        onChange={getCampenatoData}
      />
    </form>
  );
};

export default CriarCampeonato;
