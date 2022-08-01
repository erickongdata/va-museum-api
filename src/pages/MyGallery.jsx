import { useContext } from 'react';
import { AppContext } from '../AppContext';
import BackButton from '../components/BackButton';
import GalleryCard from '../components/GalleryCard';
import GalleryListCard from '../components/GalleryListCard';
import MyGalleryPageNavigator from '../components/MyGalleryPageNavigator';
import Navbar from '../components/NavBar';
import GalleryLayoutColumns from '../components/GalleryLayoutColumns';
import LayoutButtons from '../components/LayoutButtons';
import GalleryLayoutList from '../components/GalleryLayoutList';

function MyGallery() {
  const {
    bookmarks,
    bookmarksPage,
    perPage,
    myGalleryLayout,
    setMyGalleryLayout,
  } = useContext(AppContext);

  const filteredBookmarks = bookmarks.slice(
    (bookmarksPage - 1) * perPage,
    bookmarksPage * perPage
  );
  const galleryList =
    myGalleryLayout === 'column'
      ? filteredBookmarks.map((book) => (
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
        ))
      : filteredBookmarks.map((book) => (
          <li key={`book-${book.systemNumber}`}>
            <GalleryListCard
              imageBaseUrl={book.imageBaseUrl || ''}
              manifestUrl={book.manifestUrl || ''}
              systemNumber={book.systemNumber}
              title={book.title || ''}
              artist={book.artist || ''}
              date={book.date || ''}
            />
          </li>
        ));

  const galleryLayout = () => {
    if (bookmarks.length > 0 && myGalleryLayout === 'column') {
      return <GalleryLayoutColumns galleryList={galleryList} />;
    }
    if (bookmarks.length > 0 && myGalleryLayout === 'list') {
      return <GalleryLayoutList galleryList={galleryList} />;
    }
    return <h2>No images</h2>;
  };

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
            <div className="display__control">
              <h2>
                {bookmarks.length > 0 ? `${bookmarks.length} Objects` : ''}
              </h2>
              <LayoutButtons
                setColumn={() => setMyGalleryLayout('column')}
                setList={() => setMyGalleryLayout('list')}
              />
            </div>
            <div className="display__inner">
              <div>
                {bookmarks.length > 0 ? <MyGalleryPageNavigator /> : ''}
              </div>
              {galleryLayout()}
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
