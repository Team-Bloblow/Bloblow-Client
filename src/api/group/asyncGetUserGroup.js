import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetUserGroup = async (userUid) => {
  const fetchInfo = {
    url: `${BASE_URL}/groups/${userUid}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetUserGroup;
