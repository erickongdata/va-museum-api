import { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from '../components/GalleryCard';
import GalleryListCard from '../components/GalleryListCard';
import MyGalleryPageNavigator from '../components/MyGalleryPageNavigator';
import Navbar from '../components/NavBar';
import LayoutButtons from '../components/LayoutButtons';

function MyGallery() {
  const {
    bookmarks,
    bookmarksPage,
    perPage,
    myGalleryLayout,
    setMyGalleryLayout,
  } = useContext(AppContext);

  const [editActive, setEditActive] = useState(false);

  const filteredBookmarks = bookmarks.slice(
    (bookmarksPage - 1) * perPage,
    bookmarksPage * perPage
  );

  const gallery = () => {
    if (myGalleryLayout === 'column') {
      return (
        <ul className="gallery">
          {filteredBookmarks.map((book) => (
            <li key={`book-${book.systemNumber}`}>
              <GalleryCard
                imageBaseUrl={book.imageBaseUrl || ''}
                manifestUrl={book.manifestUrl || ''}
                systemNumber={book.systemNumber}
                title={book.title || ''}
                artist={book.artist || ''}
                date={book.date || ''}
                buttonType="close"
                buttonShow={editActive}
              />
            </li>
          ))}
        </ul>
      );
    }
    if (myGalleryLayout === 'list') {
      return (
        <ul className="gallery-list">
          {filteredBookmarks.map((book) => (
            <li key={`book-${book.systemNumber}`}>
              <GalleryListCard
                imageBaseUrl={book.imageBaseUrl || ''}
                manifestUrl={book.manifestUrl || ''}
                systemNumber={book.systemNumber}
                title={book.title || ''}
                artist={book.artist || ''}
                date={book.date || ''}
                buttonType="close"
                buttonShow={editActive}
              />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      <header>
        <Navbar />
        <div className="container">
          <h1 className="title">My Gallery</h1>
        </div>
      </header>
      <section>
        <div className="container">
          {bookmarks.length > 0 ? (
            <div className="display">
              <div className="display__control">
                <h2>{`${bookmarks.length} Objects`}</h2>
                <LayoutButtons
                  setColumn={() => setMyGalleryLayout('column')}
                  setList={() => setMyGalleryLayout('list')}
                />
              </div>
              <div className="display__inner">
                <div className="display__inner-top">
                  <button
                    type="button"
                    onClick={() => setEditActive((curr) => !curr)}
                    className={`edit-btn ${
                      editActive ? 'edit-btn--active' : ''
                    }`}
                  >
                    Edit
                  </button>
                  <MyGalleryPageNavigator />
                </div>
                {gallery()}
                <div>
                  <MyGalleryPageNavigator />
                </div>
              </div>
            </div>
          ) : (
            <div className="display">
              <div className="display__inner">
                <h2>No images</h2>
                <p>
                  To add an image to the gallery, click on the bookmark icon{' '}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1rem' }}
                  >
                    bookmark
                  </span>{' '}
                  at the top-right corner of each image.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MyGallery;
