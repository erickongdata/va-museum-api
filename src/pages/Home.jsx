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
    <div>
      <h1>Explore the V&A Collection</h1>
      <SearchBar />
      <div>
        {'record_count' in objectInfo
          ? `${objectInfo.record_count} Objects`
          : ''}
      </div>
      <div>{'pages' in objectInfo ? <PageNavigator /> : ''}</div>
      {recordsPending ? <LoadingGraphic /> : <Gallery />}
    </div>
  );
}

export default Home;
