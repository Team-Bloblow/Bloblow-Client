import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetPostCountList = async (keywordId, cursorId = "") => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/keywords/${keywordId}/postCount`,
    params: `?cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetPostCountList;
