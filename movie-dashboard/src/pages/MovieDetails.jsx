import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>Movie Details Page</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
}
