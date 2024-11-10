import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncGetKeyword = async (keywordId) => {
  const fetchInfo = {
    url: `${BASE_URL}/keywords/${keywordId}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncGetKeyword;
