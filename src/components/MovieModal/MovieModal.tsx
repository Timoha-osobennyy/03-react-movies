import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}