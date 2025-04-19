import axios from 'axios';

const API_KEY = '49742049-be694405c40ea2d5a3f5aa174';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  return axios.get(BASE_URL, { params });
}
