import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetReactionCountList = async (keywordId, cursorId, period) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/posts/keywords/${keywordId}/reactionCount`,
    params: `?cursorId=${cursorId}&period=${period}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetReactionCountList;
