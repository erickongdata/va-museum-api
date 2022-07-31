/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from './GalleryCard';

function Gallery() {
  const { objectRecords } = useContext(AppContext);

  const gallery = objectRecords.map((obj) => (
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

  const galleryHeight = Math.floor(gallery.length / 3) || 1;

  return (
    <ul>
      <div className="gallery">
        <div className="gallery-column">{gallery.slice(0, galleryHeight)}</div>
        <div className="gallery-column">
          {gallery.slice(galleryHeight, galleryHeight * 2)}
        </div>
        <div className="gallery-column">
          {gallery.slice(galleryHeight * 2, galleryHeight * 3)}
        </div>
      </div>
    </ul>
  );
}

export default Gallery;
