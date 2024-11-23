// src/services/api.js

const BASE_URL = 'https://keen-unicorn-487a0d.netlify.app/.netlify/functions/api';

// This function now supports sending a POST request with the filter data
export async function fetchData(endpoint, { method = 'POST', body = null, headers = {} }) {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,  // Only include body if provided
    };

    const response = await fetch(`${BASE_URL}/${endpoint}`, options);

    if (!response.ok) throw new Error('Failed to fetch data');

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}
