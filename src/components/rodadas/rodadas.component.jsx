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
import RodadasCard from "./rodadasCard.component";

const Rodadas = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const dispatch = useDispatch();

  const [getRounds, setRounds] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const campeonato = useSelector(getSelectedTournament);
  const serie = useSelector(getSelectedSerie);

  const handleDelete = async (campeonatoId, serieId, id) => {
    try {
      await deleteRodadas(campeonatoId, serieId, id);
      deleted(id);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(
          setUrl({
            title: "Rodadas",
            url: `${campeonato.name} > ${serie.name}`,
          })
        );

        dispatch(setButtonAction("/criarRodada"));
        const dataRodadas = await fetchRodadas(campeonato.id, serie.id);
        const dataRodadsWithUser = await Promise.all(
          await dataRodadas.map(async (element) => {
            const dataUser = await fetchUserById(element.userId);
            return { ...element, user: dataUser[0] };
          })
        );
        setRounds(dataRodadsWithUser);
        console.log("asdasasdas");
        console.log(dataRodadsWithUser);
      } catch (err) {
        setError(err);
      }
    };

    getData();
  }, [getDeleted]);

  if (getRounds == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="rodadas">
      <div className="campeonatos">
        {getRounds &&
          getRounds.map(({ id, points, user }) => {
            return (
              <div key={user.id}>
                <RodadasCard
                  campeonato={campeonato}
                  serie={serie}
                  rodadaId={id}
                  user={user}
                  points={points}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Rodadas;
