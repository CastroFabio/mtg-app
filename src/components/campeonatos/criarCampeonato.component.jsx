import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampeonatos } from "../../utils/campeonatosEndpoints";

const CriarCampeonato = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const [getCampeonatoName, setCampeonatoName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await createCampeonatos({ name: getCampeonatoName });
      navigate("/campeonato");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Criar novo campeonato</label>
        <br />
        <input
          type="text"
          name="name"
          value={getCampeonatoName}
          onChange={(e) => setCampeonatoName(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default CriarCampeonato;
