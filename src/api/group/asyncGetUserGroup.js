import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetUserGroup = async (userId) => {
  const fetchInfo = {
    url: `${BASE_URL}/groups/${userId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetUserGroup;
