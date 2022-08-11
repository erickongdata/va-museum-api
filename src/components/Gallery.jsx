/* eslint no-underscore-dangle: 0 */
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import GalleryCard from './GalleryCard';
import GalleryListCard from './GalleryListCard';

function Gallery() {
  const { objectData, galleryLayout } = useContext(AppContext);

  const gallery = () => {
    if (galleryLayout === 'column') {
      return (
        <ul className="gallery">
          {objectData.records.map((obj) => (
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
          ))}
        </ul>
      );
    }

    return (
      <ul className="gallery-list">
        {objectData.records.map((obj) => (
          <li key={obj.systemNumber}>
            <GalleryListCard
              imageBaseUrl={obj._images._iiif_image_base_url || ''}
              manifestUrl={obj._images._iiif_presentation_url || ''}
              systemNumber={obj.systemNumber}
              title={obj._primaryTitle || ''}
              artist={obj._primaryMaker.name || ''}
              date={obj._primaryDate || ''}
            />
          </li>
        ))}
      </ul>
    );
  };

  return gallery();
}

export default Gallery;
