import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import GalleryCard from '../components/GalleryCard';
import Navbar from '../components/NavBar';

function Bookmarks() {
  const { bookmarks } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <Navbar />
        <div className="container">
          <h1 className="title">My Gallery</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="display">
            <ul className="my-gallery">
              {bookmarks.length > 0 ? (
                bookmarks.map((book) => (
                  <li
                    className="my-gallery-card"
                    key={`book-${book.systemNumber}`}
                  >
                    <GalleryCard
                      imageBaseUrl={book.imageBaseUrl || ''}
                      manifestUrl={book.manifestUrl || ''}
                      systemNumber={book.systemNumber}
                      title={book.title || ''}
                      artist={book.artist || ''}
                      date={book.date || ''}
                    />
                  </li>
                ))
              ) : (
                <h2>No images</h2>
              )}
            </ul>
          </div>
          <div className="close-btn">
            <span
              className="material-symbols-outlined"
              aria-label="previous-page"
            >
              navigate_before
            </span>
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Bookmarks;
