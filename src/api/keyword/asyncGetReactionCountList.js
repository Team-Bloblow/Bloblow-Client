import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetReactionCountList = async (keywordId, cursorId, period) => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/keywords/${keywordId}/reactionCount`,
    params: `?cursorId=${cursorId}&period=${period}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetReactionCountList;
