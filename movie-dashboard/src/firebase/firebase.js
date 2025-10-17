import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  deleteDoc 
} from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBObfjpk_RFht6dWVQg202ANYglGBZvrqs",
  authDomain: "ad-meliora-movie-world.firebaseapp.com",
  projectId: "ad-meliora-movie-world",
  storageBucket: "ad-meliora-movie-world.appspot.com", // ✅ fixed this
  messagingSenderId: "19937309109",
  appId: "1:19937309109:web:b47e714eb6fc837fbaa9fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Auth actions
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore helpers
export async function addFavorite(userId, movie) {
  const ref = doc(db, `users/${userId}/favorites`, String(movie.id));
  await setDoc(ref, movie);
}

export async function removeFavorite(userId, movieId) {
  const ref = doc(db, `users/${userId}/favorites`, String(movieId));
  await deleteDoc(ref);
}

export async function getFavorites(userId) {
  const ref = collection(db, `users/${userId}/favorites`);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map(doc => doc.data());
}
