import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleCreateSerie } from "../../store/campeonatos/seriesSlice";
import { selectCampeonatoToSeries } from "../../store/campeonatos/campeonatosSlice";

const CriarCampeonato = () => {
  // const [tempSerieName, setTempSerieName] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const campeonato = useSelector(selectCampeonatoToSeries);
  // const getSerieData = (e) => {
  //   setTempSerieName(e.target.value);
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(
  //     handleCreateSerie({ campeonatoID: campeonato.id, tempSerieName })
  //   );
  //   setTempSerieName(" ");
  //   navigate("/serie");
  // };
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>Criar Série nova</label>
  //     <input
  //       type="text"
  //       name="name"
  //       value={tempSerieName}
  //       onChange={getSerieData}
  //     />
  //   </form>
  // );
};

export default CriarCampeonato;
