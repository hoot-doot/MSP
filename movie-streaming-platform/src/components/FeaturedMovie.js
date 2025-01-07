  import { Box, Typography, Chip } from "@mui/material";
  import { fetchMovies } from "../utils/api";
  import { useEffect, useState } from "react";

  export default function FeaturedMovie() {
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    useEffect(() => {
      const loadMovies = async () => {
        try {
          const data = await fetchMovies();
          setMovies(data.results);
  
          // Pick a random movie for the featured section
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setFeaturedMovie(data.results[randomIndex]);
        } catch (error) {
          console.error(error.message);
        }
      };
  
      loadMovies();
    }, []);

    return (
      <Box>
      {featuredMovie && (
      <Box
        sx={{
          position: "relative",
          height: "500px",
          background: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}) center/cover no-repeat`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))",
          }}
        />
        <Box sx={{ position: "absolute", bottom: "20px", left: "20px" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {featuredMovie.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: "600px" }}>
            {featuredMovie.overview}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Chip label={`IMDb: ${featuredMovie.vote_average}`} color="warning" />
            <Chip label={`Released On: ${featuredMovie.release_date}`} variant="outlined" />
          </Box>
        </Box>
      </Box>
    )}
    </Box>
    );
  }
