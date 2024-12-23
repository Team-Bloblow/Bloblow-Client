import fetchHandler from "..";
import { BASE_URL, POST_LISTS } from "../../config/constants";

const asyncGetPosts = async (
  cursorId = POST_LISTS.DEFAULT_CURSOR_ID,
  {
    keywordId,
    includedKeyword = POST_LISTS.DEFAULT_INCLUDED_KEYWORD,
    excludedKeyword = POST_LISTS.DEFAULT_EXCLUDED_KEYWORD,
    limit = POST_LISTS.DEFAULT_LIMIT,
  }
) => {
  const includedKeywordParams = includedKeyword.length === 0 ? "" : includedKeyword.join();
  const excludedKeywordParams = excludedKeyword.length === 0 ? "" : excludedKeyword.join();
  const fetchInfo = {
    url: `${BASE_URL}/posts/${keywordId}`,
    params: `?includedKeyword=${includedKeywordParams}&excludedKeyword=${excludedKeywordParams}&limit=${limit}&cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetPosts;
