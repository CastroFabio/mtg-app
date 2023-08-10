import React, { useState } from "react";

//import { UserContext } from "../../context/user.context";
//import { AdminContext } from "../../context/admin.context";

import { BASE_URL, fazRequest } from "../../utils/client";

import { useNavigate } from "react-router-dom";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const defaultFormFields = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  //const { setCurrentUser, currentUser } = useContext(UserContext);
  //const { setCurrentAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password, confirmPassword } = formFields;

  const handleSignUp = async () => {
    try {
      const body = JSON.stringify({ username, password });
      const response = await fazRequest(endpointRoutes.signUp, "POST", body);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", JSON.stringify(data.username));

        navigate("/signin");
      } else {
        console.error("Cadastro failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Cadastro</h1>

      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
      />

      <input
        type="password"
        placeholder="Confirmar Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange}
      />
      <button onClick={handleSignUp}>Criar Cadastro</button>
    </div>
  );
};

export default SignUp;
