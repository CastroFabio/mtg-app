import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { FaTrashCan } from "react-icons/fa6";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { deleteRodadas, fetchRodadas } from "../../utils/rodadasEndpoints";
import { useState, useEffect } from "react";
import { fetchUserById } from "../../utils/userEndpoints";

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
      const dataRodadas = await fetchRodadas(campeonato.id, serie.id);
      const dataRodadsWithUser = await Promise.all(
        await dataRodadas.map(async (element) => {
          const dataUser = await fetchUserById(element.userId);
          return { ...element, user: dataUser[0] };
        })
      );
      setRounds(dataRodadsWithUser);
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
        getRounds.map(({ id, points, user }) => {
          return (
            <div key={id}>
              <a style={{ cursor: "pointer" }}>
                {user.id} - {user.username} - {points}
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
