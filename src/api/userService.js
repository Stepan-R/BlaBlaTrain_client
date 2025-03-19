const API_URL = import.meta.env.VITE_API_URL_USERS;

export const loginUser  = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error);
  }

  return await response.json();
};

export const signupUser  = async (email, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error);
  }

  return await response.json();
};