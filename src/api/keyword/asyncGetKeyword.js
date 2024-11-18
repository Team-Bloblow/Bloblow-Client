import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetKeyword = async (keywordId) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/keywords/${keywordId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetKeyword;
