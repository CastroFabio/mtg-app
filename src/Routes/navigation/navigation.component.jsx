import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {
  FaFacebook,
  FaInstagram,
  FaTwitch,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

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
      <header>
        <span class="inner-text">GEEK PLACE PLAY'N'PUB </span>
      </header>
      <div class="main-container">
        <aside class="sidebar">
          <ul>
            <li>
              <a href="/campeonato">Campeonatos</a>
            </li>
            <li>
              <a href="#">Usuários</a>
            </li>
            <li>
              <a href="#">Pontos</a>
            </li>
          </ul>
        </aside>

        <main class="content">
          <div class="component-url">Liga das maquinas > Dia 25 > Rodada 2</div>
          <div class="components">
            <Outlet />
          </div>
        </main>
      </div>
      <footer>
        <div class="container-footer">
          <span class="copyright">
            Rua Chico Pinto, 417 - Centro - Araras - SP
          </span>
          <ul>
            <li>
              <a href="#">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="#">
                <FaXTwitter />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTiktok />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitch />
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* <main> 
          <header class="version-1">
            <div class="logo">
              <FontAwesomeIcon icon={faCoffee} />
            </div>
            <nav>
              <ul>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Posts</a></li>
              </ul>
            </nav>
            <a class="user" href="#">
              <FontAwesomeIcon icon={faUser} />Jane Doe
            </a>
          </header>
          
          <div class="meio">
            
          </div>
        </main> */}

      {/*        
       
       
        <section>
          <button onClick={() => navigate("/campeonato")}>Home</button>

          <p>Olá {usernameFormatado}!</p>
          <p>Você possui {currentUserPoints} PedroPoints!</p>
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
        <Outlet /> */}
    </Fragment>
  );
};

export default Navigation;
