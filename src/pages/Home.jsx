/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';

function Home() {
  const { searchTerm, page, objectInfo, objectRecords } =
    useContext(AppContext);
  return (
    <div>
      <SearchBar />
      <div>{searchTerm}</div>
      <div>
        Pages: {objectInfo.pages} page: {page}
      </div>
      <div>Record count: {objectInfo.record_count}</div>
      {objectRecords &&
        objectRecords.map((obj) => (
          <div key={obj.systemNumber}>{obj._primaryTitle || 'No title'}</div>
        ))}
    </div>
  );
}

export default Home;
