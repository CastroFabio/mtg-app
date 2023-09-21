import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectAllUsers } from "../../store/user/userSlice";
import { selectSerieToRodada } from "../../store/campeonatos/seriesSlice";
import {
  saveUpdatePlayer,
  selectAllRodadas,
} from "../../store/campeonatos/rodadasSlice";

import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";

const Rodada = () => {
  const rodadaArray = useSelector(selectAllRodadas);
  const usersArray = useSelector(selectAllUsers);
  const { campeonatoID, nameCampeonato, serieID, nameSerie } =
    useSelector(selectSerieToRodada);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameUser = (userId) => {
    const username = usersArray.filter((user) => {
      if (user.id == userId) {
        return user;
      }
    });
    return username[0].username;
  };

  return (
    <div>
      <h1>
        {nameCampeonato} - {nameSerie} - Players
      </h1>
      {rodadaArray &&
        rodadaArray.map(({ id, points, userId }) => {
          return (
            <div key={id}>
              <p>
                {nameUser(userId)} {points}
                <FaPenToSquare
                  onClick={() => {
                    dispatch(
                      saveUpdatePlayer({
                        id,
                        points,
                        userId,
                        username: nameUser(userId),
                      })
                    );
                    navigate("/editarRodada");
                  }}
                />
                {/*<FaTrashCan
                  onClick={() => {
                    const deleteSerie = { campeonatoID: campeonato.id, id };
                    dispatch(handleDeleteSerie(deleteSerie));
                  }}
                /> */}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default Rodada;
