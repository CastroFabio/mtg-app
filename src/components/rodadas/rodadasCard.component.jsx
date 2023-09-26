import "../campeonatos/campeonatosCard.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { saveSelectedSerie } from "../../store/campeonatos/seriesSlice";
import formatDate from "../../utils/formatDate";

const RodadasCard = ({
  campeonato,
  serie,
  rodadaId,
  user,
  points,
  handleDelete,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="campeonatos-card">
      <div className="campenatos-conteudo">
        {user.id} - {user.username} - pontos: {points}
      </div>

      <div className="campenatos-botoes">
        <a
          className="btn-white small"
          onClick={() => {
            if (window.confirm("Tem certeza que deseja deletar a rodada?"))
              handleDelete(campeonato.id, serie.id, rodadaId);
          }}
        >
          Deletar
        </a>
      </div>
    </div>
  );
};

export default RodadasCard;
