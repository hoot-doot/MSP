export const fetchMovies = async (query = "", page = 1) => {
  const API_URL = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?page=${page}`;

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer `,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  return response.json();
};
