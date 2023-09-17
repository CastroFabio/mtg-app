export const BASE_URL = "http://localhost:3001";

export const setInLocalStorage = (keyName, keyValue) => {
  localStorage.setItem(keyName, JSON.stringify(keyValue));
};

export const getFromLocalStorage = (keyName) => {
  return JSON.parse(localStorage.getItem(keyName));
};

export const fazRequest = async (
  URL,
  method,
  body = null,
  isAccessTokenNeeded = true
) => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (isAccessTokenNeeded) {
    Object.assign(headers, {
      Authorization: `Bearer ${getFromLocalStorage("accessToken")}`,
    });
  }

  const completeURL = BASE_URL + URL;
  const request = {
    method,
    headers,
    body,
  };

  console.log(`URL: ${completeURL}`);
  console.log(request);

  return await fetch(completeURL, request);
};
