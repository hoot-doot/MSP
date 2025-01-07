import { useState } from "react";
import { Box, TextField, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { fetchMovies } from "../utils/api";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

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
  // SearchIcon
  return (
    <Box 
      sx={{
        display: "flex", 
        justifyContent: "center",  // Center horizontally
        alignItems: "center",      // Center vertically if needed
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
                <SearchIcon sx={{ color: '#c1c1c1', height:'30px',width:'30px'}}/>
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        
        sx={{
          width: "40%",
          borderRadius: "30px",
          bgcolor: "transparent",
          "& .MuiOutlinedInput-root": {
            fontSize:15,
            fontWeight:700,
            color: "#fff",
            borderRadius: "30px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff", // White outline for input
          },
          "&:hover .MuiOutlinedInput-root": {
            borderColor: "#fff", // Maintain white border on hover
          },
        }}
      />
      {results.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "55px",
            width: "50%",
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
