import { useState } from "react";

const defaultFormFields = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password, confirmPassword } = formFields;

  console.log(formFields);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
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
