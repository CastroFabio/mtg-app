const Series = (props) => {
  return (
    <div>
      <h1>Campeonato X - Series</h1>
      <p>Serie 1</p>
      <p>Serie 2</p>
      <p>Serie 3</p>
      <p>Serie 4</p>
      <p>Serie 5</p>

      <button onClick={props.mostrarRodadas}>Rodadas</button>
    </div>
  );
};
export default Series;
