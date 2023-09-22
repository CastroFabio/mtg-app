import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getTournaments, setTournaments] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const getSelectedTournament = (id) => getTournaments.find((x) => x.id === id);

  const handleDelete = async (id) => {
    await deleteCampeonatos(id);
    deleted(id);
  };

  useEffect(() => {
    const dispatches = async () => {
      await dispatch(setUrl({ title: "Campeonatos", url: "" }));
      await dispatch(setButtonAction("/criarCampeonato"));
    };

    const getData = async () => {
      const data = await fetchCampeonatos();
      setTournaments(data);
    };

    getData();
    dispatches();
  }, [getDeleted]);

  if (getTournaments == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="campeonatos">
      {getTournaments &&
        getTournaments.map((campeonato) => {
          return (
            <div key={campeonato.id}>
              {/* <a
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await dispatch(
                    saveSelectedTournament(getSelectedTournament(id))
                  );
                  navigate("/serie");
                }}
              >
                {name}
              </a>
              <FaPenToSquare
                onClick={async () => {
                  await dispatch(
                    saveSelectedTournament(getSelectedTournament(id))
                  );
                  navigate("/editarCampeonato");
                }}
              />
              <FaTrashCan
                onClick={() => {
                  handleDelete(id);
                }}
              /> */}
              <CampeonatosCard {...campeonato} />
            </div>
          );
        })}
    </section>
  );
};

export default Campeonatos;
