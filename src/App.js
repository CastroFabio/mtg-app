import "./App.css";

import SignIn from "./components/signIn/signIn.component";
import SignUp from "./components/signUp/signUp.component";
import Navigation from "./Routes/navigation/navigation.component";
import Home from "./Routes/home/homepage.component";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
