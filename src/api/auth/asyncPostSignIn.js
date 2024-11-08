import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncPostSignIn = async (userInfo) => {
  const fetchInfo = {
    url: `${BASE_URL}/signIn`,
    method: "POST",
    params: "",
    body: userInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostSignIn;
