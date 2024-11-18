import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetTodayPostCount = async (keywordId) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/posts/keywords/${keywordId}/today`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetTodayPostCount;
