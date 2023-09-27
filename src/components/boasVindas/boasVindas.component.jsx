import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

const BoasVindas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(setUrl(null));
  dispatch(setButtonAction(null));

  return (
    <section>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/campeonato")}>
        Campeonato
      </h1>
      <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/credito")}>
        Crédito
      </h1>
    </section>
  );
};

export default BoasVindas;
