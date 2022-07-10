/* eslint no-underscore-dangle: 0 */

import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from '../components/GalleryCard';
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
          <GalleryCard
            imageBaseUrl={obj._images._iiif_image_base_url || ''}
            manifestUrl={obj._images._iiif_presentation_url || ''}
            systemNumber={obj.systemNumber}
            title={obj._primaryTitle || ''}
            key={obj.systemNumber}
          />
        ))}
    </div>
  );
}

export default Home;
