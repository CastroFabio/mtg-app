import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

import { fetchUsersCreditBalance } from "../../utils/userCreditsEndpoints";

import { saveSelectedUserID } from "../../store/user/userCreditsSlice";
import { useNavigate } from "react-router-dom";

const UserCredits = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getUsersCreditsBalance, setUsersCreditsBalance] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        await dispatch(setUrl({ title: "Créditos", url: "" }));
        await dispatch(setButtonAction("/criarCredito"));
        setUsersCreditsBalance(await fetchUsersCreditBalance());
      } catch (err) {
        setError(err);
      }
    };

    load();
  }, []);

  if (getUsersCreditsBalance == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="rodadas">
      <ul>
        {getUsersCreditsBalance &&
          getUsersCreditsBalance.map(({ userId, userName, points }) => {
            return (
              <p key={userId}>
                <li
                  onClick={() => {
                    dispatch(saveSelectedUserID({ userName, userId }));
                    navigate("/historico");
                  }}
                >
                  <h4>{userName}</h4> {points}
                </li>
              </p>
            );
          })}
      </ul>
    </div>
  );
};

export default UserCredits;
