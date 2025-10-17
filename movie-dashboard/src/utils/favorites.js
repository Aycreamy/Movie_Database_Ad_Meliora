const FAVORITES_KEY = "admeliora_favorites";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  if (!favorites.find((m) => m.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.id === id);
}