import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetGroupCommentCountList = async (cursorId = "", groupId) => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/groups/${groupId}/commentCount`,
    params: `?cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetGroupCommentCountList;
