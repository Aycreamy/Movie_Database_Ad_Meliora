import { useEffect, useState } from "react";
import { fetchTrending, fetchPopular } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  // Fetch data on page load
  useEffect(() => {
    async function loadMovies() {
      try {
        const trendingRes = await fetchTrending();
        const popularRes = await fetchPopular();
        setTrending(trendingRes.data.results);
        setPopular(popularRes.data.results);
      } catch (error) {
        console.error("Failed to load movies:", error);
      }
    }
    loadMovies();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h2 style={styles.header}>Ad Meliora Home</h2>
        <button style={styles.searchBtn} onClick={() => navigate("/search")}>
          Search
        </button>
      </div>

      <h3 style={styles.sectionTitle}>Trending Now</h3>
      <div style={styles.scrollRow}>
        {trending.length > 0 ? (
          trending.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Loading trending movies...</p>
        )}
      </div>

      <h3 style={styles.sectionTitle}>Popular Movies</h3>
      <div style={styles.scrollRow}>
        {popular.length > 0 ? (
          popular.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Loading popular movies...</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  searchBtn: {
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  sectionTitle: {
    marginTop: "25px",
    marginBottom: "10px",
    fontSize: "18px",
  },
  scrollRow: {
    display: "flex",
    overflowX: "auto",
    gap: "10px",
  },
};
