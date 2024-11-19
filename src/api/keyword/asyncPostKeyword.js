import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPostKeyword = async (keywordInfo) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/keyword`,
    method: "POST",
    params: "",
    body: keywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostKeyword;
