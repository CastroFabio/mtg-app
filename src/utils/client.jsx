export const BASE_URL = "http://localhost:3001";

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
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )}`,
    });
  }

  const completeURL = BASE_URL + URL;
  const request = {
    method,
    headers,
    body,
  };

  console.log("URL, request: ", completeURL, request);

  return await fetch(completeURL, request);
};
