/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';

function Home() {
  const { page, objectInfo, recordsPending } = useContext(AppContext);

  return (
    <div>
      <h1>V&A Museum Collection</h1>
      <SearchBar />
      <div>
        {'pages' in objectInfo ? `Page ${page} of ${objectInfo.pages}` : ''}
      </div>
      <div>
        {'record_count' in objectInfo
          ? `Record count: ${objectInfo.record_count}`
          : ''}
      </div>
      {recordsPending ? <LoadingGraphic /> : <Gallery />}
    </div>
  );
}

export default Home;
