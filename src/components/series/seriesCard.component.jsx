import "../campeonatos/campeonatosCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { saveSelectedSerie } from "../../store/campeonatos/seriesSlice";
import formatDate from "../../utils/formatDate";
import { selectCurrentUser } from "../../store/user/userSlice";

const SeriesCard = ({ campeonato, serie, handleDelete }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="campeonatos-card">
      <a
        style={{ cursor: "pointer", width: "100%" }}
        onClick={async () => {
          await dispatch(saveSelectedSerie(serie));
          navigate("/rodada");
        }}
      >
        <div className="campenatos-conteudo">
          {serie.name} - {formatDate(serie.date)}
        </div>
      </a>
      {currentUser.admin ? (
        <div style={{ display: "flex" }}>
          <div className="campenatos-botoes">
            <a
              className="btn-white small btn-edit"
              onClick={async () => {
                await dispatch(saveSelectedSerie(serie));
                navigate("/editarSerie");
              }}
            >
              Editar
            </a>
          </div>
          <div className="campenatos-botoes">
            <a
              className="btn-white small btn-delete"
              onClick={() => {
                if (window.confirm("Tem certeza que deseja deletar a serie?"))
                  handleDelete(campeonato.id, serie.id);
              }}
            >
              Deletar
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SeriesCard;
