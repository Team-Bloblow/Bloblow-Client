import fetchHandler from "..";
import { POST_LISTS } from "../../config/constants";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetPosts = async (
  cursorId = POST_LISTS.DEFAULT_CURSOR_ID,
  {
    keywordId,
    order = POST_LISTS.DEFAULT_ORDER,
    includedKeyword = [],
    excludedKeyword = [],
    isAd = POST_LISTS.DEFAULT_IS_AD,
    limit = POST_LISTS.DEFAULT_LIMIT,
  }
) => {
  const includedKeywordParams = includedKeyword.length === 0 ? "" : includedKeyword.join();
  const excludedKeywordParams = excludedKeyword.length === 0 ? "" : excludedKeyword.join();
  const fetchInfo = {
    url: `${API_BASE_URL}/posts/${keywordId}`,
    params: `?order=${order}&includedKeyword=${includedKeywordParams}&excludedKeyword=${excludedKeywordParams}&isAd=${isAd}&limit=${limit}&cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetPosts;
