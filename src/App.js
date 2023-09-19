import "./App.css";

import Login from "./components/signIn/signIn.component";
import SignUp from "./components/signUp/signUp.component";

import Navigation from "./Routes/navigation/navigation.component";

import Campeonatos from "./components/campeonatos/campeonatos.component";
import EditarCampeonato from "./components/campeonatos/editarCampeonato.component";
import CriarCampeonato from "./components/campeonatos/criarCampeonato.component";

import Series from "./components/series/series.component";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route index path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigation />}>
        <Route path="/campeonato" element={<Campeonatos />} />
        <Route path="/editarCampeonato" element={<EditarCampeonato />} />
        <Route path="/criarCampeonato" element={<CriarCampeonato />} />
        <Route path="/serie" element={<Series />} />
      </Route>
    </Routes>
  );
};

export default App;
