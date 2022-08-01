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

function Home() {
  const { objectInfo, recordsPending, searchParams } = useContext(AppContext);

  const display = () => {
    if (recordsPending) return <LoadingGraphic />;
    if (!searchParams.get('query')) return <StartPageGallery />;
    return (
      <div className="display">
        <div>
          <h2>
            {'record_count' in objectInfo
              ? `${objectInfo.record_count} Objects`
              : ''}
          </h2>
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
      <main>
        <div className="container">{display()}</div>
      </main>
    </>
  );
}

export default Home;
