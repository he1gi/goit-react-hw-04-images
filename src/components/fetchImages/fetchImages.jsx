import axios from 'axios';

const API_KEY = '29341335-b9d8b4c451f4a87d12ab142f3';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function fetchImages(inputValue, page = 1) {
  return axios
    .get(
      `?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(r => r.data.hits);
}
