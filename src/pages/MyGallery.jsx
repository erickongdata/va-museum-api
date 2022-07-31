import { useContext } from 'react';
import { AppContext } from '../AppContext';
import BackButton from '../components/BackButton';
import GalleryCard from '../components/GalleryCard';
import Navbar from '../components/NavBar';

function Bookmarks() {
  const { bookmarks } = useContext(AppContext);

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
          <BackButton />
        </div>
      </main>
    </>
  );
}

export default Bookmarks;
