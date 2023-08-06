import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <Fragment>
      <div>
        <p>Olá Fulano</p>
        <p>Você possui X PedroPoints!</p>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
