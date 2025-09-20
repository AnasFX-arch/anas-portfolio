const API_KEY = "41dd6bcdfbf16cf7b774500611925902";  // replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// ✅ Search movies
async function searchMovies() {
  const query = document.getElementById("movieInput").value.trim();
  const resultsDiv = document.getElementById("movieResults");

  if (!query) {
    // If search box is empty → load trending movies
    getTrendingMovies();
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
    } else {
      resultsDiv.innerHTML = `<p>❌ No movies found. Try another search.</p>`;
    }
  } catch (err) {
    resultsDiv.innerHTML = `<p>⚠️ Error fetching movie data.</p>`;
    console.error(err);
  }
}

// ✅ Display movies (reusable for search + trending)
function displayMovies(movies) {
  const resultsDiv = document.getElementById("movieResults");
  resultsDiv.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : 'https://via.placeholder.com/200x300'}" alt="${movie.title} Poster">
      <h2>${movie.title}</h2>
      <p>Release: ${movie.release_date || "N/A"}</p>
      <p>Rating: ⭐ ${movie.vote_average}</p>
    </div>
  `).join("");
}

// ✅ Get trending movies
async function getTrendingMovies() {
  const resultsDiv = document.getElementById("movieResults");

  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
    } else {
      resultsDiv.innerHTML = `<p>⚠️ No trending movies found.</p>`;
    }
  } catch (err) {
    resultsDiv.innerHTML = `<p>⚠️ Error fetching trending movies.</p>`;
    console.error(err);
  }
}

// ✅ Load trending automatically when page opens
getTrendingMovies();
