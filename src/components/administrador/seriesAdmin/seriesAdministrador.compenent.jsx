const SeriesAdministrador = (props) => {
  return (
    <div>
      <h2>Series</h2>
      <p>Serie 1 X Editar</p>
      <p>Serie 2 X Editar</p>
      <p>Serie 3 X Editar</p>
      <p>Serie 4 X Editar</p>
      <p>Serie 5 X Editar</p>
      <br />
      <form type="submit">
        <label>Nome</label>
        <input type="text" />
        <label>Data</label>
        <input type="text" />
        <br />
        <button>Salvar</button>
        <button>Cancelar</button>
      </form>
      <button onClick={props.mostrarRodadasAdmin}>Rodadas</button>
    </div>
  );
};

export default SeriesAdministrador;
