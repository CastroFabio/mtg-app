import { useEffect } from "react";
import { fetchAllUsers, selectAllUsers } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSerieToRodada } from "../../store/campeonatos/seriesSlice";
import {
  fetchRodadas,
  selectAllRodadas,
} from "../../store/campeonatos/rodadasSlice";

const Rodada = () => {
  const rodadaArray = useSelector(selectAllRodadas);

  const { campeonatoID, nameCampeonato, serieID, nameSerie } =
    useSelector(selectSerieToRodada);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRodadas({ campeonatoID, serieID }));
  }, []);

  return (
    <div>
      <h1>
        {nameCampeonato} - {nameSerie} - Usuários
        {rodadaArray &&
          rodadaArray.map(({ id, username }) => {
            return (
              <div key={id}>
                <p>{username}</p>
              </div>
            );
          })}
      </h1>
    </div>
  );
};

export default Rodada;
