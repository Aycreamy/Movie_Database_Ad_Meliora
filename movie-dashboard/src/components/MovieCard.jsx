import { Link } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/140x210?text=No+Image";

  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={styles.card}>
        <img
          src={imageUrl}
          alt={movie.title || "Untitled Movie"}
          style={styles.image}
        />
        <p style={styles.title}>{movie.title || "Untitled"}</p>
      </div>
    </Link>
  );
}

const styles = {
  card: {
    width: "140px",
    textAlign: "center",
    transition: "transform 0.2s ease-in-out",
  },
  image: {
    width: "100%",
    height: "210px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  title: {
    fontSize: "12px",
    marginTop: "5px",
    color: "#fff",
  },
};
