import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncDeleteKeyword = async (keywordId) => {
  const fetchInfo = {
    method: "DELETE",
    url: `${API_BASE_URL}/keyword/${keywordId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncDeleteKeyword;
