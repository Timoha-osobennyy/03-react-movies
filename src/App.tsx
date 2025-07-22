import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import MovieGrid from './components/MovieGrid/MovieGrid.tsx';
import Loader from './components/Loader/Loader.tsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.tsx';
import MovieModal from './components/MovieModal/MovieModal.tsx';
import { fetchMovies } from './services/movieService.ts';
import { Movie } from './types/movie.tsx';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}
      </main>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
      <Toaster position="top-right" />
    </>
  );
}

export default App;