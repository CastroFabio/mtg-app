import "./App.css";

import Login from "./components/signIn/signIn.component";
import SignUp from "./components/signUp/signUp.component";

import Navigation from "./Routes/navigation/navigation.component";

import Campeonatos from "./components/campeonatos/campeonatos.component";
import EditarCampeonato from "./components/campeonatos/editarCampeonato.component";
import CriarCampeonato from "./components/campeonatos/criarCampeonato.component";

import Series from "./components/series/series.component";
import EditarSerie from "./components/series/editarSerie.component";
import CriarSerie from "./components/series/criarSerie.component";

import Rodada from "./components/rodadas/rodadas.component";

import { Routes, Route } from "react-router-dom";
import EditarRodada from "./components/rodadas/editarRodada";
import CriarRodada from "./components/rodadas/criarRodada";
import BoasVindas from "./components/boasVindas/campeonatos.component";

const App = () => {
  return (
    <Routes>
      <Route index path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<BoasVindas />} />
        <Route path="/campeonato" element={<Campeonatos />} />
        <Route path="/editarCampeonato" element={<EditarCampeonato />} />
        <Route path="/criarCampeonato" element={<CriarCampeonato />} />
        <Route path="/serie" element={<Series />} />
        <Route path="/editarSerie" element={<EditarSerie />} />
        <Route path="/criarSerie" element={<CriarSerie />} />
        <Route path="/rodada" element={<Rodada />} />
        <Route path="/editarRodada" element={<EditarRodada />} />
        <Route path="/criarRodada" element={<CriarRodada />} />
      </Route>
    </Routes>
  );
};

export default App;
