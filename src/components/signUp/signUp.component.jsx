import { useState } from "react";

const defaultFormFields = {
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, password, confirmPassword } = formFields;

  console.log(formFields);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Cadastro</h1>
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
        <br />

        <lablel>Confirmar Senha</lablel>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        ></input>

        <button type="submit">Criar conta</button>
      </form>
    </div>
  );
};

export default SignUp;
