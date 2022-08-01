import { useContext } from 'react';
import { AppContext } from '../AppContext';
import BackButton from '../components/BackButton';
import GalleryCard from '../components/GalleryCard';
import MyGalleryPageNavigator from '../components/MyGalleryPageNavigator';
import Navbar from '../components/NavBar';

function MyGallery() {
  const { bookmarks, bookmarksPage, perPage } = useContext(AppContext);
  const filteredBookmarks = bookmarks.slice(
    (bookmarksPage - 1) * perPage,
    bookmarksPage * perPage
  );

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
            <h2>{bookmarks.length > 0 ? `${bookmarks.length} Objects` : ''}</h2>
            <div className="display__inner">
              <div>
                {bookmarks.length > 0 ? <MyGalleryPageNavigator /> : ''}
              </div>
              <ul className="my-gallery">
                {bookmarks.length > 0 ? (
                  filteredBookmarks.map((book) => (
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
              <div>
                {bookmarks.length > 0 ? <MyGalleryPageNavigator /> : ''}
              </div>
            </div>
          </div>
          <BackButton />
        </div>
      </main>
    </>
  );
}

export default MyGallery;
