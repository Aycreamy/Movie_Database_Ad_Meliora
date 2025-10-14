import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ad Meliora: Movie World</h1>
      <p style={styles.subtitle}>Your Gateway to Endless Entertainment</p>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate("/home")} style={styles.googleButton}>
          Sign in with Google
        </button>
        <button style={styles.appleButton}>Sign in with Apple</button>
      </div>

      <p style={styles.footer}>Welcome Back.</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#bbb",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "200px",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
  },
  appleButton: {
    backgroundColor: "#000",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "40px",
    fontSize: "12px",
    color: "#888",
  },
};
