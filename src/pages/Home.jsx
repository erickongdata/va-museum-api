/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';
import PageNavigator from '../components/PageNavigator';
import StartPageGallery from '../components/StartPageGallery';

function Home() {
  const { objectInfo, recordsPending, objectRecords, setSearchTerm, setPage } =
    useContext(AppContext);

  const display = () => {
    if (recordsPending) return <LoadingGraphic />;
    if (objectRecords.length === 0) return <StartPageGallery />;
    return (
      <div className="display">
        <div>
          <h2>
            {'record_count' in objectInfo
              ? `${objectInfo.record_count} Objects`
              : ''}
          </h2>
          <div className="display__inner">
            <div>{'pages' in objectInfo ? <PageNavigator /> : ''}</div>
            <Gallery />
            <div>{'pages' in objectInfo ? <PageNavigator /> : ''}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <div className="container">
          <button
            type="button"
            className="main-title"
            onClick={() => {
              setSearchTerm('');
              setPage(0);
            }}
          >
            Explore the V&A Collection
          </button>
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
