import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleCreateCampeonato } from "../../store/campeonatos/campeonatosSlice";

const CriarCampeonato = () => {
  const [tempCampeonatoName, setTempCampeonatoName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCampenatoData = (e) => {
    setTempCampeonatoName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(handleCreateCampeonato({ name: tempCampeonatoName }));
    setTempCampeonatoName(" ");
    navigate("/campeonato");
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
