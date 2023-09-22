import { useDispatch } from "react-redux";
import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

const BoasVindas = () => {
  const dispatch = useDispatch();
  dispatch(setUrl(null));
  dispatch(setButtonAction(null));

  return <section>Seja bem vindo! FODA SE</section>;
};

export default BoasVindas;
