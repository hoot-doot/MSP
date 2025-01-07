import { Box, Typography, Chip } from "@mui/material";
import { fetchMovies } from "../utils/api";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function FeaturedMovie({ selectedMovie }) {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const handleMovieSelect = (movie) => {
    setFeaturedMovie(movie);
  };
  // Default movie (in case nothing is selected)
  const movie = selectedMovie ||
    featuredMovie || {
      title: "",
      overview: "",
      vote_average: "",
      release_date: "",
      backdrop_path: "", // Default image
    };

  // Handle fetching movies and setting the featured movie
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results);

        // Pick a random movie for the featured section if no movie is selected
        if (!selectedMovie) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setFeaturedMovie(data.results[randomIndex]);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    loadMovies();
  }, [selectedMovie]); // Dependency on selectedMovie to update when it changes

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "90vh",
          p: 2,
          background: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center/cover no-repeat`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))",
          }}
        />
        <SearchBar onMovieSelect={handleMovieSelect} />
        <Box sx={{ position: "absolute", bottom: "70px", left: "20px", p: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {movie.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              maxWidth: "600px",
              fontWeight: "medium",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              textOverflow: "ellipsis",
            }}
          >
            {movie.overview}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Chip
              label={`IMDb: ${movie.vote_average}`}
              style={{
                backgroundColor: "#FACC14",
                fontWeight: "bold",
                fontSize: "20px",
                padding: "12px 24px",
                height: "auto",
                borderRadius: "25px",
              }}
            />

            <Chip
              label={`Released On: ${movie.release_date}`}
              style={{
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: "20px",
                padding: "12px 24px",
                height: "auto",
                borderRadius: "25px",
              }}
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
