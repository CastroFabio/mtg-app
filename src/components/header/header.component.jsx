import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getButtonAction,
  getUrl,
} from "../../store/campeonatos/navigationSlice";
import {
  logout,
  selectCurrentUser,
  selectCurrentUserPoints,
} from "../../store/user/userSlice";
import LogoMago from "../../assets/MagoPedrao/LogoMagoPedrao2.png";
import formatName from "../../utils/formatName";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserPoints = useSelector(selectCurrentUserPoints);
  const url = useSelector(getUrl);
  const urlToNavigate = useSelector(getButtonAction);
  return (
    <div>
      <header>
        <div className="wrapper">
          <div className="shadow bottom">
            <div className="header-content">
              <div className="header-content-1">
                <h2>GEEK PLACE PLAY'N'PUB</h2>
              </div>
              <div className="header-content-2">
                {currentUser ? (
                  <Fragment>
                    <div className="header-content-3">
                      <div>Olá {formatName(currentUser.username)}</div>
                    </div>
                    <div>{currentUserPoints} pontos</div>
                    <div>
                      <a
                        className="pointer"
                        onClick={() => {
                          navigate("/");
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </Fragment>
                ) : (
                  <div>
                    <a className="pointer" onClick={() => navigate("/signin")}>
                      Login
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="main-container">
        <main className="content ">
          <div className="content-header-backgroud"></div>

          <div className="content-header">
            <div className="content-header-title">
              <div>
                <h2>{url?.title ?? ""}</h2>
              </div>
              <div> {url?.url ?? ""} </div>
            </div>
            <div className="content-header-buttons">
              {currentUser && currentUser.admin ? (
                <h2>
                  <a className="pointer" onClick={() => navigate("/credito")}>
                    Créditos
                  </a>
                </h2>
              ) : (
                ""
              )}
              {currentUser ? (
                <h2>
                  <a
                    className="pointer"
                    onClick={() => navigate("/campeonato")}
                  >
                    Campeonatos
                  </a>
                </h2>
              ) : (
                ""
              )}
              {urlToNavigate && currentUser && currentUser.admin ? (
                <a
                  className="btn-white"
                  onClick={() => navigate(urlToNavigate)}
                >
                  Criar
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="content-components">
            <div className="watermark"></div>
            <div className="content-components-outlet">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
