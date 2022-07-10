/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from '../components/GalleryCard';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';

function Home() {
  const { searchTerm, page, objectInfo, objectRecords, recordsPending } =
    useContext(AppContext);
  return (
    <div>
      <h1>V&A Museum Collection</h1>
      <SearchBar />
      <div>{searchTerm}</div>
      <div>
        Pages: {objectInfo.pages} page: {page} pending:{' '}
        {recordsPending.toString()}
      </div>
      <div>Record count: {objectInfo.record_count}</div>
      {recordsPending ? (
        <LoadingGraphic />
      ) : (
        objectRecords &&
        objectRecords.map((obj) => (
          <GalleryCard
            imageBaseUrl={obj._images._iiif_image_base_url || ''}
            manifestUrl={obj._images._iiif_presentation_url || ''}
            systemNumber={obj.systemNumber}
            title={obj._primaryTitle || ''}
            key={obj.systemNumber}
          />
        ))
      )}
    </div>
  );
}

export default Home;
