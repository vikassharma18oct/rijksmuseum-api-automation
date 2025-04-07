const sendRequest = async (request, endpoint) => {
  const response = await request.get(endpoint);

  let body;
  const contentType = response.headers()["content-type"];

  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text(); // fallback to text if not JSON
  }

  return { response, body };
};

module.exports = { sendRequest };
