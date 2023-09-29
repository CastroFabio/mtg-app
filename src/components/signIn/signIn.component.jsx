import React, { useEffect, useState } from "react";
import "./signIn.style.css";
import {
  handleLogin,
  selectCurrentUserError,
  selectCurrentUser,
  logout,
} from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate } from "react-router-dom";

const defaultFormFields = {
  username: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [getFinishedUseEffect, setFinishedUseEffect] = useState(false);

  const { username, password } = formFields;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(handleLogin(formFields));
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  useEffect(() => {
    const load = async () => {
      await dispatch(await logout());
      setFinishedUseEffect(true);
    };

    load();
  }, []);

  const currentUserError = useSelector(selectCurrentUserError);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={handleChange}
          />
          <div className="buttons">
            <button
              onClick={() => navigate("/signup")}
              className="register-button"
            >
              Register
            </button>
            <button type="submit" className="login-button">
              Login
            </button>
          </div>

          {currentUserError ? <p>{currentUserError}</p> : null}

          {currentUser && getFinishedUseEffect ? (
            <Navigate to="/" replace={true} />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
