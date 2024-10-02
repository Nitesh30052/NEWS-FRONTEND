import axios from 'axios';

export const fetchTopHeadlines = async (page = 1, category = '') => {
  const response = await axios.get('https://news-backend-nitesh.onrender.com/api/news', {
    params: {
      page: page,
      category: category,
    },
  });
  return response.data;
};
