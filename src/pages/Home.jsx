/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';
import PageNavigator from '../components/PageNavigator';

function Home() {
  const { objectInfo, recordsPending } = useContext(AppContext);

  return (
    <>
      <header>
        <h1 className="main-title">Explore the V&A Collection</h1>
        <SearchBar />
      </header>
      <main>
        <div className="display">
          {recordsPending ? (
            <LoadingGraphic />
          ) : (
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
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
