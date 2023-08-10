import React, { useState, useContext } from "react";

//import { UserContext } from "../../context/user.context";
import { AdminContext } from "../../context/admin.context";

import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { fazRequest } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const { setCurrentUser, currentUser } = useContext(UserContext);
  const { setCurrentAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const body = JSON.stringify({ username, password });
      const response = await fazRequest(
        endpointRoutes.login,
        "POST",
        body,
        false
      );

      if (response.ok) {
        const data = await response.json();
        const decodedPayload = jwt(data.access_token);

        localStorage.setItem("accessToken", JSON.stringify(data.access_token));
        localStorage.setItem(
          "username",
          JSON.stringify(decodedPayload.username)
        );
        localStorage.setItem("admin", JSON.stringify(decodedPayload.admin));

        setCurrentAdmin(decodedPayload.admin);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
