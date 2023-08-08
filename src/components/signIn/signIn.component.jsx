import { useState } from "react";
import User from "../user.component";

const defaultFormFields = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      {/* <User /> */}
      <h1>Login</h1>
      <form onSubmit={() => {}}>
        <lablel>Username</lablel>
        <input
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        ></input>
        <br />
        <lablel>Senha</lablel>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
