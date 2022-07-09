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
        objectRecords.map((obj) => {
          const imageBaseUrl = obj._images._iiif_image_base_url;
          return (
            <GalleryCard
              url={
                imageBaseUrl ? `${imageBaseUrl}/full/!100,/0/default.jpg` : ''
              }
              title={obj._primaryTitle || 'No title'}
              key={obj.systemNumber}
            />
          );
        })}
    </div>
  );
}

export default Home;
