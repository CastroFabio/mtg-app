import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getSelectedSerie } from "../../store/campeonatos/seriesSlice";
import { FaCirclePlus, FaTrashCan } from "react-icons/fa6";
import { getSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { deleteRodadas, fetchRodadas } from "../../utils/rodadasEndpoints";
import { useState, useEffect } from "react";
import { fetchUserById } from "../../utils/userEndpoints";
import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

const Rodadas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getRounds, setRounds] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const campeonato = useSelector(getSelectedTournament);
  const serie = useSelector(getSelectedSerie);

  dispatch(
    setUrl({ title: "Rodadas", url: `${campeonato.name} > ${serie.name}` })
  );

  dispatch(setButtonAction("/criarRodada"));

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
    <section>
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
    </section>
  );
};

export default Rodadas;
