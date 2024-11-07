import fetchHandler from "..";

const asyncPostKeyword = async (keywordInfo) => {
  const fetchInfo = {
    url: "/keyword",
    method: "POST",
    params: "",
    body: keywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPostKeyword;
