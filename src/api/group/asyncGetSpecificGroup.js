import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetSpecificGroup = async (groupId) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/group/${groupId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetSpecificGroup;
