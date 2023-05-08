const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '34499187-b966d60bee54df692b8f37eb6';

const getImages = (searchText, page = 1) => {
  console.log(page);
  return fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${searchText}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Something wrong, please try again `));
  });
};

const api = {
  getImages,
};

export default api;
