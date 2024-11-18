import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetAdCountList = async (keywordId, cursorId, period) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/posts/keywords/${keywordId}/adCount`,
    params: `?cursorId=${cursorId}&period=${period}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetAdCountList;
