import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";

import { useState } from "react";
import { updateCampeonatos } from "../../utils/campeonatosEndpoints";

const EditarCampeonato = () => {
  const navigate = useNavigate();

  const campeonato = useSelector(getSelectedTournament);
  console.log(campeonato);
  const [getCampeonatoName, setCampeonatoName] = useState(campeonato.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCampeonatos({ id: campeonato.id, name: getCampeonatoName });
    navigate("/campeonato");
  };

  return (
    <section>
      <h2>{campeonato.id}</h2>
      <h1>{campeonato.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>Mudar nome do campeonato</label>
        <br />
        <br />
        <input
          type="text"
          name="name"
          value={getCampeonatoName}
          onChange={(e) => setCampeonatoName(e.target.value)}
        />
        <button type="submit">Salvar</button>
      </form>
    </section>
  );
};

export default EditarCampeonato;
