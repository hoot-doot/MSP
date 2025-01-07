"use client";
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        bgcolor: "black",
        color: "#fff",
        width: "78vw",
        minHeight: "100vh",
      }}
    >
      <FeaturedMovie selectedMovie={selectedMovie} />
      <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, px: 2 }}>
        Upcoming Movies
      </Typography>
      <MovieCarousel onMovieSelect={handleMovieSelect} />
    </Container>
  );
}
