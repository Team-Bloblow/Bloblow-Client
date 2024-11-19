import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPostSignIn = async (userInfo) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/user/signIn`,
    method: "POST",
    params: "",
    body: userInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostSignIn;
