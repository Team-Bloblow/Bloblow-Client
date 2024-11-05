import fetchHandler from "..";

const asyncPostSignIn = async (userInfo) => {
  const fetchInfo = {
    url: "/signIn",
    method: "POST",
    params: "",
    body: {
      ...userInfo,
      joinedAt: new Date().toISOString(),
      lastSignInAt: new Date().toISOString(),
    },
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostSignIn;
