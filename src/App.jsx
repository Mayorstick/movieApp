import { useState } from "react";

function App() {
  const [userInput, updateUserInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchMovie() {
    if (!userInput.trim()) {
      setError("Please enter a movie name");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.omdbapi.com/?s=${userInput}&apikey=${apiKey}`
      );

      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error);
        setMovies([]);
      } else {
        setMovies(data.Search);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Movie Search 🎬</h1>

      <input
        type="text"
        className="p-2 rounded bg-gray-100 text-black w-64 outline-none focus:ring-2 focus:ring-blue-500"
        value={userInput}
        placeholder="Search for a movie..."
        onChange={(e) => updateUserInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchMovie();
        }}
      />

      <button
        onClick={searchMovie}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full max-w-5xl">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-gray-800 p-2 rounded">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.Title}
              className="w-full h-72 object-cover rounded"
            />

            <h2 className="text-sm font-bold mt-2">{movie.Title}</h2>
            <p className="text-xs">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
