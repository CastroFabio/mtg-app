import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampeonatos } from "../../utils/campeonatosEndpoints";

const CriarCampeonato = () => {
  const [getCampeonatoName, setCampeonatoName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCampeonatos({ name: getCampeonatoName });
    navigate("/campeonato");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Criar novo campeonato</label>
      <input
        type="text"
        name="name"
        value={getCampeonatoName}
        onChange={(e) => setCampeonatoName(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CriarCampeonato;
