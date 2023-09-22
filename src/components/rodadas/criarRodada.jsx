import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { getSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { createRodadas } from "../../utils/rodadasEndpoints";
import { fetchUsers } from "../../utils/userEndpoints";

const CriarRodada = () => {
  const [getRodadaPoint, setRodadaPoint] = useState(0);
  const [getUserOptions, setUserOptions] = useState(null);
  const [getSelected, setSelected] = useState("");

  const navigate = useNavigate();

  const campeonato = useSelector(getSelectedTournament);
  const serie = useSelector(getSelectedSerie);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRodadas(campeonato.id, serie.id, {
      userId: Number(getSelected),
      points: Number(getRodadaPoint),
    });
    navigate("/rodada");
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUsers();
      const userOptions = [{ value: "", text: "" }];

      data.forEach((element) => {
        userOptions.push({ value: element.id, text: element.username });
      });

      setUserOptions(userOptions);
      setSelected(userOptions[0].value);
    };

    getData();
  }, []);

  if (getUserOptions == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>Criar nova Rodada</label>
        <select value={getSelected} onChange={handleChange}>
          {getUserOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="date"
          value={getRodadaPoint}
          onChange={(e) => setRodadaPoint(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default CriarRodada;
