import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncEditSubKeyword = async (subKeywordInfo, keywordId) => {
  const fetchInfo = {
    url: `${BASE_URL}/keywords/${keywordId}`,
    method: "PUT",
    params: "",
    body: subKeywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncEditSubKeyword;
