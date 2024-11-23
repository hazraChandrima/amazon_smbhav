const BASE_URL =
  "https://keen-unicorn-487a0d.netlify.app/.netlify/functions/api";

/**
 * Fetch data from the API with query parameters.
 * @param {string} endpoint - The API endpoint to hit.
 * @param {Object} options - Request options, including method and params.
 * @param {string} options.method - HTTP method (default: 'GET').
 * @param {Object} options.params - Query parameters to include in the request.
 * @returns {Promise<Object>} - The JSON response from the API.
 */
export async function fetchData(endpoint, { method = "GET", params = {} }) {
  try {
    // Construct query string from params object
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/${endpoint}?${queryString}`;

    // Fetch data from the API
    const response = await fetch(url, { method });

    // Handle non-200 responses
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}
