const Campeonatos = (props) => {
  return (
    <div>
      <h1>Campeonatos</h1>
      <p>Campeonato 1</p>
      <p>Campeonato 2</p>
      <p>Campeonato 3</p>
      <p>Campeonato 4</p>
      <p>Campeonato 5</p>

      <button onClick={props.mostrarSeries}>Series</button>
    </div>
  );
};

export default Campeonatos;
