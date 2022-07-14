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
    if (objectRecords.length === 0) return <StartPageGallery />;
    if (recordsPending) return <LoadingGraphic />;
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
      </header>
      <main>
        <div className="container">{display()}</div>
      </main>
    </>
  );
}

export default Home;
