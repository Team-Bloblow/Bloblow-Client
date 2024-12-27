import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPostKeywords = async (keywordId) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/keywords/${keywordId}`,
    method: "POST",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostKeywords;
