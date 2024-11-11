import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetTodayPostCount = async (keywordId) => {
  const fetchInfo = {
    url: `${BASE_URL}/posts/${keywordId}/today`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetTodayPostCount;
