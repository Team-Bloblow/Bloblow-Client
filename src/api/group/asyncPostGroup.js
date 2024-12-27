import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPostGroup = async (groupInfo) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/group`,
    method: "POST",
    params: "",
    body: groupInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostGroup;
