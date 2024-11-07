import fetchHandler from "..";
import { BASE_URL } from "../../config/const";

const asyncPostKeyword = async (keywordInfo) => {
  const fetchInfo = {
    url: `${BASE_URL}/keyword`,
    method: "POST",
    params: "",
    body: keywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostKeyword;
