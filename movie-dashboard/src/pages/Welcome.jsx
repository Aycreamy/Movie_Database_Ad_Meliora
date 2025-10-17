import { useNavigate } from "react-router-dom";
import { signInWithGoogle, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect if already signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home");
    } catch (err) {
      console.error("Google Sign-in failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ad Meliora: Movie World</h1>
      <p style={styles.subtitle}>Your Gateway to Endless Entertainment</p>

      <div style={styles.buttonContainer}>
        <button onClick={handleGoogleSignIn} style={styles.googleButton}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

// 🎨 Updated styles
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
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "italic",
    letterSpacing: "0.5px",
    color: "#dcdcdc",
    marginBottom: "35px",
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
    transition: "background 0.3s ease",
  },
};
