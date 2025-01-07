export const fetchMovies = async (query = "", page = 1) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_TOKEN;
  const API_URL = query
    ? `${API_BASE_URL}/search/movie?query=${query}&page=${page}`
    : `${API_BASE_URL}/discover/movie?page=${page}`;
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  return response.json();
};
