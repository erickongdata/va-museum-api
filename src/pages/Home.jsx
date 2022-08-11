/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';
import GalleryPageNavigator from '../components/GalleryPageNavigator';
import StartPageGallery from '../components/StartPageGallery';
import Navbar from '../components/NavBar';
import LayoutButtons from '../components/LayoutButtons';

function Home() {
  const {
    objectInfo,
    isRecordsPending,
    searchParams,
    setGalleryLayout,
    searchError,
  } = useContext(AppContext);

  const display = () => {
    if (isRecordsPending) return <LoadingGraphic />;
    if (!searchParams.get('query')) return <StartPageGallery />;
    return (
      <div className="display">
        <div>
          <div className="display__control">
            <h2>
              {'record_count' in objectInfo
                ? `${objectInfo.record_count} Objects`
                : ''}
            </h2>
            <LayoutButtons
              setColumn={() => setGalleryLayout('column')}
              setList={() => setGalleryLayout('list')}
            />
          </div>
          <div className="display__inner">
            <div>
              {'pages' in objectInfo && objectInfo.pages !== 0 ? (
                <GalleryPageNavigator />
              ) : (
                ''
              )}
            </div>
            <Gallery />
            <div>
              {'pages' in objectInfo && objectInfo.pages !== 0 ? (
                <GalleryPageNavigator />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <Navbar />
        <div className="container">
          <Link to="/" className="main-title">
            Explore the V&A Collection
          </Link>
          <SearchBar />
          <h3 className="header-text">Search more than 1.2 million objects</h3>
        </div>
      </header>
      <section>
        <div className="container">
          {searchError ? <p className="error-message">{searchError}</p> : null}
          {display()}
        </div>
      </section>
    </>
  );
}

export default Home;
