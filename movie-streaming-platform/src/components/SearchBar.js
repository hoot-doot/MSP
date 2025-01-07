import { useState } from "react";
import { Box, TextField, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { fetchMovies } from "../utils/api";

export default function SearchBar({ onMovieSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      try {
        const data = await fetchMovies(searchTerm);
        setResults(data.results.slice(0, 5)); // Limit results to 5
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setResults([]);
    }
  };

  const handleMovieClick = (movie) => {
    onMovieSelect(movie);
    setQuery("");
    setResults([]);
  };

  return (
    <Box sx={{ position: "relative", mt: 2, px: 2 }}>
      <TextField
        value={query}
        onChange={handleSearch}
        placeholder="Search Movie/Show..."
        variant="outlined"
        fullWidth
        sx={{
          bgcolor: "#2c2c2c",
          "& .MuiOutlinedInput-root": { color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
        }}
      />
      {results.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "55px",
            width: "100%",
            maxWidth: "600px",
            bgcolor: "#2c2c2c",
            borderRadius: "4px",
            zIndex: 10,
          }}
        >
          {results.map((movie) => (
            <ListItem key={movie.id} disablePadding>
              <ListItemButton onClick={() => handleMovieClick(movie)}>
                <Typography sx={{ color: "#fff" }}>{movie.title}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
