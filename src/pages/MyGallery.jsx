import { useContext } from 'react';
import { AppContext } from '../AppContext';
import BackButton from '../components/BackButton';
import GalleryCard from '../components/GalleryCard';
import MyGalleryPageNavigator from '../components/MyGalleryPageNavigator';
import Navbar from '../components/NavBar';
import GalleryLayoutColumns from '../components/GalleryLayoutColumns';

function MyGallery() {
  const { bookmarks, bookmarksPage, perPage } = useContext(AppContext);
  const filteredBookmarks = bookmarks.slice(
    (bookmarksPage - 1) * perPage,
    bookmarksPage * perPage
  );
  const galleryList = filteredBookmarks.map((book) => (
    <li key={`book-${book.systemNumber}`}>
      <GalleryCard
        imageBaseUrl={book.imageBaseUrl || ''}
        manifestUrl={book.manifestUrl || ''}
        systemNumber={book.systemNumber}
        title={book.title || ''}
        artist={book.artist || ''}
        date={book.date || ''}
      />
    </li>
  ));

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

              {bookmarks.length > 0 ? (
                <GalleryLayoutColumns galleryList={galleryList} />
              ) : (
                <h2>No images</h2>
              )}

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
