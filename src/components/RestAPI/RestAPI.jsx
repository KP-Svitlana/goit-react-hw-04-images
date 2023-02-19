import axios from 'axios';

const API_KEY = '33564179-6b2e988bcacb2b304e2ebfd76';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function RestAPI(value, page) {
  try {
    const response = await axios.get(
      `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
}
