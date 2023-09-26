import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCampeonatos,
  deleteCampeonatos,
} from "../../utils/campeonatosEndpoints";
import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";
import CampeonatosCard from "./campeonatosCard.component";

const Campeonatos = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getTournaments, setTournaments] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const handleDelete = async (id) => {
    await deleteCampeonatos(id);
    deleted(id);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(setUrl({ title: "Campeonatos", url: "" }));
        await dispatch(setButtonAction("/criarCampeonato"));
        setTournaments(await fetchCampeonatos());
      } catch (err) {
        setError(err);
      }
    };

    load();
  }, [getDeleted]);

  if (getTournaments == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="campeonatos">
      {getTournaments &&
        getTournaments.map((campeonato) => {
          return (
            <div key={campeonato.id}>
              <CampeonatosCard
                campeonato={campeonato}
                handleDelete={handleDelete}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Campeonatos;
