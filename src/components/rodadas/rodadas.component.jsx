import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { FaTrashCan } from "react-icons/fa6";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { deleteRodadas, fetchRodadas } from "../../utils/rodadasEndpoints";
import { useState, useEffect } from "react";

const Rodadas = () => {
  const navigate = useNavigate();

  const [getRounds, setRounds] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const campeonato = useSelector(getSelectedTournament);
  const serie = useSelector(getSelectedSerie);

  const handleDelete = async (id) => {
    await deleteRodadas(campeonato.id, serie.id, id);
    deleted(id);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRodadas(campeonato.id, serie.id);
      setRounds(data);
    };

    getData();
  }, [getDeleted]);

  if (getRounds == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/criarRodada")}>Criar Rodada</button>

      <h1>
        {campeonato.name} - {serie.name} - Rodadas
      </h1>
      {getRounds &&
        getRounds.map(({ id, userId, points }) => {
          return (
            <div key={id}>
              <a style={{ cursor: "pointer" }}>
                {userId} - {points}
              </a>
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

export default Rodadas;
