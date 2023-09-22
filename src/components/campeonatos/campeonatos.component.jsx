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

const Campeonatos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getTournaments, setTournaments] = useState(null);
  const [getDeleted, deleted] = useState(null);

  const getSelectedTournament = (id) => getTournaments.find((x) => x.id === id);

  dispatch(setUrl({ title: "Campeonatos", url: "" }));
  dispatch(setButtonAction("/criarCampeonato"));

  const handleDelete = async (id) => {
    await deleteCampeonatos(id);
    deleted(id);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCampeonatos();
      setTournaments(data);
    };

    getData();
  }, [getDeleted]);

  if (getTournaments == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section>
      <h1>Campeonatos</h1>
      {getTournaments &&
        getTournaments.map(({ id, name }) => {
          return (
            <div key={id}>
              <a
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
              />
            </div>
          );
        })}
    </section>
  );
};

export default Campeonatos;
