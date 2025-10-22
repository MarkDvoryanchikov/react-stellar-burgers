export const API_URL = 'https://norma.education-services.ru/api';

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
};

export const request = (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
    .then(checkResponse)
    .catch((error) => {
      if (error.name === 'TypeError') {
        throw new Error(`Ошибка подключения: ${error.message}`);
      }
      throw error;
    });
};
