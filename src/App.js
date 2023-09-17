import "./App.css";

import Login from "./components/signIn/signIn.component";
import SignUp from "./components/signUp/signUp.component";
import Navigation from "./Routes/navigation/navigation.component";
import EditarCampeonato from "./components/campeonatos/editarCampeonato.component";
import Campeonatos from "./components/campeonatos/campeonatos.component";
import CriarCampeonato from "./components/campeonatos/criarCampeonato.component";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route index path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigation />}>
        <Route path="/home" element={<Campeonatos />} />
        <Route path="/editarCampeonato" element={<EditarCampeonato />} />
        <Route path="/criarCampeonato" element={<CriarCampeonato />} />
      </Route>
    </Routes>
  );
};

export default App;
