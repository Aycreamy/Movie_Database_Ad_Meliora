import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTrending, fetchPopular } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import { auth, logout } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to firebase auth changes
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    fetchTrending().then((res) => setTrending(res.data.results)).catch(console.error);
    fetchPopular().then((res) => setPopular(res.data.results)).catch(console.error);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h2 style={styles.header}>Ad Meliora Home</h2>

        <div style={styles.userSection}>
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="user"
                style={{ width: "30px", borderRadius: "50%", marginRight: "8px" }}
              />
              <span style={{ marginRight: 12 }}>{user.displayName}</span>
              <button onClick={() => { logout(); navigate("/"); }} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/")} style={styles.logoutBtn}>
              Sign In
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={styles.topBar}>
          <h3 style={styles.sectionTitle}>Trending Now</h3>
          <button style={styles.searchBtn} onClick={() => navigate("/search")}>Search</button>
          <button style={styles.profileBtn} onClick={() => navigate("/profile")}>Profile</button>
        </div>
        <div style={styles.scrollRow}>
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Popular Movies</h3>
        <div style={styles.scrollRow}>
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
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
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoutBtn: {
    backgroundColor: "#e50914",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  searchBtn: {
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: 8
  },
  profileBtn: {
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: 8
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
    marginBottom: "20px"
  },
};