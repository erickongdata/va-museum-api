/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from './GalleryCard';
import GalleryLayoutColumns from './GalleryLayoutColumns';

function Gallery() {
  const { objectRecords } = useContext(AppContext);

  const galleryList = objectRecords.map((obj) => (
    <li key={obj.systemNumber}>
      <GalleryCard
        imageBaseUrl={obj._images._iiif_image_base_url || ''}
        manifestUrl={obj._images._iiif_presentation_url || ''}
        systemNumber={obj.systemNumber}
        title={obj._primaryTitle || ''}
        artist={obj._primaryMaker.name || ''}
        date={obj._primaryDate || ''}
      />
    </li>
  ));

  return <GalleryLayoutColumns galleryList={galleryList} />;
}

export default Gallery;
