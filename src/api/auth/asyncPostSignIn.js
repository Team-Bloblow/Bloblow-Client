import fetchHandler from "..";

const asyncPostSignIn = async (userInfo) => {
  const fetchInfo = {
    url: "/signIn",
    method: "POST",
    params: "",
    body: userInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostSignIn;
