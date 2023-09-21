import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {
  logout,
  selectCurrentUser,
  selectCurrentUserIsLoggedIn,
  selectCurrentUserPoints,
} from "../../store/user/userSlice";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentUserIsLoggedIn = useSelector(selectCurrentUserIsLoggedIn);
  const currentUserPoints = useSelector(selectCurrentUserPoints);

  const usernameFormatado = currentUser
    ? currentUser.username.charAt(0).toUpperCase() +
      currentUser.username.slice(1)
    : "Usuário";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <section>
        <button onClick={() => navigate("/campeonato")}>Home</button>

        <p>Olá {usernameFormatado}!</p>
        <p>Você possui {currentUserPoints || 0} PedroPoints!</p>
      </section>
      <section style={{ textAlign: "right" }}>
        {currentUserIsLoggedIn ? (
          <a
            href="/signin"
            onClick={() => {
              dispatch(logout());
              navigate("/signin");
            }}
          >
            Sign Out
          </a>
        ) : (
          <a href="/signin">Sign In</a>
        )}
      </section>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
