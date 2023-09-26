import "../campeonatos/campeonatosCard.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { saveSelectedSerie } from "../../store/campeonatos/seriesSlice";
import formatDate from "../../utils/formatDate";

const SeriesCard = ({ campeonato, serie, handleDelete }) => {
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
      <div className="campenatos-botoes">
        <a
          className="btn-white small"
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
          className="btn-white small"
          onClick={() => {
            if (window.confirm("Tem certeza que deseja deletar a serie?"))
              handleDelete(campeonato.id, serie.id);
          }}
        >
          Deletar
        </a>
      </div>
    </div>
  );
};

export default SeriesCard;
