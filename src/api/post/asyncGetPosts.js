import fetchHandler from "..";
import { BASE_URL, POST_LISTS } from "../../config/const";

const asyncGetPosts = async (
  cursorId = POST_LISTS.CURSOR_ID,
  { keywordId, includedKeyword = POST_LISTS.DEFAULT_INCLUDED_KEYWORD, limit = POST_LISTS.LIMIT }
) => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/${keywordId}`,
    params: `?includedKeyword=${includedKeyword}&limit=${limit}&cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetPosts;
