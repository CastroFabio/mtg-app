import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import {
  FaFacebook,
  FaInstagram,
  FaTwitch,
  FaTiktok,
  FaXTwitter,
  FaRegCalendar,
} from "react-icons/fa6";

import {
  selectCurrentUser,
  selectCurrentUserIsLoggedIn,
  selectCurrentUserPoints,
} from "../../store/user/userSlice";
import {
  getButtonAction,
  getUrl,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentUserIsLoggedIn = useSelector(selectCurrentUserIsLoggedIn);
  const currentUserPoints = useSelector(selectCurrentUserPoints);

  const url = useSelector(getUrl);
  const urlToNavigate = useSelector(getButtonAction);

  const usernameFormatado = currentUser
    ? currentUser.username.charAt(0).toUpperCase() +
      currentUser.username.slice(1)
    : "Usuário";

  const navigate = useNavigate();

  return (
    <Fragment>
      <header>
        <div className="wrapper">
          <span className="shadow bottom">GEEK PLACE PLAY'N'PUB </span>
        </div>
      </header>
      <div className="main-container">
        <main className="content ">
          <div className="content-header-backgroud"></div>

          <div className="content-header">
            <div className="content-header-title">
              <div>
                {" "}
                <h2>{url?.title ?? ""}</h2>
              </div>
              <div> {url?.url ?? ""} </div>
            </div>
            {urlToNavigate ? (
              <a className="btn-white" onClick={() => navigate(urlToNavigate)}>
                Criar
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="content-components ">
            <div className="watermark"></div>
            <div style={{ position: "relative" }}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <footer>
        <div className="container-footer">
          <span className="copyright">
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
