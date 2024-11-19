import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetUserGroup = async (userUid) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/groups/${userUid}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetUserGroup;
