import { Fragment, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../context/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("username");
    const initialValue = JSON.parse(saved);
    return initialValue.charAt(0).toUpperCase() + initialValue.slice(1) || "";
  });

  return (
    <Fragment>
      <div>
        <p>Olá {username}</p>
        <p>Você possui X PedroPoints!</p>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
