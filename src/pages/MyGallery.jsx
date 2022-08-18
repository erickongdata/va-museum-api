import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import GalleryCard from '../components/GalleryCard';
import GalleryListCard from '../components/GalleryListCard';
import MyGalleryPageNavigator from '../components/MyGalleryPageNavigator';
import LayoutButtons from '../components/LayoutButtons';
import { AuthContext } from '../contexts/AuthContext';

function MyGallery() {
  const { myGalleryLayout, setMyGalleryLayout } = useContext(AppContext);
  const { bookmarks, bookmarksPage, perPage } = useContext(AuthContext);

  // const [editActive, setEditActive] = useState(false);

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
                systemNumber={book.systemNumber}
                title={book.title || ''}
                artist={book.artist || ''}
                date={book.date || ''}
                // buttonShow={editActive}
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
                systemNumber={book.systemNumber}
                title={book.title || ''}
                artist={book.artist || ''}
                date={book.date || ''}
                // buttonShow={editActive}
              />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  useEffect(() => {
    document.title = 'V&A My Gallery';
  }, []);

  return (
    <>
      <header className="margin-top">
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
                {/* <div className="display__inner-top">
                  <button
                    type="button"
                    onClick={() => setEditActive((curr) => !curr)}
                    className={`edit-btn ${
                      editActive ? 'edit-btn--active' : ''
                    }`}
                  >
                    Edit
                  </button>
                </div> */}
                <div>
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
                <p className="text-center">
                  To add an image to the gallery, click on the bookmark icon{' '}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '1rem' }}
                  >
                    bookmark
                  </span>{' '}
                  next to each image.
                </p>
                <p className="text-center">
                  <Link to="/register" className="form-link">
                    Create an account
                  </Link>{' '}
                  to save your bookmarks to the cloud and view them on more than
                  one device.
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
