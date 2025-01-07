import { useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { fetchMovies } from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function SearchBar({ onMovieSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      try {
        const data = await fetchMovies(searchTerm);
        setResults(data.results.slice(0, 5));
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        px: 18,
      }}
    >
      <TextField
        value={query}
        onChange={handleSearch}
        placeholder="Search Movie/Show..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: "#c1c1c1", height: "30px", width: "30px" }}
                />
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        sx={{
          width: "40%",
          borderRadius: "30px",
          backdropFilter: "blur(5px)",


          "& .MuiOutlinedInput-root": {
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            borderRadius: "30px",
            
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            opacity:1
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          "&:hover .MuiOutlinedInput-root": {
            borderColor: "#fff",
          },
        }}
      />
      {results.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "90px",
            width: "30%",
            bgcolor: "#171717",
            borderRadius: "4px",
            zIndex: 10,
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {results.map((movie) => (
            <ListItem key={movie.id} disablePadding>
              <ListItemButton
                onClick={() => handleMovieClick(movie)}
                sx={{
                  display: "flex",
                  gap: 2,
                  padding: "8px",
                  "&:hover": {
                    bgcolor: "black",
                  },
                }}
              >
                <Box
                  component="img"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={movie.title}
                  sx={{
                    width: "36px",
                    height: "59px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <Box>
                  <Typography sx={{ color: "#fff", fontWeight: "500" }}>
                    {movie.title}
                  </Typography>
                  {movie.release_date && (
                    <Typography sx={{ color: "#999", fontSize: "0.8rem" }}>
                      {new Date(movie.release_date).getFullYear()}
                    </Typography>
                  )}
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
