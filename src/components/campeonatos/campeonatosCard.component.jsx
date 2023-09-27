import "./campeonatosCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveSelectedTournament } from "../../store/campeonatos/campeonatosSlice";
import { selectCurrentUser } from "../../store/user/userSlice";

const CampeonatosCard = ({ campeonato, handleDelete }) => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="campeonatos-card">
      <a
        className="border titulo-card campenatos-conteudo"
        style={{ cursor: "pointer", width: "100%" }}
        onClick={async () => {
          await dispatch(saveSelectedTournament(campeonato));
          navigate("/serie");
        }}
      >
        {campeonato.name}
      </a>
      {currentUser.admin ? (
        <div style={{ display: "flex" }}>
          <div className="campenatos-botoes">
            <a
              className="btn-white small btn-edit"
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
              className="btn-white small btn-delete"
              onClick={() => {
                if (
                  window.confirm("Tem certeza que deseja deletar o campeonato?")
                )
                  handleDelete(campeonato.id);
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

export default CampeonatosCard;
