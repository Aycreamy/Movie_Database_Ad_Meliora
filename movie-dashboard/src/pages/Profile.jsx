import { useEffect, useState } from "react";
import { auth, db, removeFavorite } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot } from "firebase/firestore";
import MovieCard from "../components/MovieCard";

export default function Profile() {
  const [favorites, setFavorites] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    // 🔥 Real-time Firestore listener for this user's favorites
    const ref = collection(db, `users/${user.uid}/favorites`);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const favMovies = snapshot.docs.map((doc) => doc.data());
      console.log("📡 Favorites updated:", favMovies);
      setFavorites(favMovies);
    });

    return () => unsubscribe();
  }, [user]);

  const handleRemove = async (id) => {
    if (!user) return;
    await removeFavorite(user.uid, id);
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <p style={{ color: "red" }}>⚠️ Please sign in to view your favorites.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        {user.displayName ? `${user.displayName}'s Favorites ❤️` : "Favorites ❤️"}
      </h2>

      {favorites.length === 0 ? (
        <p style={{ color: "#bbb" }}>No favorites yet. Add some from the movie page!</p>
      ) : (
        <div style={styles.grid}>
          {favorites.map((movie) => (
            <div key={movie.id} style={styles.cardWrapper}>
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemove(movie.id)}
                style={styles.removeBtn}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Inline styles
const styles = {
  container: {
    color: "white",
    padding: "20px",
  },
  header: {
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "20px",
  },
  cardWrapper: {
    textAlign: "center",
  },
  removeBtn: {
    marginTop: "10px",
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
