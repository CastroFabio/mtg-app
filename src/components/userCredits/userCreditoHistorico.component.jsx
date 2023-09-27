import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUserID } from "../../store/user/userCreditsSlice";
import { fetchUsersCreditByID } from "../../utils/userCreditsEndpoints";
import { setUrl } from "../../store/campeonatos/navigationSlice";
import formatDate from "../../utils/formatDate";
import formatName from "../../utils/formatName";
import "./userCredits.style.css";

const UserCreditoHistorico = () => {
  const [error, setError] = useState(null);
  const [getUserCredits, setUserCredits] = useState(null);

  if (error) {
    throw error;
  }

  const { userId, userName } = useSelector(getSelectedUserID);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(setUrl({ title: "Histórico", url: "" }));
        const dataUserCredits = await fetchUsersCreditByID(userId);
        setUserCredits(dataUserCredits);
      } catch (err) {
        setError(err);
      }
    };
    getData();
  }, []);

  if (getUserCredits == null) {
    return <h2>Loading...</h2>;
  }

  console.log(getUserCredits);

  return (
    <div>
      <h1>Histórico do Usuário</h1>
      <h2>{formatName(userName)}</h2>
      <ul>
        {getUserCredits &&
          getUserCredits.map(({ userId, id, points, createdAt }) => {
            return (
              <div className="user-credito" key={id}>
                {points} {formatDate(createdAt)}
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default UserCreditoHistorico;
