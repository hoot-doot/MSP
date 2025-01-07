import { useEffect, useState } from "react";
import { Box, CardMedia, useTheme } from "@mui/material";
import Slider from "react-slick";
import { fetchMovies } from "../utils/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieCarousel({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadMovies();
  }, []);

  if (movies.length === 0) return null;

  const settings = {
    infinite: true,
    speed: 1000, // Controls the speed of sliding
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 200, // Auto slide interval
    arrows: false,
    pauseOnHover: true,
  };

  const handleMovieClick = (movie) => {
    onMovieSelect(movie);
  };

  return (
    <Box sx={{ position: "relative", mt: 2, px: 2 }}>
      {/* Faded sides */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "170px",
          background: `linear-gradient(to right, black, transparent)`,
          zIndex: 5,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "170px",
          background: `linear-gradient(to left, black, transparent)`,
          zIndex: 5,
        }}
      />

      {/* Movie Slider */}
      <Slider {...settings}>
        {movies.map((movie) => (
          <Box
            key={movie.id}
            sx={{ px: 1 }}
            onClick={() => handleMovieClick(movie)}
          >
            <CardMedia
              component="img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sx={{
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
