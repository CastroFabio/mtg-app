import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchUsers } from "../../utils/userEndpoints";

import { createUserCredit } from "../../utils/userCreditsEndpoints";

const CriarCredito = () => {
  const [getCreditPoint, setCreditPoint] = useState(0);
  const [getUserOptions, setUserOptions] = useState(null);
  const [getSelected, setSelected] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserCredit({
      userId: Number(getSelected),
      points: Number(getCreditPoint),
    });

    navigate("/credito");
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUsers();
      const userOptions = [{ value: "", text: "" }];

      data.forEach((element) => {
        userOptions.push({ value: element.id, text: element.username });
      });

      setUserOptions(userOptions);
      setSelected(userOptions[0].value);
    };

    getData();
  }, []);

  if (getUserOptions == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="criarUserCreditForm border">
      <form onSubmit={handleSubmit}>
        <h2>Criar novo Crédito</h2>
        <select value={getSelected} onChange={handleChange}>
          {getUserOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <div>
          <input
            className="criarUserCreditInput"
            type="text"
            name="date"
            value={getCreditPoint}
            onChange={(e) => setCreditPoint(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </div>
      </form>
    </section>
  );
};

export default CriarCredito;
