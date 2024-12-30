import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetGroupSummary = async (userUid) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/groups/${userUid}/summary`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetGroupSummary;
