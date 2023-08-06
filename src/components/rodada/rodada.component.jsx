const Rodada = (props) => {
  return (
    <div>
      <h1>Campeonato X - Serie X - Rodadas</h1>
      <p>Emerson X pts</p>
      <p>Careca X pts</p>
      <p>Bolores X pts</p>
      <p>Xandovisky X pts</p>
      <p>Tio Chico X pts</p>

      <button onClick={props.mostrarCampeonatos}>Campeonatos</button>
    </div>
  );
};
export default Rodada;
