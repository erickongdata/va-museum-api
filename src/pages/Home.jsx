/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';
import PageNavigator from '../components/PageNavigator';
import StartPageGallery from '../components/StartPageGallery';

function Home() {
  const { objectInfo, recordsPending, setPage, setSearchParams, searchParams } =
    useContext(AppContext);

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
                <PageNavigator />
              ) : (
                ''
              )}
            </div>
            <Gallery />
            <div>
              {'pages' in objectInfo && objectInfo.pages !== 0 ? (
                <PageNavigator />
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
        <div className="container">
          <button
            type="button"
            className="main-title"
            onClick={() => {
              setSearchParams({});
              setPage(1);
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
