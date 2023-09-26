import React, { useEffect, useState } from "react";
import {
  handleLogin,
  selectCurrentUserError,
  selectCurrentUser,
  logout,
} from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const defaultFormFields = {
  username: "",
  password: "",
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [getFinishedUseEffect, setFinishedUseEffect] = useState(false);

  const { username, password } = formFields;

  const dispatch = useDispatch();

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
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button>login</button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
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
