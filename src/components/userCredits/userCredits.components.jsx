import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  setButtonAction,
  setUrl,
} from "../../store/campeonatos/navigationSlice";

import { fetchUsersCreditBalance } from "../../utils/userCreditsEndpoints";

const UserCredits = () => {
  const [error, setError] = useState(null);
  if (error) {
    throw error;
  }

  const dispatch = useDispatch();

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
    <div className="">
      {getUsersCreditsBalance &&
        getUsersCreditsBalance.map(({ userId, userName, points }) => {
          return (
            <div key={userId}>
              {userName} {points}
            </div>
          );
        })}
    </div>
  );
};

export default UserCredits;
