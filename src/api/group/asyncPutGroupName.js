import fetchHandler from "..";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPutGroupName = async ({ groupId, groupInfo }) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/group/${groupId}`,
    method: "PUT",
    params: "",
    body: groupInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

export default asyncPutGroupName;
