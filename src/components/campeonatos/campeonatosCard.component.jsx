import "./campeonatosCard.css";
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

const CampeonatosCard = (campeonato) => {
  return (
    <div className="campeonatos-card">
      <div className="campenatos-conteudo">{campeonato.name} asdasdaasd</div>
      <div className="campenatos-botoes"></div>
      <div className="campenatos-botoes"></div>
    </div>
  );
};

export default CampeonatosCard;
