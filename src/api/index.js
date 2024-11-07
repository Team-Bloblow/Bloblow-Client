const fetchHandler = async ({ url, method = "GET", params, body }) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : `${url}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    console.error(response.status);
  }

  return await response.json();
};

export default fetchHandler;
