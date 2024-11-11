import fetchHandler from "..";
import { BASE_URL } from "../../config/constants";

const asyncEditSubkeyword = async (subkeywordInfo, keywordId) => {
  const fetchInfo = {
    url: `${BASE_URL}/keywords/${keywordId}`,
    method: "PUT",
    params: "",
    body: subkeywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncEditSubkeyword;
