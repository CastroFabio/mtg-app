import React, { useState } from "react";
import { useDispatch } from "react-redux";

import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { fazRequest, setInLocalStorage } from "../../utils/client";
import { endpointRoutes } from "../../utils/endpoitsRoutes";

import { setCurrentUser } from "../../store/user/user.action";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

        dispatch(setCurrentUser(decodedPayload));

        setInLocalStorage("accessToken", JSON.stringify(data.access_token));
        setInLocalStorage("username", JSON.stringify(decodedPayload.username));
        setInLocalStorage("admin", JSON.stringify(decodedPayload.admin));

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
