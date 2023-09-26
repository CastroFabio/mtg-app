import "./campeonatosCard.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";

const CampeonatosCard = ({ campeonato, handleDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="campeonatos-card">
      <a
        style={{ cursor: "pointer", width: "100%" }}
        onClick={async () => {
          await dispatch(saveSelectedTournament(campeonato));
          navigate("/serie");
        }}
      >
        <div className="campenatos-conteudo">{campeonato.name}</div>
      </a>
      <div className="campenatos-botoes">
        <a
          className="btn-white small"
          onClick={async () => {
            await dispatch(saveSelectedTournament(campeonato));
            navigate("/editarCampeonato");
          }}
        >
          Editar
        </a>
      </div>
      <div className="campenatos-botoes">
        <a
          className="btn-white small"
          onClick={() => {
            if (window.confirm("Tem certeza que deseja deletar o campeonato?"))
              handleDelete(campeonato.id);
          }}
        >
          Deletar
        </a>
      </div>
    </div>
  );
};

export default CampeonatosCard;