import fetchHandler from "..";

const asyncGetUserGroup = async (userId) => {
  const fetchInfo = {
    url: `/groups/${userId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetUserGroup;
