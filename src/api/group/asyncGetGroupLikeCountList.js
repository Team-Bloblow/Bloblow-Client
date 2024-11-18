import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetGroupLikeCountList = async (cursorId = "", groupId) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/posts/groups/${groupId}/likeCount`,
    params: `?cursorId=${cursorId}`,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetGroupLikeCountList;
