const CampeonatosAdministrador = (props) => {
  return (
    <div>
      <h2>Campeonatos</h2>
      <p>Campeonato 1 X Editar</p>
      <p>Campeonato 2 X Editar</p>
      <p>Campeonato 3 X Editar</p>
      <p>Campeonato 4 X Editar</p>
      <p>Campeonato 5 X Editar</p>
      <br />
      <form type="submit">
        <label>Nome</label>
        <input type="text" />
        <br />
        <button>Salvar</button>
        <button>Cancelar</button>
      </form>
      <button onClick={props.mostrarSeriesAdmin}>Series</button>
    </div>
  );
};

export default CampeonatosAdministrador;
