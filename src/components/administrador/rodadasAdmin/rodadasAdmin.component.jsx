const RodadasAdministrador = (props) => {
  return (
    <div>
      <h2>Rodadas</h2>
      <p>Rodada 1 X Editar</p>
      <p>Rodada 2 X Editar</p>
      <p>Rodada 3 X Editar</p>
      <p>Rodada 4 X Editar</p>
      <p>Rodada 5 X Editar</p>
      <br />
      <form type="submit">
        <label>Jogador</label>
        <input type="text" />
        <label>Pontos</label>
        <input type="text" />
        <br />
        <button>Salvar</button>
        <button>Cancelar</button>
        <br />
        <button onClick={props.mostrarCampeonatosAdmin}>Campeonatos</button>
      </form>
    </div>
  );
};

export default RodadasAdministrador;
