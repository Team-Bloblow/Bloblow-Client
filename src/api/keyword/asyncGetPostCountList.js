import fetchHandler from "..";
import { BASE_URL, PERIOD_TYPE } from "../../config/constants";

const asyncGetPostCountList = async (keywordId, cursorId = "", unit = PERIOD_TYPE.WEEKLY) => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/${keywordId}/postCount`,
    params: `?unit=${unit}&cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetPostCountList;
