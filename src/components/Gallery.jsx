/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from './GalleryCard';

function Gallery() {
  const { objectRecords } = useContext(AppContext);

  const gallery = objectRecords.map((obj) => (
    <GalleryCard
      imageBaseUrl={obj._images._iiif_image_base_url || ''}
      manifestUrl={obj._images._iiif_presentation_url || ''}
      systemNumber={obj.systemNumber}
      title={obj._primaryTitle || ''}
      key={obj.systemNumber}
    />
  ));

  const galleryHeight = Math.floor(gallery.length / 3) || 1;

  return (
    <div className="gallery">
      <div className="gallery__column">{gallery.slice(0, galleryHeight)}</div>
      <div className="gallery__column">
        {gallery.slice(galleryHeight, galleryHeight * 2)}
      </div>
      <div className="gallery__column">
        {gallery.slice(galleryHeight * 2, galleryHeight * 3)}
      </div>
    </div>
  );
}

export default Gallery;
