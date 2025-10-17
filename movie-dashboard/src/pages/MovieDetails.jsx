import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import { auth, addFavorite, removeFavorite, getFavorites } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [movie, setMovie] = useState(null);
  const [favorite, setFavorite] = useState(false);

  // Load movie details
  useEffect(() => {
    fetchMovieDetails(id)
      .then((res) => {
        console.log("🎬 Movie loaded:", res.data.title);
        setMovie(res.data);
      })
      .catch((err) => console.error("❌ Error loading movie:", err));
  }, [id]);

  // Check if movie is already in favorites
  useEffect(() => {
    if (user) {
      getFavorites(user.uid)
        .then((favs) => {
          const isFav = favs.some((m) => m.id === Number(id));
          setFavorite(isFav);
          console.log("✅ Fetched favorites:", favs.length);
        })
        .catch((err) => console.error("🔥 Error getting favorites:", err));
    }
  }, [user, id]);

  // Add/Remove favorites
  const handleFavorite = async () => {
    console.log("🟢 Button clicked");

    if (!user) {
      alert("Please sign in to save favorites.");
      console.warn("⚠️ No user found!");
      return;
    }

    if (!movie) {
      console.warn("⚠️ No movie loaded yet!");
      return;
    }

    try {
      console.log("✅ User UID:", user.uid);
      console.log("🎥 Movie ID:", movie.id);

      if (favorite) {
        console.log("🗑 Removing favorite...");
        await removeFavorite(user.uid, movie.id);
      } else {
        console.log("💾 Adding favorite...");
        await addFavorite(user.uid, movie);
      }

      setFavorite(!favorite);
      console.log("🔁 Updated favorite state:", !favorite);
    } catch (err) {
      console.error("🔥 Firestore Error:", err);
      alert("Error updating favorite: " + err.message);
    }
  };

  if (!movie)
    return (
      <div style={styles.loading}>
        <p>Loading movie details...</p>
      </div>
    );

  const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img
        src={IMAGE_BASE + movie.poster_path}
        alt={movie.title}
        style={styles.poster}
      />

      <h1 style={styles.title}>{movie.title}</h1>

      {/* Show warning if not logged in */}
      {!user && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          ⚠️ You must sign in to use favorites.
        </p>
      )}

      <button
        onClick={handleFavorite}
        disabled={!user || !movie}
        style={{
          ...styles.favoriteBtn,
          backgroundColor: favorite ? "#e50914" : "#333",
          opacity: !user || !movie ? 0.5 : 1,
          cursor: !user || !movie ? "not-allowed" : "pointer",
        }}
      >
        {favorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
      </button>

      <p style={styles.info}>
        ⭐ {movie.vote_average.toFixed(1)} | {movie.release_date?.slice(0, 4)} |{" "}
        {movie.genres.map((g) => g.name).join(", ")}
      </p>

      <p style={styles.overview}>{movie.overview}</p>

      {trailer && (
        <div style={styles.trailerContainer}>
          <h3 style={{ marginBottom: "10px" }}>Trailer</h3>
          <iframe
            width="100%"
            height="230"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
            style={styles.trailer}
          ></iframe>
        </div>
      )}
    </div>
  );
}

// ✅ Inline Styles
const styles = {
  container: {
    color: "white",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  backBtn: {
    background: "none",
    color: "#fff",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "10px",
  },
  poster: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  info: {
    fontSize: "1rem",
    marginBottom: "15px",
  },
  overview: {
    lineHeight: 1.6,
    fontSize: "1.1rem",
  },
  favoriteBtn: {
    border: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  trailerContainer: {
    marginTop: "20px",
  },
  trailer: {
    borderRadius: "10px",
  },
  loading: {
    color: "white",
    textAlign: "center",
    padding: "50px",
  },
};
