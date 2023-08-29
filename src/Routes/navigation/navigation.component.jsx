import { Fragment, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("username");
    const initialValue = JSON.parse(saved);
    return initialValue.charAt(0).toUpperCase() + initialValue.slice(1) || "";
  });

  return (
    <Fragment>
      <section>
        <p>Olá {username}</p>
        <p>Você possui X PedroPoints!</p>
      </section>
      <section style={{ textAlign: "right" }}>
        {currentUser ? (
          <a href="/signin">Sign Out</a>
        ) : (
          <a href="/signin">Sign In</a>
        )}
      </section>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
